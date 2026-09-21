import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import DrumPumpConfigurator from "@/components/selector/DrumPumpConfigurator";
import { getPumpFamily, pumpFamilies } from "@/data/pumps";

export function generateStaticParams() {
  return pumpFamilies.map((pump) => ({ slug: pump.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pumps/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pump = getPumpFamily(slug);

  return {
    title: pump ? `${pump.name} | Jessberger Pump Selector` : "Pump Selector",
  };
}

export default async function PumpPage({ params }: PageProps<"/pumps/[slug]">) {
  const { slug } = await params;
  const pump = getPumpFamily(slug);

  if (!pump) notFound();

  const isDrumPump = pump.slug === "drum-pumps";

  return (
    <main className="min-h-screen bg-[#f4f5f3] text-[#172221]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1120px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-[#697573] transition hover:text-[#cc2027]">
          <span aria-hidden="true">←</span> All pump types
        </Link>

        <div className="mb-8 grid items-center gap-6 border-b border-black/10 pb-8 sm:grid-cols-[1fr_180px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cc2027]">Pump selector</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{pump.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#667270]">
              {isDrumPump
                ? "Configure the pump materials and container for your application."
                : "A dedicated selection guide for this pump family will be available here."}
            </p>
          </div>
          <div className="relative hidden aspect-[4/3] sm:block">
            <Image src={pump.image} alt={pump.name} fill sizes="180px" className="object-contain p-3" />
          </div>
        </div>

        {isDrumPump ? (
          <DrumPumpConfigurator />
        ) : (
          <div className="rounded-[4px] border border-black/10 bg-white p-8 sm:p-10">
            <p className="text-sm font-semibold text-[#25312f]">Selector coming soon</p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#6b7674]">
              This product page is ready for its pump-specific selection criteria.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
