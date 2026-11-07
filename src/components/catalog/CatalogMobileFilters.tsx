"use client";

import { useEffect } from "react";
import { FiSliders, FiX } from "react-icons/fi";
import FiltersPanel from "./FiltersPanel";
import type { Category } from "@/services/categories";
import type { CatalogFiltersState } from "./types";

interface CatalogMobileFiltersProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  filters: CatalogFiltersState;
  onToggleCategory: (documentId: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onToggleBrand: (brand: string) => void;
  onReset: () => void;
}

export function FilterFab({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open filters"
      className="lg:hidden fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 h-12 pl-5 pr-6 rounded-full bg-primary-store text-white text-sm font-semibold shadow-lg hover:bg-green-700 transition-colors"
    >
      <FiSliders className="w-4 h-4" aria-hidden />
      Filters
    </button>
  );
}

export default function CatalogMobileFilters({
  open,
  onClose,
  categories,
  filters,
  onToggleCategory,
  onPriceChange,
  onToggleBrand,
  onReset,
}: CatalogMobileFiltersProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div className="absolute inset-y-0 right-0 w-[85vw] max-w-sm bg-white dark:bg-dark-theme shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-form-gray/50 dark:border-gray-700">
          <h2 className="text-lg font-bold text-ink dark:text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="w-5 h-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FiltersPanel
            categories={categories}
            filters={filters}
            onToggleCategory={onToggleCategory}
            onPriceChange={onPriceChange}
            onToggleBrand={onToggleBrand}
            onReset={onReset}
            showApplyButton
            onApply={onClose}
          />
        </div>
      </div>
    </div>
  );
}
