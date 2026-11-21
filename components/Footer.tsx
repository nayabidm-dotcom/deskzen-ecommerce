'use client';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/products';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.message || 'Subscribed!');
      if (res.ok) setEmail('');
    } catch { setMsg('Something went wrong. Try again.'); }
    finally { setBusy(false); }
  };

  return (
    <footer className="bg-ink text-cream/80 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-display text-2xl text-cream">Desk<span className="text-sage">Zen</span></span>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Smart workspace products for students and professionals. Design your space. Elevate your productivity.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-cream/5 hover:bg-cream/10"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-cream/5 hover:bg-cream/10"><Twitter size={16} /></a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-cream/5 hover:bg-cream/10"><Linkedin size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li><Link href="/shop" className="hover:text-cream">All Products</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link href={`/categories/${c.slug}`} className="hover:text-cream">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li><Link href="/about" className="hover:text-cream">About DeskZen</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-cream">Journal</Link></li>
              <li><Link href="/faq" className="hover:text-cream">FAQ</Link></li>
              <li><Link href="/track-order" className="hover:text-cream">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li><Link href="/policies/shipping" className="hover:text-cream">Shipping Policy</Link></li>
              <li><Link href="/policies/returns" className="hover:text-cream">Return Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-cream">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10">
          <h4 className="font-display text-lg text-cream mb-3">Join the DeskZen newsletter</h4>
          <p className="text-sm text-cream/60 mb-4">Workspace tips, new launches and subscriber-only offers.</p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-cream/5 border border-cream/15 rounded-lg pl-9 pr-3 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-sage" />
            </div>
            <button disabled={busy} className="bg-sage hover:bg-sageDark transition-colors text-cream rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-60">
              {busy ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          {msg && <p className="mt-2 text-xs text-sage">{msg}</p>}
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} DeskZen. Academic demonstration project.</p>
          <p>Prices and product data are illustrative for a class project, not verified market quotations.</p>
        </div>
      </div>
    </footer>
  );
}