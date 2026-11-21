'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatINR } from '@/lib/products';
import { INDIAN_STATES, validateCheckout } from '@/lib/validation';
import { Order } from '@/types';

const PAYMENTS = [
  { id: 'upi', label: 'UPI', desc: 'Demonstration only — no live gateway.' },
  { id: 'credit', label: 'Credit Card', desc: 'Simulated — do not enter real card data.' },
  { id: 'debit', label: 'Debit Card', desc: 'Simulated — do not enter real card data.' },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay at the time of delivery.' },
  { id: 'demo', label: 'Demo Online Payment', desc: 'Academic demonstration payment.' },
];

export default function CheckoutClient() {
  const router = useRouter();
  const { cartProducts, subtotal, delivery, total, clearCart, hydrated, saveOrder } = useStore();
  const [form, setForm] = useState({
    customerName: '', email: '', mobile: '',
    house: '', street: '', area: '', city: '', state: '', pincode: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');

  if (hydrated && cartProducts.length === 0) {
    return (
      <div className="pt-32 container-x pb-16 text-center">
        <p className="font-display text-3xl">Your cart is empty.</p>
        <Link href="/shop" className="mt-6 inline-block bg-ink text-cream px-7 py-3 rounded-full text-sm">Continue Shopping</Link>
      </div>
    );
  }

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const v = validateCheckout(form);
    setErrors(v.errors);
    if (!v.ok) return;

    setBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: cartProducts.map((c) => ({ productId: c.product.id, quantity: c.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed.');

      const order: Order = data.order;
      saveOrder(order);
      clearCart();
      router.push(`/order-success?order=${order.orderNumber}`);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <h1 className="font-display text-4xl sm:text-5xl mb-2">Checkout</h1>
      <p className="text-muted text-sm mb-10">This is a demonstration checkout — no real payment is processed.</p>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={form.customerName} onChange={(v) => update('customerName', v)} error={errors.customerName} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} error={errors.email} />
              <Field label="Mobile (10-digit)" value={form.mobile} onChange={(v) => update('mobile', v.replace(/\D/g, '').slice(0, 10))} error={errors.mobile} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Delivery Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="House / Flat No." value={form.house} onChange={(v) => update('house', v)} error={errors.house} />
              <Field label="Street" value={form.street} onChange={(v) => update('street', v)} error={errors.street} />
              <Field label="Area / Locality" value={form.area} onChange={(v) => update('area', v)} error={errors.area} />
              <Field label="City" value={form.city} onChange={(v) => update('city', v)} error={errors.city} />
              <div>
                <label className="text-sm text-ink/70 mb-1 block">State</label>
                <select value={form.state} onChange={(e) => update('state', e.target.value)}
                  className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage">
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
              </div>
              <Field label="PIN code" value={form.pincode} onChange={(v) => update('pincode', v.replace(/\D/g, '').slice(0, 6))} error={errors.pincode} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Payment Method</h2>
            <div className="space-y-2">
              {PAYMENTS.map((p) => (
                <label key={p.id} className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-ink/10 cursor-pointer hover:border-sage">
                  <input type="radio" name="payment" value={p.id} checked={form.paymentMethod === p.id}
                    onChange={() => update('paymentMethod', p.id)} className="mt-1" />
                  <div>
                    <p className="font-medium text-sm">{p.label}</p>
                    <p className="text-xs text-muted">{p.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {errors.paymentMethod && <p className="text-xs text-red-600 mt-2">{errors.paymentMethod}</p>}
          </section>
        </div>

        <aside className="p-6 rounded-2xl bg-cream border border-ink/5 h-fit lg:sticky lg:top-28">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between gap-2">
                <span className="text-ink/80">{product.name} × {quantity}</span>
                <span>{formatINR((product.discountedPrice ?? product.price) * quantity)}</span>
              </div>
            ))}
            <div className="border-t border-ink/10 pt-3 flex justify-between"><span className="text-muted">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{delivery === 0 ? 'Free' : formatINR(delivery)}</span></div>
            <div className="flex justify-between font-medium text-base"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          {serverError && <p className="mt-3 text-xs text-red-600">{serverError}</p>}
          <button disabled={busy} type="submit"
            className="mt-5 w-full bg-ink text-cream rounded-full py-3.5 font-medium hover:bg-sage transition-colors disabled:opacity-60">
            {busy ? 'Placing Order…' : 'Place Order'}
          </button>
          <p className="text-[11px] text-muted mt-3">By placing this order you confirm this is a demonstration transaction for an academic project.</p>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, error, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-ink/70 mb-1 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage" />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}