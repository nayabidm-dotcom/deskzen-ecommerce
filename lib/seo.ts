const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deskzen-ecommerce.vercel.app';
const SITE_NAME = 'DeskZen';

export const siteMetadata = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  title: 'DeskZen — Smart Workspace Products for Students & Professionals',
  description:
    'Shop premium ergonomic chairs, study tables, laptop stands, desk organizers, LED lamps and small-space workspace products. Thoughtfully designed for students and professionals. Pan-India delivery.',
  keywords: [
    'laptop stand', 'ergonomic chair', 'study table online', 'desk organizer',
    'led desk lamp', 'home office desk accessories', 'study table for students',
    'laptop stand for students', 'ergonomic chair for work from home', 'monitor stand',
    'desk organizer online', 'desk mat', 'compact study table', 'foldable study table',
    'study lamp for students', 'wrist rest for keyboard', 'cable management kit',
    'drawer organizer for desk', 'phone stand for desk', 'wall-mounted desk organizer',
  ],
};

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: siteMetadata.description,
    sameAs: [
      'https://instagram.com/deskzen',
      'https://twitter.com/deskzen',
      'https://linkedin.com/company/deskzen',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@deskzen.in',
      areaServed: 'IN',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.url}`,
    })),
  };
}