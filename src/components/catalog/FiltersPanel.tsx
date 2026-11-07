"use client";

import { useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import type { Category } from "@/services/categories";
import type { CatalogFiltersState } from "./types";

// TODO: replace with real brands once the Product model exposes a brand field
const PLACEHOLDER_BRANDS = ["Luminous", "Aura", "Lumina", "Optic Pro"];

const PRICE_MIN = 0;
const PRICE_MAX = 5000;

interface FiltersPanelProps {
  categories: Category[];
  filters: CatalogFiltersState;
  onToggleCategory: (documentId: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onToggleBrand: (brand: string) => void;
  onReset: () => void;
  /** Rendered inside the mobile drawer — adds an Apply button at the bottom */
  showApplyButton?: boolean;
  onApply?: () => void;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-form-gray/40 dark:border-gray-700/60 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-1 mb-3"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink dark:text-white">
          {title}
        </h3>
        <FiChevronDown
          className={`w-4 h-4 text-body dark:text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-0.5">
      <span
        className={`shrink-0 w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
          checked
            ? "bg-green-deep border-green-deep"
            : "bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 group-hover:border-primary-store"
        }`}
      >
        {checked && <FiCheck className="w-3 h-3 text-white" aria-hidden />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-body dark:text-gray-300 leading-6 truncate">
        {label}
        {typeof count === "number" && <span className="text-body/60 dark:text-gray-500"> ({count})</span>}
      </span>
    </label>
  );
}

export default function FiltersPanel({
  categories,
  filters,
  onToggleCategory,
  onPriceChange,
  onToggleBrand,
  onReset,
  showApplyButton = false,
  onApply,
}: FiltersPanelProps) {
  const [minDraft, setMinDraft] = useState(filters.minPrice);
  const [maxDraft, setMaxDraft] = useState(filters.maxPrice);

  const applyPrice = () => {
    // TODO: replace local filtering with API price-range filter (Strapi $gte/$lte)
    onPriceChange(minDraft, maxDraft);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink dark:text-white">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary-store hover:text-green-700 transition-colors"
        >
          Reset all
        </button>
      </div>

      <Section title="Categories">
        <div className="flex flex-col gap-2.5">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Checkbox
                key={cat.documentId}
                checked={filters.categories.includes(cat.documentId)}
                onChange={() => onToggleCategory(cat.documentId)}
                label={cat.name}
                count={cat.itemCount}
              />
            ))
          ) : (
            <p className="text-sm text-body/70 dark:text-gray-500">No categories available.</p>
          )}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-gray-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={minDraft}
              onChange={(e) => setMinDraft(e.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
              className="w-full h-10 pl-7 pr-3 rounded-lg border border-form-gray dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-ink dark:text-white placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary-store/40 focus:border-primary-store"
            />
          </div>
          <span className="text-body dark:text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-body/60 dark:text-gray-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={maxDraft}
              onChange={(e) => setMaxDraft(e.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
              className="w-full h-10 pl-7 pr-3 rounded-lg border border-form-gray dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-ink dark:text-white placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary-store/40 focus:border-primary-store"
            />
          </div>
        </div>

        {/* TODO: replace with a dual-thumb range slider synced to min/max */}
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={maxDraft === "" ? PRICE_MAX : Math.min(Number(maxDraft) || PRICE_MAX, PRICE_MAX)}
          onChange={(e) => {
            setMaxDraft(e.target.value);
            onPriceChange(minDraft, e.target.value);
          }}
          aria-label="Maximum price slider"
          className="w-full mt-4 accent-primary-store"
        />
        <div className="flex justify-between text-xs text-body dark:text-gray-400 mt-1">
          <span>${PRICE_MIN}</span>
          <span>${PRICE_MAX}+</span>
        </div>

        <button
          type="button"
          onClick={applyPrice}
          className="mt-4 w-full h-10 rounded-lg bg-panel-blue dark:bg-gray-700 border border-form-gray/60 dark:border-gray-600 text-sm font-semibold text-ink dark:text-white hover:bg-chip-blue transition-colors"
        >
          Apply
        </button>
      </Section>

      <Section title="Brand">
        <div className="flex flex-col gap-2.5">
          {PLACEHOLDER_BRANDS.map((brand) => (
            <Checkbox
              key={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
              label={brand}
            />
          ))}
        </div>
      </Section>

      {showApplyButton && onApply && (
        <button
          type="button"
          onClick={onApply}
          className="mt-2 w-full h-11 rounded-lg bg-primary-store hover:bg-green-700 text-white font-semibold transition-colors"
        >
          Show results
        </button>
      )}
    </div>
  );
}
