import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import { pumpFamilies } from "@/data/pumps";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f5f3] text-[#172221]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mb-7 max-w-xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#cc2027]">Pump selection guide</p>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#172221] sm:text-3xl lg:text-[36px]">
            Select your pump type
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#63706e]">
            Choose a pump family to configure the right solution for your application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {pumpFamilies.map((pump, index) => (
            <article
              key={pump.slug}
              className="group overflow-hidden rounded-[3px] border border-black/10 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#cc2027]/55 hover:shadow-[0_12px_28px_rgba(20,35,33,0.09)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  src={pump.image}
                  alt={pump.name}
                  fill
                  loading={index < 4 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
                    pump.compactImage ? "p-16 sm:p-14" : "p-6 sm:p-5"
                  }`}
                />
              </div>
              <Link
                href={`/pumps/${pump.slug}`}
                className="flex min-h-14 items-center justify-between gap-3 border-t border-black/8 px-4 py-3 text-left text-[13px] font-semibold leading-[1.25] text-[#263230] outline-none transition-colors hover:bg-[#cc2027] hover:text-white focus-visible:bg-[#cc2027] focus-visible:text-white"
              >
                <span>{pump.name}</span>
                <span className="shrink-0 text-base text-[#cc2027] transition-colors group-hover:text-white" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
