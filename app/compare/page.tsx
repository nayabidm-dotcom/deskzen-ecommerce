'use client';
import Link from 'next/link';
import { X, Scale } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getProductById, formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from '@/components/SmartImage';

export default function ComparePage() {
  const { compare, toggleCompare, hydrated } = useStore();
  if (!hydrated) return <div className="pt-32 container-x py-16"><p className="text-muted">Loading…</p></div>;
  const products = compare.map(getProductById).filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  if (products.length === 0) {
    return (
      <div className="pt-32 container-x pb-16 text-center">
        <Scale size={32} className="mx-auto text-muted mb-4" />
        <p className="font-display text-3xl">No products to compare yet.</p>
        <p className="text-muted mt-2">Add up to 3 products from any product card or detail page.</p>
        <Link href="/shop" className="mt-6 inline-block bg-ink text-cream px-7 py-3 rounded-full text-sm">Browse Products</Link>
      </div>
    );
  }

  const allSpecKeys = Array.from(new Set(products.flatMap((p) => Object.keys(p.specifications))));

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <h1 className="font-display text-4xl sm:text-5xl mb-8">Compare Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr>
              <th className="text-left p-3 w-40"></th>
              {products.map((p) => (
                <th key={p.id} className="p-3 text-left align-top">
                  <div className="relative">
                    <button onClick={() => toggleCompare(p.id)} aria-label="Remove"
                      className="absolute right-0 top-0 bg-cream p-1 rounded-full border border-ink/10"><X size={12} /></button>
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-sand mb-2">
                      <SmartImage src={p.image} alt={p.name} className="h-full w-full" />
                    </div>
                    <Link href={`/products/${p.slug}`} className="font-medium hover:text-sage">{p.name}</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink/10">
              <td className="p-3 text-muted font-medium">Price</td>
              {products.map((p) => <td key={p.id} className="p-3">{formatINR(getEffectivePrice(p))}</td>)}
            </tr>
            <tr className="border-t border-ink/10">
              <td className="p-3 text-muted font-medium">Material</td>
              {products.map((p) => <td key={p.id} className="p-3">{p.material}</td>)}
            </tr>
            <tr className="border-t border-ink/10">
              <td className="p-3 text-muted font-medium">Dimensions</td>
              {products.map((p) => <td key={p.id} className="p-3">{p.dimensions}</td>)}
            </tr>
            {allSpecKeys.map((k) => (
              <tr key={k} className="border-t border-ink/10">
                <td className="p-3 text-muted font-medium">{k}</td>
                {products.map((p) => <td key={p.id} className="p-3">{p.specifications[k] ?? '—'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}