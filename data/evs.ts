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
  /** Highway range, 70 mph constant, 10–80% usable battery, 10°C ambient (miles). */
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

export const BASELINE_SLUG = "tesla-model-y-long-range-awd";

export const evs: EV[] = [
  {
    slug: BASELINE_SLUG,
    name: "Tesla Model Y Long Range AWD",
    year: 2026,
    segment: "Midsize SUV — Baseline reference",
    range70mph_10to80: 230,
    charge10to80: 27,
    charge10to50: 16,
    notes: [
      "System baseline used for all relative comparisons.",
      "19\" wheels assumed for the reference configuration.",
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
      "Highway efficiency trails baseline; charging speed leads it.",
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
      "Mechanically similar to Ioniq 5 with slightly lower drag.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "ford-mustang-mach-e-awd-er",
    name: "Ford Mustang Mach-E AWD Extended Range",
    year: 2025,
    segment: "Crossover — 400V architecture",
    range70mph_10to80: 210,
    charge10to80: 38,
    charge10to50: 22,
    notes: [
      "Charging tapers earlier than baseline — 10–50% remains competitive.",
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
      "Large frontal area lowers highway efficiency relative to the pack size.",
      "Charge curve is broad but peaks below 800V competitors.",
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
];

export function getEvBySlug(slug: string): EV | undefined {
  return evs.find((e) => e.slug === slug);
}

export function getBaseline(): EV {
  const baseline = getEvBySlug(BASELINE_SLUG);
  if (!baseline) {
    throw new Error("Baseline EV missing from dataset");
  }
  return baseline;
}
