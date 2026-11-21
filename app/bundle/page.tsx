'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { PRODUCTS, formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from '@/components/SmartImage';
import { cn } from '@/lib/utils';

const SLOTS = [
  { key: 'table', label: 'Study Table', category: 'study-essentials' as const },
  { key: 'chair', label: 'Ergonomic Chair', category: 'ergonomic-workspace' as const },
  { key: 'stand', label: 'Laptop Stand', category: 'study-essentials' as const },
  { key: 'lamp', label: 'Desk Lamp', category: 'study-essentials' as const },
  { key: 'organizer', label: 'Desk Organizer', category: 'desk-organization' as const },
];

export default function BundlePage() {
  const { addToCart } = useStore();
  const [selected, setSelected] = useState<Record<string, string>>({});

  const chosenProducts = Object.values(selected).map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS;
  const total = chosenProducts.reduce((s, p) => s + getEffectivePrice(p), 0);
  const bundleDiscount = chosenProducts.length >= 3 ? Math.round(total * 0.05) : 0;
  const finalTotal = total - bundleDiscount;

  const addBundle = () => {
    chosenProducts.forEach((p) => addToCart(p.id));
  };

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Workspace Bundle</p>
      <h1 className="font-display text-4xl sm:text-5xl">Build your workspace.</h1>
      <p className="text-muted mt-3 max-w-2xl">
        Pick products to build a personalised workspace. Bundles with 3+ items receive an additional 5% off at checkout. (Demonstration pricing.)
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="space-y-8">
          {SLOTS.map((slot) => {
            const options = PRODUCTS.filter((p) => p.category === slot.category).slice(0, 4);
            return (
              <div key={slot.key}>
                <h2 className="font-display text-xl mb-3">{slot.label}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {options.map((p) => {
                    const active = selected[slot.key] === p.id;
                    return (
                      <button key={p.id} onClick={() => setSelected((s) => ({ ...s, [slot.key]: active ? '' : p.id }))}
                        className={cn('text-left rounded-xl border-2 overflow-hidden transition-all', active ? 'border-sage' : 'border-transparent hover:border-ink/15')}>
                        <div className="aspect-square bg-sand overflow-hidden">
                          <SmartImage src={p.image} alt={p.name} className="h-full w-full" />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium line-clamp-1">{p.name}</p>
                          <p className="text-xs text-muted mt-0.5">{formatINR(getEffectivePrice(p))}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="p-6 rounded-2xl bg-cream border border-ink/5 h-fit lg:sticky lg:top-28">
          <h2 className="font-display text-xl mb-4">Your Bundle</h2>
          {chosenProducts.length === 0 ? (
            <p className="text-sm text-muted">Select products to see your bundle total.</p>
          ) : (
            <div className="space-y-2 text-sm">
              {chosenProducts.map((p) => (
                <div key={p.id} className="flex justify-between gap-2">
                  <span className="line-clamp-1">{p.name}</span>
                  <span className="shrink-0">{formatINR(getEffectivePrice(p))}</span>
                </div>
              ))}
              <div className="border-t border-ink/10 pt-2 mt-2">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatINR(total)}</span></div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-sage"><span>Bundle discount (5%)</span><span>−{formatINR(bundleDiscount)}</span></div>
                )}
                <div className="flex justify-between font-medium mt-1"><span>Total</span><span>{formatINR(finalTotal)}</span></div>
              </div>
            </div>
          )}
          <button onClick={addBundle} disabled={chosenProducts.length === 0}
            className="mt-5 w-full bg-ink text-cream rounded-full py-3.5 font-medium hover:bg-sage transition-colors disabled:opacity-60">
            Add bundle to cart
          </button>
          <Link href="/cart" className="mt-2 block text-center text-sm text-muted hover:text-ink">View cart</Link>
        </aside>
      </div>
    </div>
  );
}