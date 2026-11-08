"use client";

import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onSearch, placeholder = "Search products..." }: SearchBarProps) {
  const [input, setInput] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  // Debounce: 300ms delay before triggering search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (input.trim()) {
        onSearch(input.trim());
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input, onSearch]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
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
          className="input input-bordered ui-field w-full h-12 pl-12 pr-28 rounded-xl border-form-gray dark:border-gray-700 text-ink dark:text-white placeholder:text-body/60 dark:placeholder:text-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-store/40 focus:border-primary-store transition-shadow"
        />
        <button
          type="submit"
          className="btn btn-primary absolute right-1.5 h-9 min-h-0 px-4 rounded-lg hover:bg-green-700 text-white text-sm font-semibold transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
