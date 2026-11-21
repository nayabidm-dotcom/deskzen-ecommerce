'use client';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star, Scale } from 'lucide-react';
import { Product, formatINR, getDiscountPercent, getEffectivePrice } from '@/lib/products';
import { useStore } from '@/lib/store';
import SmartImage from './SmartImage';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isCompared, hydrated } = useStore();
  const effective = getEffectivePrice(product);
  const discount = getDiscountPercent(product);
  const wished = hydrated && isWishlisted(product.id);
  const compared = hydrated && isCompared(product.id);

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-sand aspect-[4/5]">
        <Link href={`/products/${product.slug}`}>
          <SmartImage src={product.image} alt={`${product.name} — ${product.seoTitle}`}
            className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        </Link>

        {product.badge && (
          <span className="absolute top-3 left-3 bg-cream text-ink text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-sage text-cream text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium">
            -{discount}%
          </span>
        )}

        <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist"
            className={cn('h-9 w-9 grid place-items-center rounded-full bg-cream shadow-soft hover:bg-sage hover:text-cream transition-colors', wished && 'bg-sage text-cream')}>
            <Heart size={15} className={wished ? 'fill-current' : ''} />
          </button>
          <Link href={`/products/${product.slug}`} aria-label="Quick view"
            className="h-9 w-9 grid place-items-center rounded-full bg-cream shadow-soft hover:bg-sage hover:text-cream transition-colors">
            <Eye size={15} />
          </Link>
          <button onClick={() => toggleCompare(product.id)} aria-label="Compare"
            className={cn('h-9 w-9 grid place-items-center rounded-full bg-cream shadow-soft hover:bg-sage hover:text-cream transition-colors', compared && 'bg-sage text-cream')}>
            <Scale size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Star size={12} className="fill-wood text-wood" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount} reviews</span>
        </div>
        <Link href={`/products/${product.slug}`} className="font-medium text-ink hover:text-sage transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-ink font-medium">{formatINR(effective)}</span>
          {product.discountedPrice && (
            <span className="text-muted text-sm line-through">{formatINR(product.price)}</span>
          )}
        </div>
      </div>

      <button onClick={() => addToCart(product.id)}
        className="mt-3 inline-flex items-center justify-center gap-2 border border-ink/15 rounded-full py-2.5 text-sm font-medium hover:bg-ink hover:text-cream transition-colors">
        <ShoppingBag size={14} /> Add to Cart
      </button>
    </article>
  );
}