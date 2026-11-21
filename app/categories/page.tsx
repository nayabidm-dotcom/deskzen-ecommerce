import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/products';
import CategoryCard from '@/components/CategoryCard';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Categories — Shop by Workspace Need',
  description: 'Explore DeskZen categories: study essentials, ergonomic workspace, desk organization, desk accessories and small-space solutions.',
  alternates: { canonical: '/categories' },
};

export default function CategoriesPage() {
  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Categories</p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">
        Find the right workspace solution.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Five thoughtfully curated categories built around the way students and professionals actually work.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <CategoryCard category={c} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}