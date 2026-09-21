"use client";

import { useEffect, useRef, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Chemical } from "@/types/selector";

type ChemicalSelectorProps = {
  value: Chemical | null;
  onChange: (chemical: Chemical | null) => void;
};

export default function ChemicalSelector({ value, onChange }: ChemicalSelectorProps) {
  const [query, setQuery] = useState(value?.chemical ?? "");
  const [results, setResults] = useState<Chemical[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const searchTerm = query.trim();
    if (value?.chemical === query || searchTerm.length < 2) {
      return;
    }

    const timer = window.setTimeout(async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setError("Supabase environment variables are not configured.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: requestError } = await supabase
        .from("chemical_compatibility")
        .select("id, chemical, flammable, tube, shaft, seal")
        .ilike("chemical", `%${searchTerm}%`)
        .order("chemical", { ascending: true })
        .limit(30);

      if (requestError) {
        setResults([]);
        setError("Chemicals could not be loaded. Please try again.");
      } else {
        setResults((data ?? []) as Chemical[]);
      }
      setLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query, value]);

  const selectChemical = (chemical: Chemical) => {
    onChange(chemical);
    setQuery(chemical.chemical);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <label htmlFor="chemical-search" className="sr-only">
        Search chemical
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[#8b9694]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <input
          id="chemical-search"
          role="combobox"
          aria-expanded={open}
          aria-controls="chemical-results"
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange(null);
            setOpen(true);
          }}
          placeholder="Search chemical..."
          className="h-16 w-full rounded-[3px] border border-black/15 bg-white pl-14 pr-12 text-[17px] text-[#172221] outline-none transition focus:border-[#cc2027] focus:ring-4 focus:ring-[#cc2027]/10"
        />
        {value ? (
          <button
            type="button"
            aria-label="Clear selected chemical"
            onClick={() => {
              onChange(null);
              setQuery("");
              setOpen(true);
            }}
            className="absolute inset-y-0 right-3 my-auto h-9 w-9 rounded-full text-[#7c8785] transition hover:bg-black/5 hover:text-[#172221]"
          >
            ×
          </button>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#7c8785]" aria-hidden="true">
            ⌄
          </span>
        )}
      </div>

      {open && query.trim().length >= 2 && !value ? (
        <div
          id="chemical-results"
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-[3px] border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(18,31,29,0.18)]"
        >
          {loading ? <p className="px-4 py-4 text-sm text-[#697573]">Searching chemicals…</p> : null}
          {!loading && error ? <p className="px-4 py-4 text-sm text-[#b21820]">{error}</p> : null}
          {!loading && !error && results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#697573]">No matching chemicals found.</p>
          ) : null}
          {!loading && !error
            ? results.map((chemical) => (
                <button
                  key={chemical.id}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => selectChemical(chemical)}
                  className="block w-full rounded-[2px] px-4 py-3 text-left text-[15px] text-[#263230] transition hover:bg-[#f2f4f2] focus:bg-[#f2f4f2] focus:outline-none"
                >
                  {chemical.chemical}
                </button>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
