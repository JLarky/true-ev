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
  /** Roadtrip range: 70 mph constant, 80–10% usable battery, 10°C ambient (miles per leg). */
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
  {
    slug: "tesla-model-3-long-range-awd",
    name: "Tesla Model 3 Long Range AWD",
    year: 2025,
    segment: "Midsize sedan",
    range70mph_10to80: 255,
    charge10to80: 22,
    charge10to50: 12,
    notes: [
      "Lower drag than the Model Y improves highway range by roughly 10%.",
      "V3 Supercharger peak rate sustained through most of the charge window.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "hyundai-ioniq-6-awd",
    name: "Hyundai Ioniq 6 AWD",
    year: 2025,
    segment: "Midsize sedan — 800V architecture",
    range70mph_10to80: 220,
    charge10to80: 18,
    charge10to50: 10,
    notes: [
      "0.21 Cd body is the most aerodynamic production EV in the dataset.",
      "800V pack mirrors the Ioniq 5 charge curve; faster absolute times due to lower kWh needed.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "kia-ev9-awd-long-range",
    name: "Kia EV9 AWD Long Range",
    year: 2025,
    segment: "Full-size 3-row SUV — 800V architecture",
    range70mph_10to80: 210,
    charge10to80: 23,
    charge10to50: 12,
    notes: [
      "Large 99 kWh pack keeps 10–80% time low despite the SUV penalty.",
      "800V architecture maintains competitive charge rates for its class.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "volkswagen-id4-awd-pro",
    name: "Volkswagen ID.4 AWD Pro",
    year: 2025,
    segment: "Compact crossover — 400V architecture",
    range70mph_10to80: 190,
    charge10to80: 30,
    charge10to50: 15,
    notes: [
      "150 kW peak charge rate tapers in the upper half of the window.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "chevrolet-equinox-ev-awd",
    name: "Chevrolet Equinox EV AWD",
    year: 2025,
    segment: "Compact crossover — 400V Ultium",
    range70mph_10to80: 185,
    charge10to80: 33,
    charge10to50: 17,
    notes: [
      "Ultium pack tops out at 150 kW; curve is relatively flat to 60% then tapers.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "polestar-2-long-range-awd",
    name: "Polestar 2 Long Range AWD",
    year: 2025,
    segment: "Fastback sedan — 400V architecture",
    range70mph_10to80: 195,
    charge10to80: 28,
    charge10to50: 15,
    notes: [
      "2024+ hardware revision raised peak charge rate to 205 kW.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "bmw-ix-xdrive50",
    name: "BMW iX xDrive50",
    year: 2025,
    segment: "Luxury SUV — 400V architecture",
    range70mph_10to80: 215,
    charge10to80: 35,
    charge10to50: 18,
    notes: [
      "195 kW peak charge rate is competitive for a 400V system.",
      "Large 100 kWh gross pack partially offsets slower charge speed.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
  {
    slug: "rivian-r1t-dual-motor",
    name: "Rivian R1T Dual Motor",
    year: 2025,
    segment: "Full-size pickup — Adventure",
    range70mph_10to80: 220,
    charge10to80: 40,
    charge10to50: 22,
    notes: [
      "Truck bed and larger frontal area reduce highway efficiency vs. R1S.",
      "Charge profile mirrors the R1S — broad curve, peaks below 800V peers.",
    ],
    source: "modeled-public-aggregate",
    estimated: true,
  },
];

export function getEvBySlug(slug: string): EV | undefined {
  return evs.find((e) => e.slug === slug);
}
