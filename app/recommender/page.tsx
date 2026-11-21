'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { PRODUCTS, formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from '@/components/SmartImage';

const PERSONAS = [
  { id: 'student', label: 'Student', blurb: 'Compact desk, laptop stand, LED lamp and organizer.', ids: ['p02', 'p05', 'p04', 'p11'] },
  { id: 'professional', label: 'Working Professional', blurb: 'Ergonomic chair, monitor stand, desk mat and wrist rest.', ids: ['p06', 'p08', 'p16', 'p10'] },
  { id: 'wfh', label: 'Work From Home', blurb: 'Executive chair, charging stand, cable kit and headphone stand.', ids: ['p07', 'p20', 'p12', 'p19'] },
  { id: 'gaming', label: 'Gaming Setup', blurb: 'RGB light, desk mat, headphone stand and vertical mouse setup.', ids: ['p17', 'p16', 'p19', 'p09'] },
];

export default function RecommenderPage() {
  const { addToCart } = useStore();
  const [picked, setPicked] = useState<string>('');
  const persona = PERSONAS.find((p) => p.id === picked);
  const products = persona ? persona.ids.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean) : [];
  const total = products.reduce((s, p) => s + getEffectivePrice(p), 0);

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Smart Recommender</p>
      <h1 className="font-display text-4xl sm:text-5xl">Tell us how you work.</h1>
      <p className="text-muted mt-3 max-w-2xl">
        We will put together a starting kit that fits your workflow. (Demonstration recommendation — sample bundles, not ML-driven.)
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PERSONAS.map((p) => (
          <button key={p.id} onClick={() => setPicked(p.id)}
            className={`text-left p-5 rounded-2xl border transition-all ${picked === p.id ? 'border-sage bg-cream shadow-soft' : 'border-ink/10 bg-cream/40 hover:border-ink/20'}`}>
            <p className="font-display text-xl">{p.label}</p>
            <p className="text-sm text-muted mt-1">{p.blurb}</p>
          </button>
        ))}
      </div>

      {persona && (
        <div className="mt-12">
          <h2 className="font-display text-2xl mb-6">Recommended for {persona.label}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-ink/5 bg-cream overflow-hidden">
                <div className="aspect-square bg-sand overflow-hidden">
                  <SmartImage src={p.image} alt={p.name} className="h-full w-full" />
                </div>
                <div className="p-4">
                  <Link href={`/products/${p.slug}`} className="text-sm font-medium hover:text-sage line-clamp-1">{p.name}</Link>
                  <p className="text-sm text-muted mt-1">{formatINR(getEffectivePrice(p))}</p>
                  <button onClick={() => addToCart(p.id)} className="mt-3 w-full border border-ink/15 rounded-full py-2 text-xs font-medium hover:bg-ink hover:text-cream transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-ink text-cream flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-display text-2xl">{persona.label} Starter Kit</p>
              <p className="text-cream/60 text-sm">{products.length} items · {formatINR(total)}</p>
            </div>
            <button onClick={() => products.forEach((p) => addToCart(p.id))}
              className="bg-sage hover:bg-sageDark text-cream px-6 py-3 rounded-full text-sm font-medium">
              Add entire kit to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}