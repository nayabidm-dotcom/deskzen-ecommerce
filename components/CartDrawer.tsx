'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from './SmartImage';

export default function CartDrawer() {
  const { cartOpen, closeCart, cartProducts, setQuantity, removeFromCart, subtotal, delivery, total } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/40" onClick={closeCart} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-cream flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-ink/10">
              <h2 className="font-display text-2xl">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart"><X size={20} /></button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="flex-1 grid place-items-center p-6 text-center">
                <div>
                  <ShoppingBag size={36} className="mx-auto text-muted mb-4" />
                  <p className="text-ink/70">Your cart is empty.</p>
                  <Link href="/shop" onClick={closeCart} className="mt-6 inline-block bg-ink text-cream px-6 py-3 rounded-full text-sm">
                    Start Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {cartProducts.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4">
                      <div className="h-24 w-20 rounded-xl overflow-hidden bg-sand shrink-0">
                        <SmartImage src={product.image} alt={product.name} className="h-full w-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${product.slug}`} onClick={closeCart}
                          className="text-sm font-medium line-clamp-2 hover:text-sage">{product.name}</Link>
                        <p className="text-sm text-muted mt-1">{formatINR(getEffectivePrice(product))}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center border border-ink/15 rounded-full">
                            <button onClick={() => setQuantity(product.id, quantity - 1)} className="p-1.5" aria-label="Decrease"><Minus size={12} /></button>
                            <span className="text-xs w-6 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(product.id, quantity + 1)} className="p-1.5" aria-label="Increase"><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-muted hover:text-ink" aria-label="Remove"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-ink/10 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatINR(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{delivery === 0 ? 'Free' : formatINR(delivery)}</span></div>
                  <div className="flex justify-between font-medium text-base"><span>Total</span><span>{formatINR(total)}</span></div>
                  <Link href="/checkout" onClick={closeCart}
                    className="mt-2 block text-center bg-ink text-cream rounded-full py-3.5 font-medium hover:bg-sage transition-colors">
                    Proceed to Checkout
                  </Link>
                  <Link href="/cart" onClick={closeCart} className="block text-center text-sm text-muted hover:text-ink pt-1">
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}