"use client";

import { useMemo, useState } from "react";
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
  categories,
  title,
  description,
  breadcrumb,
}: CatalogExplorerProps) {
  const [filters, setFilters] = useState<CatalogFiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<CatalogView>("grid");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const resetPage = () => setPage(1);

  // TODO: move filtering to the API layer (Strapi filters / searchParams) for
  // server-side pagination. Client-side filtering is a placeholder for now.
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    return products.filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.description ?? ""} ${p.category?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.categories.length > 0) {
        const catKey = p.category?.documentId ?? p.category?.name;
        const match = filters.categories.some(
          (sel) => sel === catKey || sel === p.category?.name || categories.find((c) => c.documentId === sel)?.name === p.category?.name
        );
        if (!match) return false;
      }
      if (min !== null && !isNaN(min) && p.price < min) return false;
      if (max !== null && !isNaN(max) && p.price > max) return false;
      if (filters.brands.length > 0) {
        // TODO: real brand field doesn't exist on Product yet — match loosely for now
        const brandHit = filters.brands.some((b) =>
          `${p.name} ${p.category?.name ?? ""}`.toLowerCase().includes(b.toLowerCase())
        );
        if (!brandHit) return false;
      }
      return true;
    });
  }, [products, filters, categories]);

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

  const totalPages = Math.max(1, Math.ceil(sorted.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

  const hasActiveFilters =
    filters.query !== "" ||
    filters.categories.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.brands.length > 0;

  const toggleCategory = (id: string) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(id) ? f.categories.filter((c) => c !== id) : [...f.categories, id],
    }));
    resetPage();
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
    resetPage();
  };

  const filterPanelProps = {
    categories,
    filters,
    onToggleCategory: toggleCategory,
    onPriceChange: (min: string, max: string) => {
      setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }));
      resetPage();
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
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-form-gray/40 dark:border-gray-700/60 shadow-sm p-5">
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
              total={sorted.length}
              page={safePage}
              perPage={PRODUCTS_PER_PAGE}
              sort={sort}
              onSortChange={(s) => { setSort(s); resetPage(); }}
              view={view}
              onViewChange={setView}
            />

            {paged.length > 0 ? (
              <>
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {paged.map((product) => (
                    <CatalogProductCard
                      key={product.documentId || product.id}
                      product={product}
                      view={view}
                    />
                  ))}
                </div>
                <CatalogPagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
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
