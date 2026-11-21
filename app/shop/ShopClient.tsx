'use client';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, getEffectivePrice, getDiscountPercent, searchProducts, formatINR } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';

type SortKey = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function ShopClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [category, setCategory] = useState<string>(params.get('category') || '');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [minRating, setMinRating] = useState<number>(0);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>((params.get('sort') as SortKey) || 'popularity');
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setQ(params.get('q') || '');
    setCategory(params.get('category') || '');
    setSort((params.get('sort') as SortKey) || 'popularity');
  }, [params]);

  const filtered = useMemo(() => {
    let list = q ? searchProducts(q) : PRODUCTS.slice();
    if (category) list = list.filter((p) => p.category === category);
    list = list.filter((p) => {
      const price = getEffectivePrice(p);
      return price >= minPrice && price <= maxPrice;
    });
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (discountOnly) list = list.filter((p) => getDiscountPercent(p) > 0);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b)); break;
      case 'price-desc': list.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a)); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
      default: list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [q, category, minPrice, maxPrice, minRating, discountOnly, inStockOnly, sort]);

  const clearAll = () => {
    setQ(''); setCategory(''); setMinPrice(0); setMaxPrice(15000);
    setMinRating(0); setDiscountOnly(false); setInStockOnly(false); setSort('popularity');
  };

  const Filters = (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg mb-3">Search</h3>
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. laptop stand"
          className="w-full bg-cream border border-ink/15 rounded-lg px-3 py-2 text-sm outline-none focus:border-sage" />
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">Category</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="cat" checked={!category} onChange={() => setCategory('')} />
            <span>All categories</span>
          </label>
          {CATEGORIES.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="cat" checked={category === c.slug} onChange={() => setCategory(c.slug)} />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">Price</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-xs text-muted">
            <span>{formatINR(minPrice)}</span>
            <span>{formatINR(maxPrice)}</span>
          </div>
          <input type="range" min={0} max={15000} step={500} value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))} className="w-full" />
          <input type="range" min={0} max={15000} step={500} value={maxPrice}
            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))} className="w-full" />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">Rating</h3>
        <div className="space-y-2 text-sm">
          {[0, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
              <span>{r === 0 ? 'Any rating' : `${r}+ stars`}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={discountOnly} onChange={(e) => setDiscountOnly(e.target.checked)} />
          <span>On discount only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          <span>In stock only</span>
        </label>
      </div>

      <button onClick={clearAll} className="text-sm underline underline-offset-4 text-ink/70 hover:text-ink">Clear all filters</button>
    </div>
  );

  return (
    <div className="mt-12 grid lg:grid-cols-[260px_1fr] gap-10">
      <aside className="hidden lg:block sticky top-28 self-start">{Filters}</aside>

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted">{filtered.length} product{filtered.length === 1 ? '' : 's'}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileFilters(true)} className="lg:hidden inline-flex items-center gap-2 text-sm border border-ink/15 rounded-full px-4 py-2">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-cream border border-ink/15 rounded-full px-4 py-2 text-sm outline-none focus:border-sage">
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="newest">New arrivals</option>
            </select>
          </div>
        </div>

        <ProductGrid products={filtered} />
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-cream p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl">Filters</span>
              <button onClick={() => setMobileFilters(false)} aria-label="Close"><X size={20} /></button>
            </div>
            {Filters}
          </div>
        </div>
      )}
    </div>
  );
}