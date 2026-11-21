'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { CATEGORIES, searchProducts } from '@/lib/products';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/bundle', label: 'Bundle Builder' },
  { href: '/recommender', label: 'Recommender' },
  { href: '/blog', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlist, hydrated, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const results = q ? searchProducts(q).slice(0, 5) : [];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { router.push(`/shop?q=${encodeURIComponent(q.trim())}`); setSearchOpen(false); setQ(''); }
  };

  return (
    <>
      <header className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'bg-cream/95 backdrop-blur shadow-soft' : 'bg-cream/60 backdrop-blur-sm'
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>

            <Link href="/" className="font-display text-2xl md:text-3xl tracking-tight text-ink">
              Desk<span className="text-sage">Zen</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7 text-sm">
              {NAV.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="text-ink/80 hover:text-ink transition-colors">
                  {item.label}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center gap-1 text-ink/80 hover:text-ink">
                  More <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-cream border border-ink/10 rounded-xl shadow-card p-2 w-52">
                    {NAV.slice(6).map((item) => (
                      <Link key={item.href} href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-ink/80 hover:bg-sand">
                        {item.label}
                      </Link>
                    ))}
                    <Link href="/track-order" className="block px-3 py-2 rounded-lg text-sm text-ink/80 hover:bg-sand">Track Order</Link>
                    <Link href="/compare" className="block px-3 py-2 rounded-lg text-sm text-ink/80 hover:bg-sand">Compare</Link>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-sand transition-colors" aria-label="Search">
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2 rounded-full hover:bg-sand transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {hydrated && wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-sage text-cream text-[10px] rounded-full h-4 w-4 grid place-items-center">{wishlist.length}</span>
                )}
              </Link>
              <button onClick={openCart} className="p-2 rounded-full hover:bg-sand transition-colors relative" aria-label="Cart">
                <ShoppingBag size={20} />
                {hydrated && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-sage text-cream text-[10px] rounded-full h-4 w-4 grid place-items-center">{cartCount}</span>
                )}
              </button>
              <Link href="/track-order" className="p-2 rounded-full hover:bg-sand transition-colors hidden sm:block" aria-label="Account / Orders">
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto h-full w-80 max-w-[85%] bg-cream p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-xl">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-ink/5 text-ink/80">{item.label}</Link>
              ))}
              <Link href="/track-order" onClick={() => setMobileOpen(false)} className="py-3 border-b border-ink/5 text-ink/80">Track Order</Link>
              <Link href="/compare" onClick={() => setMobileOpen(false)} className="py-3 border-b border-ink/5 text-ink/80">Compare Products</Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="py-3 border-b border-ink/5 text-ink/80">Wishlist</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setSearchOpen(false)} />
          <div className="relative mx-auto mt-24 max-w-2xl bg-cream rounded-2xl shadow-card p-6">
            <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-ink/15 pb-3">
              <Search size={20} className="text-muted" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search study tables, laptop stands, chairs…"
                className="flex-1 bg-transparent outline-none text-lg" />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close"><X size={20} /></button>
            </form>
            {results.length > 0 && (
              <div className="mt-4 space-y-1">
                {results.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} onClick={() => setSearchOpen(false)}
                    className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-sand">
                    <span className="text-sm">{p.name}</span>
                    <span className="text-xs text-muted capitalize">{p.category.replace(/-/g, ' ')}</span>
                  </Link>
                ))}
              </div>
            )}
            {q && results.length === 0 && <p className="mt-4 text-sm text-muted">No products found for “{q}”.</p>}
          </div>
        </div>
      )}
    </>
  );
}