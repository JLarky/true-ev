"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EV } from "@/data/evs";

type Props = {
  evs: EV[];
};

export function EvSearch({ evs }: Props) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!trimmed) return [];
    return evs
      .filter(
        (e) =>
          e.name.toLowerCase().includes(trimmed) ||
          e.segment.toLowerCase().includes(trimmed),
      )
      .slice(0, 6);
  }, [evs, trimmed]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search vehicles (e.g. Ioniq, Lucid, Rivian)…"
        className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-ink"
      />
      {trimmed && matches.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
          {matches.map((ev) => (
            <li key={ev.slug}>
              <Link
                href={`/ev/${ev.slug}`}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-neutral-50"
              >
                <span>
                  <span className="font-medium">{ev.name}</span>
                  <span className="ml-2 text-neutral-500">{ev.segment}</span>
                </span>
                <span className="text-xs text-neutral-500">
                  {ev.range70mph_10to80} mi · {ev.charge10to80} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {trimmed && matches.length === 0 && (
        <p className="absolute z-10 mt-2 w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-500 shadow-lg">
          No matching vehicles in the pre-standard dataset.
        </p>
      )}
    </div>
  );
}
