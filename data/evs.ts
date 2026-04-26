// Canonical TrueEV dataset.
//
// Pre-standard / simulated data mode: all values are modeled estimates based
// on aggregated public sources, manufacturer specs, and independent reviews.
// A proprietary measurement protocol is under development; once live test
// data is ingested, the same fields below will be repopulated with measured
// numbers and the `estimated` flag will flip to false on a per-vehicle basis.

export type MetricSource = "modeled-public-aggregate" | "measured-true-ev";

export type EV = {
  /** URL slug, lowercase, hyphen-separated. */
  slug: string;
  /** Display name. */
  name: string;
  /** Model year shown next to the name. */
  year: number;
  /** Short manufacturer/segment hint for the card UI. */
  segment: string;
  /** Roadtrip range: 70 mph constant, 10–80% usable battery, 10°C ambient (miles per leg). */
  range70mph_10to80: number;
  /** DC fast charge time, 10–80%, preconditioned battery (minutes). */
  charge10to80: number;
  /** DC fast charge curve snapshot, 10–50%, same conditions (minutes). */
  charge10to50: number;
  /** Optional asterisk-style behavior notes (winter, charge curve shape, etc.). */
  notes?: string[];
  /** Provenance of the numbers — currently always "modeled-public-aggregate". */
  source: MetricSource;
  /** True until proprietary measured data replaces the modeled estimate. */
  estimated: boolean;
};

export const evs: EV[] = [
  {
    slug: "ford-mustang-mach-e-awd-er",
    name: "Ford Mustang Mach-E AWD Extended Range",
    year: 2025,
    segment: "Crossover — 400V architecture",
    range70mph_10to80: 210,
    charge10to80: 38,
    charge10to50: 22,
    notes: [
      "Charging tapers earlier in the curve; 10–50% stays competitive.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "hyundai-ioniq-5-awd",
    name: "Hyundai Ioniq 5 AWD",
    year: 2025,
    segment: "Compact crossover — 800V architecture",
    range70mph_10to80: 200,
    charge10to80: 20,
    charge10to50: 11,
    notes: [
      "800V pack delivers a notably flat charge curve.",
      "Highway efficiency is on the lower end of the dataset.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "kia-ev6-awd",
    name: "Kia EV6 AWD",
    year: 2025,
    segment: "Crossover — 800V architecture",
    range70mph_10to80: 205,
    charge10to80: 21,
    charge10to50: 12,
    notes: [
      "Mechanically similar to the Ioniq 5 with slightly lower drag.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "lucid-air-pure",
    name: "Lucid Air Pure",
    year: 2025,
    segment: "Luxury sedan — efficiency leader",
    range70mph_10to80: 280,
    charge10to80: 24,
    charge10to50: 13,
    notes: [
      "Class-leading highway efficiency drives the range advantage.",
      "900V architecture supports a high-plateau charge curve.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "rivian-r1s-dual-motor",
    name: "Rivian R1S Dual Motor",
    year: 2025,
    segment: "Full-size SUV — Adventure",
    range70mph_10to80: 225,
    charge10to80: 41,
    charge10to50: 23,
    notes: [
      "Large frontal area lowers highway efficiency relative to pack size.",
      "Charge curve is broad but peaks below 800V competitors.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "tesla-model-y-long-range-awd",
    name: "Tesla Model Y Long Range AWD",
    year: 2026,
    segment: "Midsize SUV",
    range70mph_10to80: 230,
    charge10to80: 27,
    charge10to50: 16,
    notes: [
      "19\" wheels assumed for the reference configuration.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
];

export function getEvBySlug(slug: string): EV | undefined {
  return evs.find((e) => e.slug === slug);
}
