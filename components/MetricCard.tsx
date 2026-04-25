import { EstimatedBadge } from "./EstimatedBadge";
import { formatPercent, type MetricSpec } from "@/lib/compare";

type Props = {
  metric: MetricSpec;
  value: number;
  /** Percent better-than-baseline. `null` when this card is itself the baseline. */
  relativePct: number | null;
};

export function MetricCard({ metric, value, relativePct }: Props) {
  const tone =
    relativePct === null
      ? "text-neutral-500"
      : relativePct > 0.5
        ? "text-emerald-700"
        : relativePct < -0.5
          ? "text-rose-700"
          : "text-neutral-500";

  return (
    <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-700">{metric.label}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{metric.condition}</p>
        </div>
        <EstimatedBadge />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight tabular-nums">
          {value}
        </span>
        <span className="text-base text-neutral-500">{metric.unit}</span>
      </div>
      <div className="mt-3 text-sm">
        {relativePct === null ? (
          <span className="text-neutral-500">Baseline reference vehicle</span>
        ) : (
          <span className={tone}>
            {formatPercent(relativePct)}{" "}
            <span className="text-neutral-500">vs Model Y baseline</span>
          </span>
        )}
      </div>
    </div>
  );
}
