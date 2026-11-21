import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Journal — Workspace Guides',
  description: 'Buying guides and workspace inspiration: best study tables, ergonomic chairs, laptop stands, desk organization and small-space ideas.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <div className="pt-24 md:pt-32 container-x pb-16">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-3">Journal</p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">Workspace guides.</h1>
      <p className="mt-4 max-w-2xl text-muted">Practical buying guides and workspace inspiration for students and professionals.</p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.05}>
            <Link href={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl bg-cream border border-ink/5 hover:shadow-soft transition-shadow h-full">
              <p className="text-[10px] uppercase tracking-[0.25em] text-sage mb-3">{post.category} · {post.readTime}</p>
              <h2 className="font-display text-xl leading-snug group-hover:text-sage transition-colors">{post.title}</h2>
              <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider">
                Read <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}