'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Product, formatINR, getDiscountPercent, getEffectivePrice, getReviewsForProduct } from '@/lib/products';
import { useStore } from '@/lib/store';
import SmartImage from '@/components/SmartImage';
import ProductGrid from '@/components/ProductGrid';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated, addRecentlyViewed } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const effective = getEffectivePrice(product);
  const discount = getDiscountPercent(product);
  const wished = hydrated && isWishlisted(product.id);
  const reviews = getReviewsForProduct(product.id);

  useEffect(() => { addRecentlyViewed(product.id); }, [product.id, addRecentlyViewed]);

  const checkPin = () => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setPinMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setPinMsg('Pan-India delivery available. Final serviceability and delivery estimate will be confirmed for your location.');
  };

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-x">
        <nav className="flex items-center gap-1 text-xs text-muted mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/categories/${product.category}`} className="hover:text-ink capitalize">{product.category.replace(/-/g, ' ')}</Link>
          <ChevronRight size={12} />
          <span className="text-ink truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-sand mb-3">
              <SmartImage src={product.images[activeImg]} alt={`${product.name} — view ${activeImg + 1}`} className="h-full w-full" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={cn('aspect-square rounded-xl overflow-hidden bg-sand border-2 transition-colors',
                    activeImg === i ? 'border-ink' : 'border-transparent')}>
                  <SmartImage src={img} alt={`${product.name} thumbnail ${i + 1}`} className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-sage mb-2">{product.sku}</p>
            <h1 className="font-display text-3xl sm:text-4xl leading-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-wood text-wood' : 'text-ink/20'} />
                ))}
              </div>
              <span className="text-muted">{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-display">{formatINR(effective)}</span>
              {product.discountedPrice && (
                <>
                  <span className="text-muted line-through">{formatINR(product.price)}</span>
                  <span className="text-sage text-sm font-medium">-{discount}%</span>
                </>
              )}
            </div>

            <p className="mt-6 text-ink/80 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-ink/15 rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-lg" aria-label="Decrease">−</button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 py-2.5 text-lg" aria-label="Increase">+</button>
              </div>
              <button onClick={() => addToCart(product.id, qty)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-full py-3.5 font-medium hover:bg-sage transition-colors">
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist"
                className={cn('h-12 w-12 grid place-items-center rounded-full border border-ink/15 hover:bg-sand', wished && 'bg-sage text-cream border-sage')}>
                <Heart size={18} className={wished ? 'fill-current' : ''} />
              </button>
            </div>

            <button onClick={() => { addToCart(product.id, qty); window.location.href = '/checkout'; }}
              className="mt-3 w-full border border-ink/15 rounded-full py-3.5 text-sm font-medium hover:bg-sand transition-colors">
              Buy Now
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-cream border border-ink/5">
                <Truck size={16} className="text-sage" />
                <span className="text-muted">Pan-India delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-cream border border-ink/5">
                <ShieldCheck size={16} className="text-sage" />
                <span className="text-muted">Warranty included</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-cream border border-ink/5">
                <RotateCcw size={16} className="text-sage" />
                <span className="text-muted">7-day returns</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-sand/50 border border-ink/5">
              <label className="text-sm font-medium">Check delivery availability</label>
              <div className="mt-2 flex gap-2">
                <input value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter PIN code" inputMode="numeric"
                  className="flex-1 bg-cream border border-ink/15 rounded-lg px-3 py-2 text-sm outline-none focus:border-sage" />
                <button onClick={checkPin} className="bg-ink text-cream px-5 rounded-lg text-sm hover:bg-sage transition-colors">Check</button>
              </div>
              {pinMsg && <p className="mt-2 text-xs text-muted">{pinMsg}</p>}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Reveal>
          <section className="mt-20 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl mb-4">Specifications</h2>
              <dl className="divide-y divide-ink/10 text-sm">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-ink font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-4">Key features</h2>
              <ul className="space-y-2 text-sm text-ink/80">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <h2 className="font-display text-2xl mt-8 mb-4">Delivery & returns</h2>
              <p className="text-sm text-muted leading-relaxed">
                Delivered to serviceable PIN codes across India. Estimated dispatch within 2–4 working days.
                Returns accepted within 7 days of delivery for unused items in original packaging.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Reviews */}
        <Reveal>
          <section className="mt-20">
            <h2 className="font-display text-2xl mb-6">Customer reviews</h2>
            <p className="text-xs text-muted mb-6">Sample reviews shown for demonstration purposes.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-5 rounded-xl bg-cream border border-ink/5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? 'fill-wood text-wood' : 'text-ink/20'} />
                    ))}
                  </div>
                  <p className="text-sm text-ink/80">“{r.reviewText}”</p>
                  <p className="mt-3 text-xs text-muted">— {r.customerName} · {r.createdAt}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Related */}
        <Reveal>
          <section className="mt-20 pb-16">
            <h2 className="font-display text-2xl mb-6">You may also like</h2>
            <ProductGrid products={related} />
          </section>
        </Reveal>
      </div>
    </div>
  );
}