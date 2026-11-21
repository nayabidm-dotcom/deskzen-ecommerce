import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Workspace Products',
  description: 'Browse ergonomic chairs, study tables, laptop stands, desk organizers, LED lamps and small-space solutions. Filter by category, price, rating and more.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="container-x pb-16">
        <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Shop</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">
          Every product your workspace needs.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          {`Browse our demonstration catalogue of 25 workspace products. Filter by category, price, rating and availability.`}
        </p>
        <Suspense fallback={<p className="mt-10 text-muted">Loading products…</p>}>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}