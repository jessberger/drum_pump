import Image, { type StaticImageData } from "next/image";

import PumpSelector from "@/components/selector/PumpSelector";

import product1 from "../../images/1.jpg";
import product2 from "../../images/2.jpg";
import product3 from "../../images/3.jpg";
import product4 from "../../images/4.jpg";
import product5 from "../../images/5.jpg";
import product6 from "../../images/6.jpg";
import product7 from "../../images/7.jpg";
import product8 from "../../images/8.jpg";
import logo from "../../images/logo.png";

type ProductFamily = {
  name: string;
  image: StaticImageData;
  available: boolean;
};

const productFamilies: ProductFamily[] = [
  { name: "Hand Pumps", image: product1, available: false },
  { name: "Drum Pumps", image: product2, available: true },
  { name: "Vertical Eccentric Screw Pumps", image: product3, available: false },
  { name: "Horizontal Eccentric Screw Pumps", image: product4, available: false },
  { name: "Chemical Bellows Pumps", image: product5, available: false },
  { name: "Diaphragm Pumps", image: product6, available: false },
  { name: "Horizontal Centrifugal Pumps", image: product7, available: false },
  { name: "Vertical Centrifugal Pumps", image: product8, available: false },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f5f3] text-[#172221]">
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto flex w-full max-w-[1500px] items-center gap-5 px-5 py-5 sm:px-8 lg:px-12">
          <div className="relative h-12 w-36 shrink-0 sm:h-14 sm:w-44">
            <Image
              src={logo}
              alt="Jessberger"
              fill
              priority
              sizes="176px"
              className="object-contain object-left"
            />
          </div>
          <div className="h-9 w-px bg-black/15" aria-hidden="true" />
          <p className="text-[15px] font-semibold tracking-[0.02em] text-[#293534] sm:text-lg">
            Jessberger Pump Selector
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1500px] px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-16">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#cc2027]">
            Pump selection guide
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#172221] sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
            Select your pump type
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#63706e]">
            Choose a pump family to begin configuring the right solution for your application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {productFamilies.map((product, index) => (
            <article
              key={product.name}
              className={`group overflow-hidden rounded-[4px] border bg-white transition-[border-color,box-shadow,transform] duration-200 ${
                product.available
                  ? "border-[#cc2027]/45 shadow-[0_12px_32px_rgba(20,35,33,0.08)] hover:-translate-y-0.5 hover:border-[#cc2027] hover:shadow-[0_16px_38px_rgba(20,35,33,0.12)]"
                  : "border-black/10"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  loading={index < 4 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.025]"
                />
              </div>
              {product.available ? (
                <a
                  href="#drum-pump-selector"
                  className="flex min-h-20 items-center justify-between gap-3 border-t border-black/8 bg-[#cc2027] px-5 py-4 text-left text-[15px] font-semibold leading-5 text-white outline-none transition-colors hover:bg-[#ad171d] focus-visible:ring-2 focus-visible:ring-[#cc2027] focus-visible:ring-offset-2"
                >
                  <span>{product.name}</span>
                  <span className="text-xl" aria-hidden="true">
                    →
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex min-h-20 w-full cursor-not-allowed items-center justify-between gap-3 border-t border-black/8 px-5 py-4 text-left text-[15px] font-semibold leading-5 text-[#35413f]"
                >
                  <span>{product.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa3a1]">
                    Coming soon
                  </span>
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <PumpSelector />
    </main>
  );
}
