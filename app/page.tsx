import Link from "next/link";
import { evs } from "@/data/evs";
import { EvCard } from "@/components/EvCard";
import { EstimatedBadge } from "@/components/EstimatedBadge";
import { EvSearch } from "./EvSearch";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-700">
            Pre-standard release
          </span>
          <EstimatedBadge variant="card" />
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Real-world EV numbers,
          <br />
          measured the same way.
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700">
          TrueEV strips marketing bias out of EV comparisons. Every vehicle is
          described against one canonical spec — highway range and DC fast
          charging — so two cars are always compared on the same axes.
        </p>
        <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4 text-sm text-amber-900">
          All values are modeled estimates based on aggregated public data and
          simulation. A proprietary measurement standard is under development.
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Compare vehicles →
          </Link>
          <Link
            href="/methodology"
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:border-ink"
          >
            How we measure
          </Link>
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-3">
        <Spec
          label="Highway range"
          value="70 mph · 10–80% · 10°C"
          body="Constant 70 mph cruise from 10% to 80% usable battery, at a 10°C reference ambient temperature."
        />
        <Spec
          label="10–80% fast charge"
          value="DC fast · preconditioned"
          body="Time to add 70% state-of-charge on a high-power DC charger, with battery preconditioned to its target temperature."
        />
        <Spec
          label="10–50% snapshot"
          value="Same conditions"
          body="A focused look at the high-power region of the curve — what most road-trip stops actually use."
        />
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Browse vehicles
            </h2>
            <p className="text-sm text-neutral-600">
              {evs.length} vehicles in the pre-standard dataset.
            </p>
          </div>
          <Link
            href="/compare"
            className="text-sm font-medium text-neutral-700 hover:text-ink"
          >
            Side-by-side compare →
          </Link>
        </div>
        <EvSearch evs={evs} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evs.map((ev) => (
            <EvCard key={ev.slug} ev={ev} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Spec({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold">{value}</p>
      <p className="mt-2 text-sm text-neutral-600">{body}</p>
    </div>
  );
}
