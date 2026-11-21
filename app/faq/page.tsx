import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about DeskZen delivery, payment, returns, warranty and order tracking.',
  alternates: { canonical: '/faq' },
};

const FAQS = [
  { q: 'Do you deliver across India?', a: 'Yes — DeskZen ships to every serviceable PIN code across India. Enter your PIN code on a product page to confirm coverage. Final serviceability and delivery timing are confirmed after order review.' },
  { q: 'What payment methods are accepted?', a: 'UPI, credit card, debit card, cash on delivery and a demonstration online payment option are shown at checkout. This is a demonstration project and no real payment gateway is integrated.' },
  { q: 'What is the return policy?', a: 'Returns are accepted within 7 days of delivery for unused items in original packaging. See our Returns Policy for details.' },
  { q: 'Is there a warranty?', a: 'Selected products carry a manufacturer warranty between 1 and 2 years. Warranty details appear on each product page.' },
  { q: 'How do I track my order?', a: 'Use the Track Order page with your Order ID. This is a demonstration tracker stored in your browser — no live courier integration.' },
  { q: 'Can I compare multiple products?', a: 'Yes. Add up to 3 products to the Compare tray from any product card or detail page.' },
];

export default function FAQPage() {
  return (
    <div className="pt-24 md:pt-32 container-x pb-16 max-w-3xl">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">FAQ</p>
      <h1 className="font-display text-4xl sm:text-5xl">Frequently asked questions.</h1>
      <div className="mt-10 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="p-5 rounded-2xl bg-cream border border-ink/5 group">
            <summary className="cursor-pointer font-medium flex justify-between items-center">
              {f.q}
              <span className="text-muted group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}