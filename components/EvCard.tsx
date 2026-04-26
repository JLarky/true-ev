import Link from "next/link";
import type { EV } from "@/data/evs";
import { EstimatedBadge } from "./EstimatedBadge";

type Props = {
  ev: EV;
};

export function EvCard({ ev }: Props) {
  return (
    <Link
      href={`/ev/${ev.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-ink hover:shadow-sm"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {ev.year}
        </p>
        <h3 className="mt-1 text-lg font-semibold leading-tight">{ev.name}</h3>
        <p className="mt-1 text-sm text-neutral-600">{ev.segment}</p>
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-neutral-500">
            Range
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {ev.range70mph_10to80}
            <span className="ml-1 text-xs font-normal text-neutral-500">mi</span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-neutral-500">
            10–80%
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {ev.charge10to80}
            <span className="ml-1 text-xs font-normal text-neutral-500">min</span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-neutral-500">
            10–50%
          </dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {ev.charge10to50}
            <span className="ml-1 text-xs font-normal text-neutral-500">min</span>
          </dd>
        </div>
      </dl>
      <div className="mt-auto flex items-center justify-between">
        <EstimatedBadge variant="card" />
        <span className="text-sm text-neutral-500 transition group-hover:text-ink">
          View →
        </span>
      </div>
    </Link>
  );
}
