import Image from "next/image";
import Link from "next/link";

import logo from "../../images/logo.png";

export default function SiteHeader() {
  return (
    <header className="border-b border-black/8 bg-white">
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="relative h-10 w-32 shrink-0 sm:h-12 sm:w-40" aria-label="Jessberger Pump Selector home">
          <Image src={logo} alt="Jessberger" fill priority sizes="160px" className="object-contain object-left" />
        </Link>
        <div className="h-8 w-px bg-black/15" aria-hidden="true" />
        <p className="text-sm font-semibold tracking-[0.01em] text-[#293534] sm:text-base">Jessberger Pump Selector</p>
      </div>
    </header>
  );
}
