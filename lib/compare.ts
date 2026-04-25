import type { EV } from "@/data/evs";

/**
 * Sign convention used everywhere in the UI:
 *   positive percent → the candidate is BETTER than the reference
 *   negative percent → the candidate is WORSE than the reference
 *
 * For range, "more miles" is better, so the formula is straightforward.
 * For charging times, "fewer minutes" is better, so the sign is inverted.
 */
export type Direction = "higher-is-better" | "lower-is-better";

export type MetricKey = "range70mph_10to80" | "charge10to80" | "charge10to50";

export type MetricSpec = {
  key: MetricKey;
  label: string;
  unit: string;
  direction: Direction;
  /** Short user-facing condition string shown beneath the value. */
  condition: string;
};

export const METRICS: MetricSpec[] = [
  {
    key: "range70mph_10to80",
    label: "Highway range",
    unit: "mi",
    direction: "higher-is-better",
    condition: "70 mph · 10–80% · 10°C",
  },
  {
    key: "charge10to80",
    label: "10–80% fast charge",
    unit: "min",
    direction: "lower-is-better",
    condition: "DC fast · preconditioned",
  },
  {
    key: "charge10to50",
    label: "10–50% fast charge",
    unit: "min",
    direction: "lower-is-better",
    condition: "DC fast · preconditioned",
  },
];

/** Percent difference of `candidate` vs `reference` in "better/worse" terms. */
export function relativePercent(
  candidate: number,
  reference: number,
  direction: Direction,
): number {
  if (reference === 0) return 0;
  const raw = ((candidate - reference) / reference) * 100;
  return direction === "higher-is-better" ? raw : -raw;
}

export function formatPercent(pct: number): string {
  if (Math.abs(pct) < 0.5) return "≈ baseline";
  const rounded = Math.round(pct);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

/** Plain-English comparison sentence used on the vehicle page. */
export function describeComparison(
  candidate: EV,
  reference: EV,
  metric: MetricSpec,
): string {
  const pct = relativePercent(
    candidate[metric.key],
    reference[metric.key],
    metric.direction,
  );
  const magnitude = Math.abs(Math.round(pct));
  if (magnitude < 1) {
    return `${metric.label} is essentially the same as the ${reference.name}.`;
  }
  const verb =
    metric.key === "range70mph_10to80"
      ? pct > 0
        ? "goes farther on the highway than"
        : "goes less far on the highway than"
      : pct > 0
        ? "charges faster than"
        : "charges slower than";
  return `This vehicle ${verb} the ${reference.name} by about ${magnitude}%.`;
}
