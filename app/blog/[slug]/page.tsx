import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog';
import { getProductBySlug, formatINR, getEffectivePrice } from '@/lib/products';
import SmartImage from '@/components/SmartImage';
import { breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPostBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.metaDescription,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.metaDescription, type: 'article' },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const products = post.relatedProducts.map(getProductBySlug).filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'DeskZen' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Journal', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])
      ) }} />

      <div className="pt-24 md:pt-32 container-x pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sage mb-3">{post.category} · {post.readTime} · {post.date}</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">{post.title}</h1>
          <p className="text-muted mt-4 text-lg leading-relaxed">{post.excerpt}</p>

          <div className="mt-10 space-y-8">
            {post.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl mb-3">{s.heading}</h2>
                {s.paragraphs.map((para, i) => <p key={i} className="text-ink/80 leading-relaxed mb-3">{para}</p>)}
              </section>
            ))}
          </div>

          {products.length > 0 && (
            <section className="mt-14 pt-10 border-t border-ink/10">
              <h2 className="font-display text-2xl mb-5">Shop the products mentioned</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {products.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`}
                    className="rounded-2xl bg-cream border border-ink/5 overflow-hidden hover:shadow-soft transition-shadow">
                    <div className="aspect-square bg-sand overflow-hidden">
                      <SmartImage src={p.image} alt={p.name} className="h-full w-full" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-2">{p.name}</p>
                      <p className="text-sm text-muted mt-1">{formatINR(getEffectivePrice(p))}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 pt-6 border-t border-ink/10 text-xs text-muted">
            <Link href="/blog" className="hover:text-ink underline underline-offset-4">← All articles</Link>
          </div>
        </div>
      </div>
    </>
  );
}