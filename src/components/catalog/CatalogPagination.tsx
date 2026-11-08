"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

const btnBase =
  "btn inline-flex min-h-0 items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-store/50";
const btnSize = "w-9 h-9 sm:w-10 sm:h-10 text-sm sm:text-base";

export default function CatalogPagination({ currentPage, totalPages, onPageChange }: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="pt-8">
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className={`${btnBase} ${btnSize} border border-form-gray dark:border-gray-600 text-ink dark:text-white hover:bg-panel-blue dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
        </button>

        {items.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-body dark:text-gray-400"
              aria-hidden
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={`${btnBase} ${btnSize} ${
                item === currentPage
                  ? "bg-footer-primary text-white"
                  : "border border-form-gray dark:border-gray-600 text-ink dark:text-white hover:bg-panel-blue dark:hover:bg-gray-800"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className={`${btnBase} ${btnSize} border border-form-gray dark:border-gray-600 text-ink dark:text-white hover:bg-panel-blue dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
        </button>
      </div>
    </nav>
  );
}
