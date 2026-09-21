"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Chemical, Container, SelectorState } from "@/types/selector";
import ChemicalSelector from "./ChemicalSelector";
import ContainerSelector from "./ContainerSelector";

const STORAGE_KEY = "jessberger-pump-selection";

export default function PumpSelector() {
  const router = useRouter();
  const [chemical, setChemical] = useState<Chemical | null>(null);
  const [container, setContainer] = useState<Container | null>(null);

  const canContinue = Boolean(chemical && container);

  const handleContinue = () => {
    if (!chemical || !container) return;

    const selection: SelectorState = { chemical, container };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    router.push("/selector/application");
  };

  return (
    <section id="drum-pump-selector" className="scroll-mt-6 border-t border-black/8 bg-[#172b28] text-white">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ef5a5f]">Drum pumps</p>
          <h2 className="max-w-md text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
            Find the right pump for your application.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/62">
            Tell us what you are pumping and the container it is being pumped from.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-white/52">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-xs font-semibold text-white">
              1
            </span>
            <span>Application basics</span>
            <span className="h-px w-10 bg-white/20" />
            <span>Step 1 of 4</span>
          </div>
        </div>

        <div className="rounded-[4px] border border-white/12 bg-white/[0.055] p-5 shadow-[0_24px_65px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10">
          <div className="grid gap-6">
            <div className="grid items-center gap-3 md:grid-cols-[145px_1fr]">
              <p className="text-xl font-medium tracking-[-0.02em] text-white">I am pumping</p>
              <ChemicalSelector value={chemical} onChange={setChemical} />
            </div>

            <div className="grid items-center gap-3 md:grid-cols-[145px_1fr]">
              <p className="text-xl font-medium tracking-[-0.02em] text-white">out of</p>
              <ContainerSelector value={container} onChange={setContainer} />
            </div>

            <div className="pt-2 md:pl-[145px]">
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-[3px] bg-[#cc2027] px-7 font-semibold text-white transition hover:bg-[#e02a31] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#172b28] disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/35 sm:w-auto sm:min-w-48"
              >
                Continue
                <span aria-hidden="true">→</span>
              </button>
              <p className="mt-3 text-xs text-white/42">Select both fields to continue.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
