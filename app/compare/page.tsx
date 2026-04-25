import { evs, BASELINE_SLUG } from "@/data/evs";
import { CompareView } from "./CompareView";

export const metadata = {
  title: "Compare EVs — TrueEV",
  description:
    "Side-by-side EV comparison on the TrueEV canonical spec: highway range and DC fast charging, normalized.",
};

export default function ComparePage({
  searchParams,
}: {
  searchParams?: { slugs?: string };
}) {
  const initialSlugs = parseSlugs(searchParams?.slugs);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Side-by-side comparison
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-700">
          Pick 2–4 vehicles. Numbers are reported on the TrueEV canonical
          spec, with percent differences taken against the{" "}
          {evs.find((e) => e.slug === BASELINE_SLUG)?.name} baseline.
        </p>
      </div>
      <CompareView evs={evs} initialSlugs={initialSlugs} />
    </div>
  );
}

function parseSlugs(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((slug) => evs.some((e) => e.slug === slug))
    .slice(0, 4);
}
