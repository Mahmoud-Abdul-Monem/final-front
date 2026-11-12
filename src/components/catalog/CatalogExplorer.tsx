"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CatalogHeader from "./CatalogHeader";
import SearchBar from "./SearchBar";
import FiltersPanel from "./FiltersPanel";
import ActiveFilters from "./ActiveFilters";
import CatalogToolbar from "./CatalogToolbar";
import CatalogProductCard from "./CatalogProductCard";
import CatalogPagination from "./CatalogPagination";
import CatalogMobileFilters, { FilterFab } from "./CatalogMobileFilters";
import {
  DEFAULT_FILTERS,
  PRODUCTS_PER_PAGE,
  type CatalogExplorerProps,
  type CatalogFiltersState,
  type CatalogView,
  type SortOption,
} from "./types";

export default function CatalogExplorer({
  products,
  pagination,
  categories,
  initialCategory,
  title,
  description,
  breadcrumb,
}: CatalogExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = initialCategory || "";
  const [filters, setFilters] = useState<CatalogFiltersState>({
    ...DEFAULT_FILTERS,
    categories: activeCategory ? [activeCategory] : [],
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<CatalogView>("grid");
  const page = pagination.page || 1;
  const [searchProducts, setSearchProducts] = useState(products);
  const [searchPending, setSearchPending] = useState(false);
  const [remoteProducts, setRemoteProducts] = useState(products);
  const [remotePagination, setRemotePagination] = useState(pagination);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const categoryId = categories.find((category) => category.documentId === activeCategory)?.id;

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!activeCategory) {
      setFilters((current) => ({ ...current, categories: [] }));
      return;
    }
    setFilters((current) => ({ ...current, categories: [activeCategory] }));
  }, [activeCategory]);

  useEffect(() => {
    setSearchProducts(products);
  }, [products]);

  useEffect(() => {
    setRemoteProducts(products);
    setRemotePagination(pagination);
  }, [products, pagination]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const requestedPage = Number(currentUrl.searchParams.get("page") || 1);
    const requestedCategory = currentUrl.searchParams.get("category");
    const initialPage = pagination.page || 1;
    if (requestedPage === initialPage && requestedCategory === activeCategory) return;

    const apiUrl = new URL("/api/catalog", window.location.origin);
    apiUrl.searchParams.set("page", String(requestedPage));
    const requestedCategoryId = categories.find((category) => category.documentId === requestedCategory)?.id;
    if (requestedCategoryId) apiUrl.searchParams.set("category", String(requestedCategoryId));
    let cancelled = false;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        if (cancelled) return;
        setRemoteProducts(result.products ?? []);
        setRemotePagination(result.pagination ?? { page: requestedPage, pageSize: PRODUCTS_PER_PAGE, pageCount: 0, total: 0 });
      })
      .catch(() => {
        if (!cancelled) {
          setRemoteProducts([]);
          setRemotePagination({ page: requestedPage, pageSize: PRODUCTS_PER_PAGE, pageCount: 0, total: 0 });
        }
      });
    return () => { cancelled = true; };
  }, [searchParams, activeCategory, categoryId, categories, pagination.page]);

  useEffect(() => {
    const query = filters.query.trim();
    if (!query) {
      setSearchProducts(products);
      setSearchPending(false);
      return;
    }

    let cancelled = false;
    setSearchPending(true);
    const timeout = setTimeout(async () => {
      try {
        const collected = [];
        const firstPageUrl = new URL("/api/catalog", window.location.origin);
        firstPageUrl.searchParams.set("page", "1");
        if (categoryId) firstPageUrl.searchParams.set("category", String(categoryId));
        const firstResponse = await fetch(firstPageUrl);
        const firstResult = await firstResponse.json();
        collected.push(...(firstResult.products ?? []));
        for (let currentPage = 2; currentPage <= (firstResult.pagination?.pageCount ?? 0); currentPage++) {
          const pageUrl = new URL("/api/catalog", window.location.origin);
          pageUrl.searchParams.set("page", String(currentPage));
          if (categoryId) pageUrl.searchParams.set("category", String(categoryId));
          const response = await fetch(pageUrl);
          const result = await response.json();
          collected.push(...(result.products ?? []));
        }
        if (!cancelled) setSearchProducts(collected);
      } catch {
        if (!cancelled) setSearchProducts(products);
      } finally {
        if (!cancelled) setSearchPending(false);
      }
    }, 700);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [filters.query, products, categoryId]);

  useEffect(() => {
    return () => {
      if (priceDebounceRef.current) {
        clearTimeout(priceDebounceRef.current);
      }
    };
  }, []);

  const resetPage = () => updateUrl({ page: null });

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    return searchProducts.filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.description ?? ""} ${p.category?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (min !== null && !isNaN(min) && p.price < min) return false;
      if (max !== null && !isNaN(max) && p.price > max) return false;
      if (filters.brands.length > 0) {
        // TODO: real brand field doesn't exist on Product yet â€” match loosely for now
        const brandHit = filters.brands.some((b) =>
          `${p.name} ${p.category?.name ?? ""}`.toLowerCase().includes(b.toLowerCase())
        );
        if (!brandHit) return false;
      }
      return true;
    });
  }, [searchProducts, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "name-asc":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "featured":
      default:
        return arr.sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false));
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, filters.query ? Math.ceil(sorted.length / PRODUCTS_PER_PAGE) : remotePagination.pageCount);
  const safePage = Math.min(remotePagination.page || page, totalPages);
  const paged = filters.query
    ? sorted.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE)
    : sorted;
  const resultTotal = filters.query || filters.minPrice || filters.maxPrice || filters.brands.length > 0
    ? sorted.length
    : remotePagination.total;
  const localPageFiltersActive = !filters.query && (Boolean(filters.minPrice) || Boolean(filters.maxPrice) || filters.brands.length > 0);

  const hasActiveFilters =
    filters.query !== "" ||
    filters.categories.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.brands.length > 0;

  const toggleCategory = (id: string) => {
    const nextCategory = activeCategory === id ? "" : id;
    setFilters((f) => ({
      ...f,
      categories: nextCategory ? [nextCategory] : [],
    }));
    updateUrl({ category: nextCategory || null, page: null });
  };

  const toggleBrand = (brand: string) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
    }));
    resetPage();
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    updateUrl({ category: null, page: null });
    if (priceDebounceRef.current) {
      clearTimeout(priceDebounceRef.current);
    }
  };

  const filterPanelProps = {
    categories,
    filters,
    onToggleCategory: toggleCategory,
    onPriceChange: (min: string, max: string) => {
      // Debounce price filter updates to avoid excessive re-renders
      if (priceDebounceRef.current) {
        clearTimeout(priceDebounceRef.current);
      }
      priceDebounceRef.current = setTimeout(() => {
        setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }));
        resetPage();
      }, 300);
    },
    onToggleBrand: toggleBrand,
    onReset: resetFilters,
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-24 pb-16 flex flex-col gap-6 lg:gap-8">
        <CatalogHeader title={title} description={description} breadcrumb={breadcrumb} />

        <SearchBar value={filters.query} onSearch={(q) => { setFilters((f) => ({ ...f, query: q })); resetPage(); }} />

        <div className="flex gap-6 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[260px] shrink-0 sticky top-24">
            <div className="card bg-base-100 rounded-xl border border-form-gray/40 dark:border-gray-700/60 shadow-sm p-5">
              <FiltersPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {hasActiveFilters && (
              <ActiveFilters
                filters={filters}
                categories={categories}
                onRemoveCategory={(id) => toggleCategory(id)}
                onClearPrice={() => setFilters((f) => ({ ...f, minPrice: "", maxPrice: "" }))}
                onRemoveBrand={toggleBrand}
                onClearAll={resetFilters}
              />
            )}

            <CatalogToolbar
              total={resultTotal}
              localFiltersActive={localPageFiltersActive}
              page={safePage}
              perPage={PRODUCTS_PER_PAGE}
              sort={sort}
              onSortChange={(s) => { setSort(s); resetPage(); }}
              view={view}
              onViewChange={setView}
            />

            {searchPending ? (
              <p className="py-16 text-center text-sm text-body dark:text-gray-400" role="status">Searching products...</p>
            ) : paged.length > 0 ? (
              <>
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {paged.map((product, idx) => (
                    <CatalogProductCard
                      key={product.documentId || product.id}
                      product={product}
                      view={view}
                      priority={idx < 4}
                    />
                  ))}
                </div>
                <CatalogPagination currentPage={safePage} totalPages={totalPages} onPageChange={(nextPage) => updateUrl({ page: String(nextPage) })} />
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg font-medium text-ink dark:text-white">No products found</p>
                <p className="mt-1 text-sm text-body dark:text-gray-400">
                  Try adjusting your search or filters.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-primary-store hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterFab onOpen={() => setDrawerOpen(true)} />
      <CatalogMobileFilters
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        {...filterPanelProps}
      />
    </section>
  );
}
