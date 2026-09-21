"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Container } from "@/types/selector";

import canisterImage from "../../../images/Canister.jpg";
import drumImage from "../../../images/Drum.jpg";
import ibcImage from "../../../images/IBC.jpg";
import jerrycanImage from "../../../images/Jerrycan.jpg";
import tankImage from "../../../images/Tank.jpg";

const containerOrder = ["Jerrycan", "Canister", "Drum", "IBC", "Tank"];

const containerPresentation: Record<string, { image: StaticImageData; height: string }> = {
  Jerrycan: { image: jerrycanImage, height: "h-14" },
  Canister: { image: canisterImage, height: "h-[72px]" },
  Drum: { image: drumImage, height: "h-[88px]" },
  IBC: { image: ibcImage, height: "h-[104px]" },
  Tank: { image: tankImage, height: "h-[120px]" },
};

type ContainerCardsProps = {
  value: Container | null;
  onChange: (container: Container) => void;
};

export default function ContainerCards({ value, onChange }: ContainerCardsProps) {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      const { data, error: requestError } = await supabase.from("containers").select("id, name, volume, max_depth");

      if (!active) return;

      if (requestError) {
        setError("Containers could not be loaded. Please try again.");
      } else {
        const sortedContainers = ((data ?? []) as Container[]).sort(
          (first, second) => containerOrder.indexOf(first.name) - containerOrder.indexOf(second.name),
        );
        setContainers(sortedContainers);
      }
      setLoading(false);
    };

    void loadContainers();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="rounded-[3px] border border-black/10 bg-white px-4 py-6 text-sm text-[#697573]">Loading containers…</p>;
  }

  if (error) {
    return <p className="rounded-[3px] border border-[#cc2027]/20 bg-white px-4 py-6 text-sm text-[#b21820]">{error}</p>;
  }

  if (containers.length === 0) {
    return <p className="rounded-[3px] border border-black/10 bg-white px-4 py-6 text-sm text-[#697573]">No containers are available.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {containers.map((container) => {
        const presentation = containerPresentation[container.name];
        const selected = value?.id === container.id;

        return (
          <button
            key={container.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(container)}
            className={`group flex min-h-[230px] flex-col rounded-[3px] border bg-white p-3 text-left transition ${
              selected
                ? "border-[#cc2027] ring-2 ring-[#cc2027]/15"
                : "border-black/10 hover:border-[#cc2027]/55 hover:shadow-[0_8px_20px_rgba(20,35,33,0.07)]"
            }`}
          >
            <span className="flex h-32 w-full items-end justify-center border-b border-black/7 pb-3">
              {presentation ? (
                <Image
                  src={presentation.image}
                  alt={container.name}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                  className={`${presentation.height} w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]`}
                />
              ) : null}
            </span>
            <span className="mt-3 block text-sm font-semibold text-[#25312f]">{container.name}</span>
            <span className="mt-1 block text-[11px] leading-4 text-[#697573]">{container.volume}</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-[#697573]">Max depth: {container.max_depth}</span>
          </button>
        );
      })}
    </div>
  );
}
