"use client";

import { FiGrid, FiList } from "react-icons/fi";
import { SORT_OPTIONS, type CatalogView, type SortOption } from "./types";

interface CatalogToolbarProps {
  total: number;
  localFiltersActive?: boolean;
  page: number;
  perPage: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  view: CatalogView;
  onViewChange: (view: CatalogView) => void;
}

export default function CatalogToolbar({
  total,
  localFiltersActive = false,
  page,
  perPage,
  sort,
  onSortChange,
  view,
  onViewChange,
}: CatalogToolbarProps) {
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-form-gray/50 dark:border-gray-700/60">
      <p className="text-sm text-body dark:text-gray-400">
        {localFiltersActive
          ? `Showing ${total} matching products on this page`
          : `Showing ${start}-${end} of ${total} products`}
      </p>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort products"
            className="select select-bordered ui-field appearance-none h-9 min-h-0 pl-3 pr-9 rounded-lg border-form-gray dark:border-gray-600 bg-panel-blue dark:bg-gray-800 text-sm font-medium text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-store/40 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-body dark:text-gray-400 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="hidden sm:flex items-center gap-1 rounded-lg border border-form-gray dark:border-gray-600 p-1">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            className={`p-1.5 rounded-md transition-colors ${
              view === "grid"
                ? "bg-primary-store text-white"
                : "text-body dark:text-gray-400 hover:text-ink dark:hover:text-white"
            }`}
          >
            <FiGrid className="w-4 h-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
            className={`p-1.5 rounded-md transition-colors ${
              view === "list"
                ? "bg-primary-store text-white"
                : "text-body dark:text-gray-400 hover:text-ink dark:hover:text-white"
            }`}
          >
            <FiList className="w-4 h-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
