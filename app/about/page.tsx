import type { Metadata } from 'next';
import SmartImage from '@/components/SmartImage';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About DeskZen',
  description: 'DeskZen designs smart, ergonomic and space-efficient workspace products for students and professionals in India.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">About</p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">
        We build workspaces that work with you.
      </h1>
      <p className="mt-6 max-w-2xl text-muted leading-relaxed">
        DeskZen is a demonstration e-commerce brand created for an MBA Digital Marketing and SEO class project.
        Our mission is to show what a premium, thoughtfully designed Indian workspace brand could look like —
        built on the idea that great work starts with a great setup.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
            <SmartImage src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
              alt="A premium minimalist workspace" className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl mb-4">Design philosophy</h2>
          <ul className="space-y-3 text-sm text-ink/80">
            <li><span className="text-sage font-medium">Ergonomics first.</span> Every product starts with posture, not aesthetics — though we obsess over both.</li>
            <li><span className="text-sage font-medium">Built for small spaces.</span> Most Indian homes are compact; our products respect that.</li>
            <li><span className="text-sage font-medium">Materials that last.</span> Solid wood, powder-coated steel and durable finishes.</li>
            <li><span className="text-sage font-medium">Honest pricing.</span> Pan-India delivery, transparent pricing, no gimmicks.</li>
          </ul>
        </Reveal>
      </div>

      <div className="mt-16 p-6 rounded-2xl bg-cream border border-ink/5 text-xs text-muted">
        <p><strong className="text-ink">Academic demonstration notice.</strong> DeskZen is a class project. All product data, reviews, prices and images are illustrative
        and intended for a learning demonstration only. Search volume estimates referenced in our SEO planning are not verified Google Keyword Planner figures.</p>
      </div>
    </div>
  );
}