"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EV } from "@/data/evs";
import {
  METRICS,
  bestIndex,
  formatPercent,
  relativePercent,
  type MetricSpec,
} from "@/lib/compare";
import { EstimatedBadge } from "@/components/EstimatedBadge";

type Props = {
  evs: EV[];
  initialSlugs: string[];
};

const MIN_SELECTION = 2;
const MAX_SELECTION = 4;

export function CompareView({ evs, initialSlugs }: Props) {
  const defaults = useMemo(() => {
    if (initialSlugs.length >= MIN_SELECTION) return initialSlugs;
    const seed = [...initialSlugs];
    for (const ev of evs) {
      if (seed.length >= MIN_SELECTION) break;
      if (!seed.includes(ev.slug)) seed.push(ev.slug);
    }
    return seed;
  }, [evs, initialSlugs]);

  const [selected, setSelected] = useState<string[]>(defaults);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        if (prev.length <= MIN_SELECTION) return prev;
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, slug];
    });
  };

  const chosen = selected
    .map((slug) => evs.find((e) => e.slug === slug))
    .filter((e): e is EV => Boolean(e));

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
            Pick vehicles
          </h2>
          <p className="text-xs text-neutral-500">
            {selected.length}/{MAX_SELECTION} selected · min {MIN_SELECTION}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {evs.map((ev) => {
            const active = selected.includes(ev.slug);
            const atMax = !active && selected.length >= MAX_SELECTION;
            const atMin = active && selected.length <= MIN_SELECTION;
            const disabled = atMax || atMin;
            return (
              <button
                key={ev.slug}
                type="button"
                onClick={() => toggle(ev.slug)}
                disabled={disabled}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-ink"
                } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                title={
                  atMax
                    ? `Already at ${MAX_SELECTION} vehicles`
                    : atMin
                      ? `Need at least ${MIN_SELECTION} vehicles`
                      : undefined
                }
              >
                {ev.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50">
              <th className="border-b border-neutral-200 px-4 py-3 text-left font-medium text-neutral-600">
                <div className="flex items-center gap-2">
                  Metric
                  <EstimatedBadge />
                </div>
              </th>
              {chosen.map((ev) => (
                <th
                  key={ev.slug}
                  className="border-b border-neutral-200 px-4 py-3 text-left font-semibold"
                >
                  <Link href={`/ev/${ev.slug}`} className="hover:underline">
                    {ev.name}
                  </Link>
                  <div className="mt-0.5 text-xs font-normal text-neutral-500">
                    {ev.year} · {ev.segment}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map((metric) => (
              <Row key={metric.key} metric={metric} chosen={chosen} />
            ))}
          </tbody>
        </table>
      </section>

      <p className="text-xs text-neutral-500">
        The best result in each row is highlighted, and the percent shown
        next to non-best cells is the gap to that best — within your current
        selection only.
      </p>
    </div>
  );
}

function Row({ metric, chosen }: { metric: MetricSpec; chosen: EV[] }) {
  const best = bestIndex(chosen, metric);
  const bestValue = best >= 0 ? chosen[best][metric.key] : null;

  return (
    <tr className="border-b border-neutral-100 last:border-b-0">
      <td className="px-4 py-4 align-top">
        <div className="font-medium">{metric.label}</div>
        <div className="text-xs text-neutral-500">{metric.condition}</div>
        <div className="mt-1 text-[10px] uppercase tracking-wide text-neutral-400">
          {metric.direction === "higher-is-better"
            ? "higher is better"
            : "lower is better"}
        </div>
      </td>
      {chosen.map((ev, i) => {
        const value = ev[metric.key];
        const isBest = i === best;
        const gap =
          bestValue === null || isBest
            ? null
            : relativePercent(value, bestValue, metric.direction);
        return (
          <td
            key={ev.slug}
            className={`px-4 py-4 align-top ${
              isBest ? "bg-emerald-50/60" : ""
            }`}
          >
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl font-semibold tabular-nums ${
                  isBest ? "text-emerald-700" : ""
                }`}
              >
                {value}
              </span>
              <span className="text-xs text-neutral-500">{metric.unit}</span>
              {isBest && (
                <span className="ml-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Best
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              {gap === null ? "—" : `${formatPercent(gap)} vs best`}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
