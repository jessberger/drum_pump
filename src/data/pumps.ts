import type { StaticImageData } from "next/image";

import product1 from "../../images/1.jpg";
import product2 from "../../images/2.jpg";
import product3 from "../../images/3.jpg";
import product4 from "../../images/4.jpg";
import product5 from "../../images/5.jpg";
import product6 from "../../images/6.jpg";
import product7 from "../../images/7.jpg";
import product8 from "../../images/8.jpg";

export type PumpFamily = {
  name: string;
  slug: string;
  image: StaticImageData;
  compactImage?: boolean;
};

export const pumpFamilies: PumpFamily[] = [
  { name: "Hand Pumps", slug: "hand-pumps", image: product1 },
  { name: "Drum Pumps", slug: "drum-pumps", image: product2 },
  { name: "Vertical Eccentric Screw Pumps", slug: "vertical-eccentric-screw-pumps", image: product3 },
  { name: "Horizontal Eccentric Screw Pumps", slug: "horizontal-eccentric-screw-pumps", image: product4 },
  { name: "Chemical Bellows Pumps", slug: "chemical-bellows-pumps", image: product5, compactImage: true },
  { name: "Diaphragm Pumps", slug: "diaphragm-pumps", image: product6, compactImage: true },
  { name: "Horizontal Centrifugal Pumps", slug: "horizontal-centrifugal-pumps", image: product7, compactImage: true },
  { name: "Vertical Centrifugal Pumps", slug: "vertical-centrifugal-pumps", image: product8 },
];

export function getPumpFamily(slug: string) {
  return pumpFamilies.find((pump) => pump.slug === slug);
}
