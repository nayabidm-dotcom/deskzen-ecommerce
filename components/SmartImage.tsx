'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function SmartImage({
  src, alt, className, sizes,
}: { src: string; alt: string; className?: string; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={cn('flex items-center justify-center bg-gradient-to-br from-sand via-beige to-wood/30 p-4 text-center', className)}
        role="img" aria-label={alt}
      >
        <span className="font-display text-sm text-ink/70">{alt}</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src} alt={alt} loading="lazy" decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
}