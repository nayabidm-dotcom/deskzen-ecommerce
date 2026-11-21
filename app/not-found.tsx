import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-32 container-x pb-16 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <p className="uppercase tracking-[0.25em] text-xs text-muted mb-4">404</p>
      <h1 className="font-display text-4xl sm:text-5xl">Page not found.</h1>
      <p className="text-muted mt-3 max-w-md">The page you are looking for has moved or never existed.</p>
      <Link href="/" className="mt-8 inline-block bg-ink text-cream px-7 py-3 rounded-full text-sm">Back to Home</Link>
    </div>
  );
}