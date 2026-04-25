import Link from "next/link";
import { notFound } from "next/navigation";
import { evs, getBaseline, getEvBySlug, BASELINE_SLUG } from "@/data/evs";
import {
  METRICS,
  describeComparison,
  formatPercent,
  relativePercent,
} from "@/lib/compare";
import { MetricCard } from "@/components/MetricCard";
import { EstimatedBadge } from "@/components/EstimatedBadge";

export function generateStaticParams() {
  return evs.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const ev = getEvBySlug(params.slug);
  if (!ev) return {};
  return {
    title: `${ev.name} — TrueEV`,
    description: `${ev.name}: ${ev.range70mph_10to80} mi highway range, ${ev.charge10to80} min 10–80% fast charging. Modeled estimates against the TrueEV canonical spec.`,
  };
}

export default function VehiclePage({
  params,
}: {
  params: { slug: string };
}) {
  const ev = getEvBySlug(params.slug);
  if (!ev) notFound();

  const baseline = getBaseline();
  const isBaseline = ev.slug === BASELINE_SLUG;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href="/"
          className="text-sm text-neutral-600 hover:text-ink"
        >
          ← All vehicles
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            {ev.year}
          </span>
          {isBaseline && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Baseline reference
            </span>
          )}
          <EstimatedBadge variant="card" />
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {ev.name}
        </h1>
        <p className="mt-1 text-neutral-600">{ev.segment}</p>
      </div>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Core metrics</h2>
          <p className="text-xs text-neutral-500">
            All values modeled · pre-standard dataset
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {METRICS.map((metric) => {
            const value = ev[metric.key];
            const pct = isBaseline
              ? null
              : relativePercent(
                  value,
                  baseline[metric.key],
                  metric.direction,
                );
            return (
              <MetricCard
                key={metric.key}
                metric={metric}
                value={value}
                relativePct={pct}
              />
            );
          })}
        </div>
      </section>

      {!isBaseline && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">What this means</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {METRICS.map((metric) => (
              <li key={metric.key} className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400"
                />
                <span>{describeComparison(ev, baseline, metric)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
            Compared to the {baseline.name} baseline:
            <ul className="mt-2 space-y-1">
              {METRICS.map((metric) => {
                const pct = relativePercent(
                  ev[metric.key],
                  baseline[metric.key],
                  metric.direction,
                );
                const tone =
                  pct > 0.5
                    ? "text-emerald-700"
                    : pct < -0.5
                      ? "text-rose-700"
                      : "text-neutral-600";
                return (
                  <li key={metric.key} className="flex justify-between gap-3">
                    <span>{metric.label}</span>
                    <span className={`font-medium ${tone}`}>
                      {formatPercent(pct)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {ev.notes && ev.notes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Notes</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {ev.notes.map((note, i) => (
              <li key={i} className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-amber-300 bg-amber-50/60 p-5 text-sm text-amber-900">
        <p className="font-semibold">Estimated (pre-standard dataset)</p>
        <p className="mt-1">
          All values on this page are modeled estimates based on aggregated
          public data and simulation. A proprietary measurement standard is
          under development.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/compare?slugs=${ev.slug},${baseline.slug}`}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Compare with baseline →
        </Link>
        <Link
          href="/compare"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:border-ink"
        >
          Open full compare tool
        </Link>
      </div>
    </div>
  );
}
