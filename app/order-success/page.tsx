'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, Home as HomeIcon } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatINR } from '@/lib/products';
import { Order } from '@/types';

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderNumber = params.get('order');
  const { orders, findOrder, hydrated } = useStore();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (hydrated && orderNumber) {
      const found = findOrder(orderNumber) ?? orders.find((o) => o.orderNumber === orderNumber);
      setOrder(found ?? null);
    }
  }, [hydrated, orderNumber, orders, findOrder]);

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sage/10 mb-6">
          <CheckCircle2 size={32} className="text-sage" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
          Thank you for shopping with DeskZen!
        </h1>
        <p className="text-muted mt-4">Your workspace transformation starts here.</p>

        {hydrated && order && (
          <div className="mt-10 text-left p-6 sm:p-8 rounded-2xl bg-cream border border-ink/5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Order ID</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted">Status</p>
                <p className="text-sage text-sm font-medium">{order.orderStatus}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {order.items.map((it) => (
                <div key={it.productId} className="flex justify-between gap-3">
                  <span>{it.productName} × {it.quantity}</span>
                  <span>{formatINR(it.subtotal)}</span>
                </div>
              ))}
              <div className="border-t border-ink/10 pt-2 mt-2 flex justify-between font-medium">
                <span>Total paid</span><span>{formatINR(order.total)}</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted space-y-1">
              <p><span className="text-ink/70">Name:</span> {order.customerName}</p>
              <p><span className="text-ink/70">Deliver to:</span> {order.shippingAddress.house}, {order.shippingAddress.street}, {order.shippingAddress.area}, {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
              <p><span className="text-ink/70">Payment:</span> {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
              <p><span className="text-ink/70">Estimated delivery:</span> {order.estimatedDelivery} (demonstration estimate)</p>
            </div>
          </div>
        )}

        {!order && hydrated && (
          <p className="mt-10 text-sm text-muted">Order details could not be loaded. Please check the “Track Order” page.</p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-6 py-3 text-sm font-medium hover:bg-sage transition-colors">
            Continue Shopping
          </Link>
          <Link href="/track-order" className="inline-flex items-center gap-2 border border-ink/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-sand transition-colors">
            <Package size={14} /> View Order Details
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 border border-ink/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-sand transition-colors">
            <HomeIcon size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}