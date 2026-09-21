"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Container } from "@/types/selector";

import canisterImage from "../../../images/Canister.jpg";
import drumImage from "../../../images/Drum.jpg";
import ibcImage from "../../../images/IBC.jpg";
import jerrycanImage from "../../../images/Jerrycan.jpg";
import tankImage from "../../../images/Tank.jpg";

const containerImages: Record<string, StaticImageData> = {
  Jerrycan: jerrycanImage,
  Canister: canisterImage,
  Drum: drumImage,
  IBC: ibcImage,
  Tank: tankImage,
};

type ContainerSelectorProps = {
  value: Container | null;
  onChange: (container: Container) => void;
  disabled?: boolean;
};

export default function ContainerSelector({ value, onChange, disabled = false }: ContainerSelectorProps) {
  const [containers, setContainers] = useState<Container[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
    let active = true;

    const loadContainers = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        if (active) {
          setError("Supabase environment variables are not configured.");
          setLoading(false);
        }
        return;
      }

      const { data, error: requestError } = await supabase
        .from("containers")
        .select("id, name, volume, max_depth")
        .order("id", { ascending: true });

      if (!active) return;

      if (requestError) {
        setError("Containers could not be loaded. Please try again.");
      } else {
        setContainers((data ?? []) as Container[]);
      }
      setLoading(false);
    };

    void loadContainers();
    return () => {
      active = false;
    };
  }, []);

  const selectedImage = value ? containerImages[value.name] : null;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-20 w-full items-center gap-4 rounded-[3px] border border-black/15 bg-white px-4 py-3 text-left outline-none transition hover:border-black/30 focus:border-[#cc2027] focus:ring-4 focus:ring-[#cc2027]/10 disabled:cursor-not-allowed disabled:border-black/8 disabled:bg-[#eceeeb] disabled:opacity-60"
      >
        <span className="relative flex h-14 w-16 shrink-0 items-center justify-center rounded-[2px] bg-[#f4f5f3]">
          {selectedImage ? (
            <Image src={selectedImage} alt="" fill sizes="64px" className="object-contain p-1.5" />
          ) : (
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden="true" className="text-[#899391]">
              <path d="M5 5h16v21H5zM3 5h20M7 2h12v3M8 10h10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </span>
        <span className="min-w-0 flex-1">
          {value ? (
            <>
              <span className="block font-semibold text-[#172221]">{value.name}</span>
              <span className="mt-1 block text-sm text-[#697573]">
                {value.volume} · Max depth: {value.max_depth}
              </span>
            </>
          ) : (
            <span className="text-[17px] text-[#798482]">
              {loading ? "Loading containers…" : "Select container size..."}
            </span>
          )}
        </span>
        <span className={`text-[#6e7977] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-[3px] border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(18,31,29,0.18)]"
        >
          {loading ? <p className="px-4 py-4 text-sm text-[#697573]">Loading containers…</p> : null}
          {!loading && error ? <p className="px-4 py-4 text-sm text-[#b21820]">{error}</p> : null}
          {!loading && !error && containers.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#697573]">No containers are available.</p>
          ) : null}
          {!loading && !error
            ? containers.map((container) => (
                <button
                  key={container.id}
                  type="button"
                  role="option"
                  aria-selected={value?.id === container.id}
                  onClick={() => {
                    onChange(container);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-[2px] px-3 py-2.5 text-left transition hover:bg-[#f2f4f2] focus:bg-[#f2f4f2] focus:outline-none"
                >
                  <span className="relative h-16 w-20 shrink-0 rounded-[2px] bg-[#f5f6f4]">
                    {containerImages[container.name] ? (
                      <Image
                        src={containerImages[container.name]}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-[#24302e]">{container.name}</span>
                    <span className="mt-1 block text-sm text-[#6e7977]">
                      {container.volume} · Max depth: {container.max_depth}
                    </span>
                  </span>
                </button>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
