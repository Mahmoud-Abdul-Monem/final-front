"use client";

import { FiX } from "react-icons/fi";
import type { CatalogFiltersState } from "./types";
import type { Category } from "@/services/categories";

interface ActiveFiltersProps {
  filters: CatalogFiltersState;
  categories: Category[];
  onRemoveCategory: (documentId: string) => void;
  onClearPrice: () => void;
  onRemoveBrand: (brand: string) => void;
  onClearAll: () => void;
}

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

export default function ActiveFilters({
  filters,
  categories,
  onRemoveCategory,
  onClearPrice,
  onRemoveBrand,
  onClearAll,
}: ActiveFiltersProps) {
  const chips: Chip[] = [];

  filters.categories.forEach((id) => {
    const cat = categories.find((c) => c.documentId === id);
    chips.push({
      key: `cat-${id}`,
      label: `Category: ${cat?.name ?? id}`,
      onRemove: () => onRemoveCategory(id),
    });
  });

  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? `$${filters.minPrice}` : "$0";
    const max = filters.maxPrice ? `$${filters.maxPrice}` : "Any";
    chips.push({ key: "price", label: `Price: ${min} - ${max}`, onRemove: onClearPrice });
  }

  filters.brands.forEach((brand) => {
    chips.push({
      key: `brand-${brand}`,
      label: `Brand: ${brand}`,
      onRemove: () => onRemoveBrand(brand),
    });
  });

  if (filters.query) {
    chips.push({
      key: "query",
      label: `Search: "${filters.query}"`,
      onRemove: () => onClearAll(),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 h-7 pl-3 pr-2 rounded-full bg-chip-blue dark:bg-gray-700/60 border border-primary-store/20 dark:border-gray-600 text-xs font-medium text-ink dark:text-gray-200"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove filter ${chip.label}`}
            className="p-0.5 rounded-full hover:bg-primary-store/10 dark:hover:bg-gray-600 transition-colors"
          >
            <FiX className="w-3 h-3" aria-hidden />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-medium text-primary-store hover:text-green-700 transition-colors px-1"
      >
        Clear All
      </button>
    </div>
  );
}
