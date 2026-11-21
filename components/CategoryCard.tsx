import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/products';
import SmartImage from './SmartImage';

export default function CategoryCard({ category, large }: { category: Category; large?: boolean }) {
  return (
    <Link href={`/categories/${category.slug}`}
      className={`group relative overflow-hidden rounded-2xl block ${large ? 'aspect-[4/5]' : 'aspect-square'}`}>
      <SmartImage src={category.image} alt={`${category.name} — ${category.keyword}`}
        className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-1">{category.tagline}</p>
        <h3 className="font-display text-xl sm:text-2xl">{category.name}</h3>
        <p className="text-sm text-cream/70 mt-1 line-clamp-2 hidden sm:block">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-wider">
          Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}