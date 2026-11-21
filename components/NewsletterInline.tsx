'use client';
import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterInline() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
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
    <>
      <form onSubmit={submit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-cream/5 border border-cream/15 rounded-full pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-sage" />
        </div>
        <button disabled={busy} className="bg-sage hover:bg-sageDark text-cream rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60">
          {busy ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {msg && <p className="mt-3 text-xs text-sage">{msg}</p>}
    </>
  );
}