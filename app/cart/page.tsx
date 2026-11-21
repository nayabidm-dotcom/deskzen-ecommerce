'use client';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from '@/components/SmartImage';

export default function CartPage() {
  const { cartProducts, setQuantity, removeFromCart, subtotal, delivery, total, hydrated } = useStore();

  if (!hydrated) return <div className="pt-32 container-x py-16"><p className="text-muted">Loading cart…</p></div>;

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <h1 className="font-display text-4xl sm:text-5xl">Your Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="mt-16 text-center py-20 border border-dashed border-ink/15 rounded-2xl">
          <ShoppingBag size={32} className="mx-auto text-muted mb-4" />
          <p className="font-display text-2xl">Your cart is empty.</p>
          <p className="text-muted mt-2">Explore our workspace collection to get started.</p>
          <Link href="/shop" className="mt-6 inline-block bg-ink text-cream px-7 py-3 rounded-full text-sm">Start Shopping</Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-5">
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 rounded-2xl bg-cream border border-ink/5">
                <Link href={`/products/${product.slug}`} className="h-28 w-24 rounded-xl overflow-hidden bg-sand shrink-0">
                  <SmartImage src={product.image} alt={product.name} className="h-full w-full" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.slug}`} className="font-medium hover:text-sage">{product.name}</Link>
                  <p className="text-xs text-muted mt-0.5 capitalize">{product.category.replace(/-/g, ' ')}</p>
                  <p className="text-sm mt-1">{formatINR(getEffectivePrice(product))}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-ink/15 rounded-full">
                      <button onClick={() => setQuantity(product.id, quantity - 1)} className="p-2" aria-label="Decrease"><Minus size={12} /></button>
                      <span className="text-xs w-6 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(product.id, quantity + 1)} className="p-2" aria-label="Increase"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-muted hover:text-ink text-xs inline-flex items-center gap-1">
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-medium">
                  {formatINR(getEffectivePrice(product) * quantity)}
                </div>
              </div>
            ))}
            <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink underline underline-offset-4">
              ← Continue Shopping
            </Link>
          </div>

          <aside className="p-6 rounded-2xl bg-cream border border-ink/5 h-fit lg:sticky lg:top-28">
            <h2 className="font-display text-xl mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{delivery === 0 ? 'Free' : formatINR(delivery)}</span></div>
              <div className="border-t border-ink/10 pt-3 flex justify-between font-medium text-base">
                <span>Total</span><span>{formatINR(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-5 flex items-center justify-center gap-2 bg-ink text-cream rounded-full py-3.5 font-medium hover:bg-sage transition-colors">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}