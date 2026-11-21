import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const POLICIES: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'Shipping Policy',
    body: [
      'DeskZen delivers to all serviceable PIN codes across India.',
      'Estimated dispatch is within 2–4 working days of order confirmation. Delivery typically follows within 3–7 days depending on location.',
      'Delivery charges are ₹99 for orders under ₹999 and free for orders ₹999 and above.',
      'This is a demonstration project — no real shipping is performed.',
    ],
  },
  returns: {
    title: 'Return Policy',
    body: [
      'Returns are accepted within 7 days of delivery for unused items in original packaging.',
      'Refunds are processed to the original payment method within 7–10 working days after inspection.',
      'Return shipping is arranged by DeskZen for damaged or incorrect items.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'DeskZen respects your privacy. Personal information collected at checkout is used only to process orders and support customers.',
      'In this academic demonstration, data entered is stored in your browser (localStorage) and is not transmitted to any third party.',
      'If Supabase is configured, customer records are stored securely in a PostgreSQL database with server-only access keys.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      'DeskZen is a demonstration e-commerce project for an MBA Digital Marketing and SEO class.',
      'All products, prices, images and reviews are illustrative and not verified market quotations.',
      'No real payment gateway is integrated. Do not enter real card information.',
      'By using this site you agree that this is an academic demonstration.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = POLICIES[params.slug];
  if (!p) return {};
  return { title: p.title, alternates: { canonical: `/policies/${params.slug}` } };
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const p = POLICIES[params.slug];
  if (!p) notFound();
  return (
    <div className="pt-24 md:pt-32 container-x pb-16 max-w-3xl">
      <h1 className="font-display text-4xl sm:text-5xl">{p.title}</h1>
      <div className="mt-8 space-y-4 text-sm text-ink/80 leading-relaxed">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </div>
  );
}