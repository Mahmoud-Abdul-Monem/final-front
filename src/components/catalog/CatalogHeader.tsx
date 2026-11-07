import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import type { CatalogBreadcrumbItem } from "./types";

interface CatalogHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: CatalogBreadcrumbItem[];
}

export default function CatalogHeader({ title, description, breadcrumb }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body dark:text-gray-400">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              return (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <FiChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />}
                  {item.href && !isLast ? (
                    <Link href={item.href} className="hover:text-primary-store transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "font-medium text-ink dark:text-white" : ""}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <h1 className="font-bold text-ink dark:text-white text-2xl md:text-[32px] xl:text-5xl leading-tight tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="text-body dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
