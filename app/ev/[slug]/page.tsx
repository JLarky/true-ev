import Link from "next/link";
import { notFound } from "next/navigation";
import { evs, getEvBySlug } from "@/data/evs";
import { METRICS } from "@/lib/compare";
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
    description: `${ev.name}: ${ev.range70mph_10to80} mi roadtrip range, ${ev.charge10to80} min 10–80% fast charging. Modeled estimates against the TrueEV canonical spec.`,
  };
}

export default function VehiclePage({
  params,
}: {
  params: { slug: string };
}) {
  const ev = getEvBySlug(params.slug);
  if (!ev) notFound();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link href="/" className="text-sm text-neutral-600 hover:text-ink">
          ← All vehicles
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            {ev.year}
          </span>
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
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.key}
              metric={metric}
              value={ev[metric.key]}
            />
          ))}
        </div>
      </section>

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
          href={`/compare?slugs=${ev.slug}`}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Compare with other vehicles →
        </Link>
      </div>
    </div>
  );
}
