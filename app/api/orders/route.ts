import { NextResponse } from 'next/server';
import { getProductById, getEffectivePrice, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/lib/products';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { validateCheckout } from '@/lib/validation';
import { Order, OrderItem } from '@/types';

function genOrderNumber() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DZ-${stamp}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate customer + address
    const v = validateCheckout(body);
    if (!v.ok) return NextResponse.json({ error: 'Validation failed', errors: v.errors }, { status: 400 });

    // 2. Validate items array
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // 3. Server-side price computation — never trust frontend prices
    const items: OrderItem[] = [];
    for (const line of body.items) {
      const product = getProductById(line.productId);
      if (!product) return NextResponse.json({ error: `Unknown product: ${line.productId}` }, { status: 400 });
      const qty = Math.max(1, Math.min(99, Number(line.quantity) || 1));
      const unitPrice = getEffectivePrice(product);
      items.push({
        productId: product.id,
        productName: product.name,
        quantity: qty,
        unitPrice,
        subtotal: unitPrice * qty,
      });
    }

    const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
    const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal + delivery;

    const orderNumber = genOrderNumber();
    const createdAt = new Date().toISOString();
    const estimatedDelivery = new Date(Date.now() + 5 * 864e5).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const order: Order = {
      orderNumber,
      customerName: body.customerName,
      email: body.email,
      mobile: body.mobile,
      items,
      subtotal,
      delivery,
      total,
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentMethod === 'cod' ? 'COD' : 'Paid (Demo)',
      orderStatus: 'Order Placed',
      shippingAddress: {
        house: body.house, street: body.street, area: body.area,
        city: body.city, state: body.state, pincode: body.pincode,
      },
      createdAt,
      estimatedDelivery,
    };

    // 4. Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      const sb = getSupabaseAdmin();
      if (sb) {
        try {
          const { data: cust, error: custErr } = await sb
            .from('customers')
            .insert({ full_name: body.customerName, email: body.email, mobile: body.mobile })
            .select('id')
            .single();
          if (custErr) throw custErr;

          const { data: ord, error: ordErr } = await sb
            .from('orders')
            .insert({
              order_number: orderNumber,
              customer_id: cust?.id ?? null,
              total_amount: total,
              payment_method: body.paymentMethod,
              payment_status: order.paymentStatus,
              order_status: 'Order Placed',
              shipping_address: order.shippingAddress,
            })
            .select('id')
            .single();
          if (ordErr) throw ordErr;

          if (ord?.id) {
            await sb.from('order_items').insert(items.map((i) => ({
              order_id: ord.id,
              product_id: i.productId,
              product_name_snapshot: i.productName,
              quantity: i.quantity,
              unit_price: i.unitPrice,
              subtotal: i.subtotal,
            })));
          }
        } catch (e) {
          console.error('[orders] Supabase persistence failed, falling back to demo:', e);
        }
      }
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return NextResponse.json({ error: 'Could not create order.' }, { status: 500 });
  }
}