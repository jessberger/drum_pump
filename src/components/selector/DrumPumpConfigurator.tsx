"use client";

import { useState } from "react";

import type { Container } from "@/types/selector";
import ContainerSelector from "./ContainerSelector";

type TubeMaterial = "PP" | "PVDF" | "ALU" | "SS";
type ShaftMaterial = "Hastelloy" | "SS";
type SealMaterial = "PTFE" | "Carbon (ATEX)";

const tubeOptions: TubeMaterial[] = ["PP", "PVDF", "ALU", "SS"];
const shaftOptions: ShaftMaterial[] = ["Hastelloy", "SS"];
const sealOptions: SealMaterial[] = ["PTFE", "Carbon (ATEX)"];

const shaftMatrix: Record<TubeMaterial, ShaftMaterial[]> = {
  PP: ["Hastelloy", "SS"],
  PVDF: ["Hastelloy"],
  ALU: ["SS"],
  SS: ["SS"],
};

type BinaryToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

function BinaryToggle({ label, value, onChange }: BinaryToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[3px] border border-black/10 bg-white px-4 py-3">
      <span className="text-sm font-semibold text-[#25312f]">{label}</span>
      <div className="relative grid h-9 w-32 grid-cols-2 rounded-full bg-[#e8ebe8] p-1" role="group" aria-label={label}>
        <span
          className={`absolute bottom-1 left-1 top-1 w-[60px] rounded-full shadow-sm transition-transform duration-200 ${
            value ? "translate-x-[60px] bg-[#cc2027]" : "translate-x-0 bg-[#263a37]"
          }`}
          aria-hidden="true"
        />
        <button
          type="button"
          aria-pressed={!value}
          onClick={() => onChange(false)}
          className={`relative z-10 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${
            !value ? "text-white" : "text-[#6d7876]"
          }`}
        >
          No
        </button>
        <button
          type="button"
          aria-pressed={value}
          onClick={() => onChange(true)}
          className={`relative z-10 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${
            value ? "text-white" : "text-[#6d7876]"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

type OptionButtonProps<T extends string> = {
  label: T;
  selected: boolean;
  enabled: boolean;
  onSelect: (value: T) => void;
};

function OptionButton<T extends string>({ label, selected, enabled, onSelect }: OptionButtonProps<T>) {
  return (
    <button
      type="button"
      disabled={!enabled}
      aria-pressed={selected}
      onClick={() => onSelect(label)}
      className={`min-h-14 rounded-[3px] border px-4 py-3 text-sm font-semibold transition ${
        selected
          ? "border-[#cc2027] bg-[#cc2027] text-white shadow-[0_6px_18px_rgba(204,32,39,0.18)]"
          : enabled
            ? "border-black/12 bg-white text-[#263230] hover:border-[#cc2027]/60 hover:bg-[#fffafa]"
            : "cursor-not-allowed border-black/6 bg-[#e7e9e6] text-[#a1a8a6]"
      }`}
    >
      {label}
    </button>
  );
}

export default function DrumPumpConfigurator() {
  const [atex, setAtex] = useState(false);
  const [food, setFood] = useState(false);
  const [tube, setTube] = useState<TubeMaterial | null>(null);
  const [shaft, setShaft] = useState<ShaftMaterial | null>(null);
  const [seal, setSeal] = useState<SealMaterial | null>(null);
  const [container, setContainer] = useState<Container | null>(null);

  const allowedShafts = tube ? shaftMatrix[tube] : [];
  const allowedSeals: SealMaterial[] = tube
    ? atex && tube === "SS"
      ? ["Carbon (ATEX)"]
      : ["PTFE"]
    : [];

  const changeAtex = (nextValue: boolean) => {
    setAtex(nextValue);

    if (nextValue && tube !== "SS") {
      setTube(null);
      setShaft(null);
      setSeal(null);
      return;
    }

    setSeal(null);
  };

  const selectTube = (nextTube: TubeMaterial) => {
    setTube(nextTube);
    setShaft(null);
    setSeal(null);
  };

  const selectShaft = (nextShaft: ShaftMaterial) => {
    setShaft(nextShaft);
    setSeal(null);
  };

  return (
    <div className="grid gap-6">
      <section className="rounded-[4px] border border-black/10 bg-[#f0f2ef] p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#cc2027]">Application requirements</p>
          <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-[#1f2b29]">Safety and hygiene</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <BinaryToggle label="ATEX required?" value={atex} onChange={changeAtex} />
          <BinaryToggle label="Food application?" value={food} onChange={setFood} />
        </div>
        {atex ? (
          <p className="mt-3 text-xs leading-5 text-[#667270]">ATEX applications require an SS pump tube and Carbon (ATEX) seal.</p>
        ) : null}
      </section>

      <section className="rounded-[4px] border border-black/10 bg-white p-4 sm:p-6">
        <div className="grid gap-7 lg:grid-cols-3 lg:gap-5">
          <div>
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0876b9] text-xs font-bold text-white">1</span>
              <div>
                <h3 className="text-sm font-semibold text-[#1f2b29]">Pump tube</h3>
                <p className="mt-0.5 text-xs leading-5 text-[#74807e]">Inner tube, outer tube, pump foot and discharge</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {tubeOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={tube === option}
                  enabled={!atex || option === "SS"}
                  onSelect={selectTube}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0876b9] text-xs font-bold text-white">2</span>
              <div>
                <h3 className="text-sm font-semibold text-[#1f2b29]">Drive shaft</h3>
                <p className="mt-0.5 text-xs leading-5 text-[#74807e]">Select a compatible shaft material</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {shaftOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={shaft === option}
                  enabled={Boolean(tube && allowedShafts.includes(option))}
                  onSelect={selectShaft}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0876b9] text-xs font-bold text-white">3</span>
              <div>
                <h3 className="text-sm font-semibold text-[#1f2b29]">V-Seal</h3>
                <p className="mt-0.5 text-xs leading-5 text-[#74807e]">Choose the seal for this configuration</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {sealOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={seal === option}
                  enabled={Boolean(shaft && allowedSeals.includes(option))}
                  onSelect={setSeal}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`rounded-[4px] border border-black/10 bg-[#f0f2ef] p-4 transition sm:p-6 ${seal ? "" : "opacity-65"}`}>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0876b9] text-xs font-bold text-white">4</span>
          <div>
            <h2 className="text-sm font-semibold text-[#1f2b29]">Container size</h2>
            <p className="mt-0.5 text-xs text-[#74807e]">Select the container you are pumping from</p>
          </div>
        </div>
        <ContainerSelector value={container} onChange={setContainer} disabled={!seal} />
      </section>

      {tube && shaft && seal && container ? (
        <section className="rounded-[4px] border border-[#cc2027]/20 bg-[#fff8f8] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#cc2027]">Configuration ready</p>
          <p className="mt-2 text-sm font-semibold text-[#263230]">
            {tube} pump tube · {shaft} drive shaft · {seal} · {container.name}
          </p>
          <p className="mt-1 text-xs text-[#697573]">
            ATEX: {atex ? "Yes" : "No"} · Food: {food ? "Yes" : "No"} · {container.volume}
          </p>
        </section>
      ) : null}
    </div>
  );
}
