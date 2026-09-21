import Image from "next/image";

import ApplicationSummary from "@/components/selector/ApplicationSummary";

import logo from "../../../../images/logo.png";

export default function ApplicationPage() {
  return (
    <main className="min-h-screen bg-[#f4f5f3] text-[#172221]">
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-5 px-5 py-5 sm:px-8">
          <div className="relative h-12 w-36 shrink-0 sm:h-14 sm:w-44">
            <Image src={logo} alt="Jessberger" fill priority sizes="176px" className="object-contain object-left" />
          </div>
          <div className="h-9 w-px bg-black/15" aria-hidden="true" />
          <p className="text-[15px] font-semibold tracking-[0.02em] text-[#293534] sm:text-lg">
            Jessberger Pump Selector
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#cc2027]">Step 2</p>
        <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Application requirements</h1>
        <p className="mb-10 mt-4 text-[#667270]">Your current selection has been saved for the next step.</p>
        <ApplicationSummary />
      </section>
    </main>
  );
}
