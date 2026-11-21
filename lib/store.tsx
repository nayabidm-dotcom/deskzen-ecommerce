'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Product, Order } from '@/types';
import { getProductById, getEffectivePrice, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/lib/products';

interface CartLine { productId: string; quantity: number; }

interface StoreContextType {
  hydrated: boolean;
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  orders: Order[];
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  saveOrder: (o: Order) => void;
  findOrder: (num: string) => Order | undefined;
  cartCount: number;
  subtotal: number;
  delivery: number;
  total: number;
  cartProducts: { product: Product; quantity: number }[];
}

const StoreContext = createContext<StoreContextType | null>(null);

const LS = {
  cart: 'deskzen_cart_v1',
  wishlist: 'deskzen_wishlist_v1',
  compare: 'deskzen_compare_v1',
  recently: 'deskzen_recent_v1',
  orders: 'deskzen_orders_v1',
};

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; }
  catch { return fallback; }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCart(load(LS.cart, []));
    setWishlist(load(LS.wishlist, []));
    setCompare(load(LS.compare, []));
    setRecentlyViewed(load(LS.recently, []));
    setOrders(load(LS.orders, []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(LS.cart, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS.wishlist, JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS.compare, JSON.stringify(compare)); }, [compare, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS.recently, JSON.stringify(recentlyViewed)); }, [recentlyViewed, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(LS.orders, JSON.stringify(orders)); }, [orders, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.productId === id);
      if (existing) return prev.map((l) => l.productId === id ? { ...l, quantity: Math.min(99, l.quantity + qty) } : l);
      return [...prev, { productId: id, quantity: qty }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) =>
    setCart((prev) => prev.filter((l) => l.productId !== id)), []);

  const setQuantity = useCallback((id: string, qty: number) =>
    setCart((prev) => qty <= 0 ? prev.filter((l) => l.productId !== id)
      : prev.map((l) => l.productId === id ? { ...l, quantity: Math.min(99, qty) } : l)), []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), []);

  const toggleCompare = useCallback((id: string) =>
    setCompare((prev) => prev.includes(id) ? prev.filter((x) => x !== id)
      : prev.length >= 3 ? prev : [...prev, id]), []);

  const addRecentlyViewed = useCallback((id: string) =>
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8)), []);

  const saveOrder = useCallback((o: Order) =>
    setOrders((prev) => [o, ...prev.filter((x) => x.orderNumber !== o.orderNumber)]), []);

  const findOrder = useCallback((num: string) =>
    orders.find((o) => o.orderNumber.toLowerCase() === num.toLowerCase()), [orders]);

  const cartProducts = useMemo(() =>
    cart.map((l) => ({ product: getProductById(l.productId)!, quantity: l.quantity }))
        .filter((x) => Boolean(x.product)), [cart]);

  const subtotal = useMemo(() =>
    cartProducts.reduce((sum, { product, quantity }) => sum + getEffectivePrice(product) * quantity, 0), [cartProducts]);

  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const cartCount = cart.reduce((n, l) => n + l.quantity, 0);

  const value: StoreContextType = {
    hydrated, cart, wishlist, compare, recentlyViewed, orders, cartOpen,
    openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
    addToCart, removeFromCart, setQuantity, clearCart,
    toggleWishlist, isWishlisted: (id) => wishlist.includes(id),
    toggleCompare, isCompared: (id) => compare.includes(id),
    addRecentlyViewed, saveOrder, findOrder,
    cartCount, subtotal, delivery, total, cartProducts,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}