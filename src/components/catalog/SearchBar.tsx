"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onSearch, placeholder = "Search products..." }: SearchBarProps) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API — call searchProducts(query) or update ?q= searchParam
    onSearch(input.trim());
  };

  return (
    <form onSubmit={submit} role="search" className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-4 w-5 h-5 text-body dark:text-gray-400 pointer-events-none" aria-hidden />
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Search products"
          className="w-full h-12 pl-12 pr-28 rounded-xl border border-form-gray dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-white placeholder:text-body/60 dark:placeholder:text-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-store/40 focus:border-primary-store transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-1.5 h-9 px-4 rounded-lg bg-primary-store hover:bg-green-700 text-white text-sm font-semibold transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
