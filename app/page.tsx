import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, Leaf, Headphones, Maximize2, Grid3x3, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductGrid from '@/components/ProductGrid';
import Reveal from '@/components/Reveal';
import NewsletterInline from '@/components/NewsletterInline';
import { CATEGORIES, PRODUCTS, getReviewsForProduct } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog';

const WHY = [
  { icon: ShieldCheck, title: 'Ergonomic Comfort', text: 'Designed around posture, not trends.' },
  { icon: Grid3x3, title: 'Smart Organization', text: 'A place for everything you use daily.' },
  { icon: Maximize2, title: 'Space-Saving Design', text: 'Built for compact rooms and studio living.' },
  { icon: Leaf, title: 'Quality Materials', text: 'Solid wood, powder-coated steel, durable finishes.' },
  { icon: Truck, title: 'Pan-India Delivery', text: 'Shipped to every serviceable PIN code in India.' },
  { icon: Headphones, title: 'Customer Support', text: 'Real humans on email, Monday to Saturday.' },
];

const COLLECTIONS = [
  { title: 'The Student Productivity Setup', blurb: 'Study table, laptop stand, LED lamp and organizer.', cat: 'study-essentials' },
  { title: 'The Professional Workstation', blurb: 'Ergonomic chair, monitor stand and desk mat.', cat: 'ergonomic-workspace' },
  { title: 'The Compact Workspace', blurb: 'Wall-mounted desk and slim storage for small rooms.', cat: 'small-space-solutions' },
  { title: 'The Minimalist Desk', blurb: 'Desk mat, cable kit and wooden organizer.', cat: 'desk-organization' },
];

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.badge).concat(PRODUCTS.slice(0, 8)).slice(0, 8);
  const reviews = getReviewsForProduct('p06').concat(getReviewsForProduct('p01')).slice(0, 6);

  return (
    <>
      <Hero />

      {/* Category strip */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-muted mb-2">Shop by category</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Built for how you work</h2>
            </div>
            <Link href="/categories" className="text-sm underline underline-offset-4 text-ink/70 hover:text-ink">View all categories</Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
              <CategoryCard category={c} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs text-muted mb-2">Bestsellers</p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Loved by students & professionals</h2>
              </div>
              <Link href="/shop?sort=popularity" className="text-sm underline underline-offset-4 text-ink/70 hover:text-ink">Shop all</Link>
            </div>
          </Reveal>
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      {/* Why choose */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <p className="uppercase tracking-[0.25em] text-xs text-muted mb-2">Why DeskZen</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Thoughtful design, every detail</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="p-7 rounded-2xl bg-cream border border-ink/5 hover:shadow-soft transition-shadow h-full">
                <w.icon className="text-sage mb-4" size={22} />
                <h3 className="font-display text-xl mb-1">{w.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured collections */}
      <section className="bg-ink text-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs text-cream/50 mb-2">Featured collections</p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Curated workspaces</h2>
              </div>
              <Link href="/bundle" className="text-sm underline underline-offset-4 text-cream/70 hover:text-cream">Build your bundle</Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {COLLECTIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <Link href={`/categories/${c.cat}`}
                  className="group relative block aspect-[16/10] rounded-2xl overflow-hidden bg-cream/5 p-8 flex flex-col justify-end hover:bg-cream/10 transition-colors">
                  <h3 className="font-display text-2xl sm:text-3xl">{c.title}</h3>
                  <p className="text-cream/60 text-sm mt-2">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-muted mb-2">Customer reviews</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">What people are saying</h2>
              <p className="text-xs text-muted mt-2">Sample reviews shown for demonstration purposes.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <div className="p-6 rounded-2xl bg-cream border border-ink/5 h-full">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={12} className={idx < r.rating ? 'fill-wood text-wood' : 'text-ink/20'} />
                  ))}
                </div>
                <p className="text-sm text-ink/80 leading-relaxed">“{r.reviewText}”</p>
                <p className="mt-4 text-xs text-muted">— {r.customerName} <span className="text-[10px] uppercase tracking-wider">· Demo review</span></p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog / SEO content */}
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs text-muted mb-2">Journal</p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Workspace guides</h2>
              </div>
              <Link href="/blog" className="text-sm underline underline-offset-4 text-ink/70 hover:text-ink">Read all articles</Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 6).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-2xl bg-cream border border-ink/5 hover:shadow-soft transition-shadow h-full">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-sage mb-3">{post.category} · {post.readTime}</p>
                  <h3 className="font-display text-xl leading-snug group-hover:text-sage transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider">
                    Read <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="rounded-3xl bg-ink text-cream p-10 md:p-16 text-center">
            <p className="uppercase tracking-[0.25em] text-xs text-cream/60 mb-4">Join DeskZen</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl max-w-2xl mx-auto">
              Workspace inspiration, delivered monthly.
            </h2>
            <p className="text-cream/70 mt-4 max-w-md mx-auto">
              Desk setup ideas, new launches and subscriber-only offers. No spam.
            </p>
            <NewsletterInline />
          </div>
        </Reveal>
      </section>
    </>
  );
}