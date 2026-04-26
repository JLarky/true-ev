import { EstimatedBadge } from "./EstimatedBadge";
import type { MetricSpec } from "@/lib/compare";

type Props = {
  metric: MetricSpec;
  value: number;
};

export function MetricCard({ metric, value }: Props) {
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
      <p className="mt-3 text-xs text-neutral-500">
        {metric.direction === "higher-is-better"
          ? "Higher is better"
          : "Lower is better"}
      </p>
    </div>
  );
}
