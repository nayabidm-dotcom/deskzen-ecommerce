'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getProductById } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  if (!hydrated) return <div className="pt-32 container-x py-16"><p className="text-muted">Loading…</p></div>;
  const products = wishlist.map(getProductById).filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <h1 className="font-display text-4xl sm:text-5xl">Your Wishlist</h1>
      {products.length === 0 ? (
        <div className="mt-12 text-center py-20 border border-dashed border-ink/15 rounded-2xl">
          <Heart size={32} className="mx-auto text-muted mb-4" />
          <p className="font-display text-2xl">Nothing here yet.</p>
          <p className="text-muted mt-2">Tap the heart on any product to save it.</p>
          <Link href="/shop" className="mt-6 inline-block bg-ink text-cream px-7 py-3 rounded-full text-sm">Browse Products</Link>
        </div>
      ) : (
        <div className="mt-10"><ProductGrid products={products} /></div>
      )}
    </div>
  );
}