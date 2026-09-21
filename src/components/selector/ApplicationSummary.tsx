"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { SelectorState } from "@/types/selector";

const STORAGE_KEY = "jessberger-pump-selection";

export default function ApplicationSummary() {
  const [selection, setSelection] = useState<SelectorState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedSelection = window.sessionStorage.getItem(STORAGE_KEY);

      if (storedSelection) {
        try {
          setSelection(JSON.parse(storedSelection) as SelectorState);
        } catch {
          window.sessionStorage.removeItem(STORAGE_KEY);
        }
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return <p className="text-sm text-[#6a7674]">Loading selection…</p>;
  }

  if (!selection) {
    return (
      <div>
        <p className="text-[#596563]">No pump selection was found. Return to the selector to begin.</p>
        <Link href="/#drum-pump-selector" className="mt-7 inline-flex font-semibold text-[#cc2027] hover:underline">
          Back to selector →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-[4px] border border-black/10 bg-black/10 sm:grid-cols-2">
        <div className="bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a9492]">Chemical</p>
          <p className="mt-2 text-xl font-semibold text-[#1c2826]">{selection.chemical.chemical}</p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a9492]">Container</p>
          <p className="mt-2 text-xl font-semibold text-[#1c2826]">{selection.container.name}</p>
          <p className="mt-1 text-sm text-[#697573]">
            {selection.container.volume} · Max depth: {selection.container.max_depth}
          </p>
        </div>
      </div>
      <p className="mt-7 text-[#596563]">Step 2 — application requirements — will be implemented next.</p>
      <Link href="/#drum-pump-selector" className="mt-7 inline-flex font-semibold text-[#cc2027] hover:underline">
        ← Change selection
      </Link>
    </div>
  );
}
