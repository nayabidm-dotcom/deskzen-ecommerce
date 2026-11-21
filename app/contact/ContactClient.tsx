'use client';
import { useState } from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErrors({}); setMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setMsg(data.message); setForm({ name: '', email: '', subject: '', message: '' }); }
      else setErrors(data.errors ?? {});
    } catch { setMsg('Something went wrong.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Contact</p>
      <h1 className="font-display text-4xl sm:text-5xl">Let's talk.</h1>
      <p className="text-muted mt-3 max-w-xl">Product questions, order support or feedback about the demonstration — we read every message.</p>

      <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-ink/70 mb-1 block">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage" />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm text-ink/70 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage" />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="text-sm text-ink/70 mb-1 block">Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage" />
            {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
          </div>
          <div>
            <label className="text-sm text-ink/70 mb-1 block">Message</label>
            <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sage" />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
          </div>
          <button disabled={busy} className="bg-ink text-cream rounded-full px-7 py-3 text-sm font-medium hover:bg-sage transition-colors disabled:opacity-60">
            {busy ? 'Sending…' : 'Send Message'}
          </button>
          {msg && <p className="text-sm text-sage">{msg}</p>}
        </form>

        <aside className="space-y-4 text-sm">
          <div className="p-5 rounded-2xl bg-cream border border-ink/5">
            <Mail size={18} className="text-sage mb-2" />
            <p className="font-medium">Email</p>
            <p className="text-muted">support@deskzen.in</p>
          </div>
          <div className="p-5 rounded-2xl bg-cream border border-ink/5">
            <MessageCircle size={18} className="text-sage mb-2" />
            <p className="font-medium">Hours</p>
            <p className="text-muted">Mon–Sat, 10am – 6pm IST</p>
          </div>
          <div className="p-5 rounded-2xl bg-cream border border-ink/5">
            <MapPin size={18} className="text-sage mb-2" />
            <p className="font-medium">Delivery</p>
            <p className="text-muted">Pan-India. Demonstration project only.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}