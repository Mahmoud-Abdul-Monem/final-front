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
  initialCategories = [],
  title,
  description,
  breadcrumb,
}: CatalogExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<CatalogFiltersState>({
    ...DEFAULT_FILTERS,
    categories: initialCategories,
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<CatalogView>("grid");
  const page = pagination.page || 1;
  const [searchPending, setSearchPending] = useState(false);
  const [remoteProducts, setRemoteProducts] = useState(products);
  const [remotePagination, setRemotePagination] = useState(pagination);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);

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
    setFilters((current) => ({ ...current, categories: initialCategories }));
  }, [initialCategories]);

  useEffect(() => {
    setRemoteProducts(products);
    setRemotePagination(pagination);
  }, [products, pagination]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const requestedPage = Number(currentUrl.searchParams.get("page") || 1);
    const requestedCategories = (currentUrl.searchParams.get("category") || "").split(",").filter(Boolean);
    const query = filters.query.trim();
    const initialPage = pagination.page || 1;
    const normalizedRequested = [...requestedCategories].sort().join(",");
    const normalizedInitial = [...initialCategories].sort().join(",");
    if (!query && requestedPage === initialPage && normalizedRequested === normalizedInitial) {
      setRemoteProducts(products);
      setRemotePagination(pagination);
      setSearchPending(false);
      return;
    }

    const apiUrl = new URL("/api/catalog", window.location.origin);
    apiUrl.searchParams.set("page", String(requestedPage));
    if (query) apiUrl.searchParams.set("q", query);
    const requestedCategoryIds = categories
      .filter((category) => requestedCategories.includes(category.documentId))
      .map((category) => category.id);
    if (requestedCategoryIds.length) apiUrl.searchParams.set("category", requestedCategoryIds.join(","));
    let cancelled = false;
    setSearchPending(Boolean(query));
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
      })
      .finally(() => {
        if (!cancelled) setSearchPending(false);
      });
    return () => { cancelled = true; };
  }, [searchParams, initialCategories, categories, pagination, products, filters.query]);

  useEffect(() => {
    return () => {
      if (priceDebounceRef.current) {
        clearTimeout(priceDebounceRef.current);
      }
    };
  }, []);

  const resetPage = () => updateUrl({ page: null });

  const filtered = useMemo(() => {
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    return remoteProducts.filter((p) => {
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
  }, [remoteProducts, filters]);

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

  const totalPages = Math.max(1, remotePagination.pageCount);
  const safePage = Math.min(remotePagination.page || page, totalPages);
  const paged = sorted;
  const resultTotal = filters.minPrice || filters.maxPrice || filters.brands.length > 0
    ? sorted.length
    : remotePagination.total;
  const localPageFiltersActive = Boolean(filters.minPrice) || Boolean(filters.maxPrice) || filters.brands.length > 0;

  const hasActiveFilters =
    filters.query !== "" ||
    filters.categories.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.brands.length > 0;

  const toggleCategory = (id: string) => {
    const nextCategories = filters.categories.includes(id)
      ? filters.categories.filter((category) => category !== id)
      : [...filters.categories, id];
    setFilters((f) => ({
      ...f,
      categories: nextCategories,
    }));
    updateUrl({ category: nextCategories.length ? nextCategories.join(",") : null, page: null });
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
