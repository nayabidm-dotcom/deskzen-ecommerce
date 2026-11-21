import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES, getCategory, getProductsByCategory } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import { breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  const title = `${cat.name} — ${cat.keyword} | DeskZen`;
  return {
    title,
    description: cat.description + ` Shop ${cat.name.toLowerCase()} online at DeskZen. Pan-India delivery.`,
    alternates: { canonical: `/categories/${cat.slug}` },
    openGraph: { title, description: cat.description, images: [{ url: cat.image }] },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const products = getProductsByCategory(cat.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Categories', url: '/categories' },
          { name: cat.name, url: `/categories/${cat.slug}` },
        ])
      ) }} />

      <div className="pt-24 md:pt-32">
        <div className="container-x">
          <nav className="flex items-center gap-1 text-xs text-muted mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-ink">Categories</Link>
            <ChevronRight size={12} />
            <span className="text-ink">{cat.name}</span>
          </nav>
        </div>

        <div className="container-x pb-16">
          <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">{cat.tagline}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">{cat.name}</h1>
          <p className="mt-4 max-w-2xl text-muted">{cat.description}</p>
          <p className="mt-2 text-xs text-muted">Target search intent: <span className="font-medium text-ink/70">{cat.keyword}</span></p>

          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </>
  );
}