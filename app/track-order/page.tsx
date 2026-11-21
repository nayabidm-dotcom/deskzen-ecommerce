'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { formatINR } from '@/lib/products';
import { Order } from '@/types';

export default function TrackOrderPage() {
  const { findOrder, hydrated } = useStore();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Order | null | 'not-found'>(null);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hydrated) return;
    const found = findOrder(input.trim());
    setResult(found ?? 'not-found');
  };

  return (
    <div className="pt-24 md:pt-32 container-x pb-16 max-w-2xl">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Order Tracking</p>
      <h1 className="font-display text-4xl sm:text-5xl">Track your order.</h1>
      <p className="text-muted mt-3">
        Enter the Order ID from your confirmation page. This is a demonstration tracker stored in your browser — no live courier integration.
      </p>

      <form onSubmit={lookup} className="mt-8 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} required
          placeholder="e.g. DZ-20250115-ABCD"
          className="flex-1 bg-cream border border-ink/15 rounded-lg px-4 py-3 text-sm outline-none focus:border-sage" />
        <button className="bg-ink text-cream px-6 rounded-lg text-sm hover:bg-sage transition-colors">Track</button>
      </form>

      {result === 'not-found' && <p className="mt-6 text-sm text-red-600">No order found with that ID in this browser.</p>}

      {result && result !== 'not-found' && (
        <div className="mt-8 p-6 rounded-2xl bg-cream border border-ink/5">
          <p className="text-xs uppercase tracking-wider text-muted">Order</p>
          <p className="font-medium">{result.orderNumber}</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">Status</p>
          <p className="text-sage font-medium">{result.orderStatus}</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">Placed on</p>
          <p className="text-sm">{new Date(result.createdAt).toLocaleDateString('en-IN')}</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">Estimated delivery</p>
          <p className="text-sm">{result.estimatedDelivery} (demonstration estimate)</p>
          <div className="mt-5 border-t border-ink/10 pt-3 text-sm space-y-1">
            {result.items.map((it) => (
              <div key={it.productId} className="flex justify-between">
                <span>{it.productName} × {it.quantity}</span><span>{formatINR(it.subtotal)}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium pt-2 border-t border-ink/10"><span>Total</span><span>{formatINR(result.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}