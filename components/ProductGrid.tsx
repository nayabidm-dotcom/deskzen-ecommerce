import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl text-ink/60">No products found</p>
        <p className="text-muted mt-2 text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}