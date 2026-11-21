import type { MetadataRoute } from 'next';
import { CATEGORIES, PRODUCTS } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog';
import { siteMetadata } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/bundle`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/recommender`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/track-order`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const categories = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8,
  }));
  const products = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75,
  }));
  const posts = BLOG_POSTS.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.date), changeFrequency: 'monthly' as const, priority: 0.6,
  }));
  const policies = ['shipping', 'returns', 'privacy', 'terms'].map((slug) => ({
    url: `${base}/policies/${slug}`,
    lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3,
  }));

  return [...staticPages, ...categories, ...products, ...posts, ...policies];
}