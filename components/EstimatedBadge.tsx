type Props = {
  variant?: "metric" | "card";
  className?: string;
};

export function EstimatedBadge({ variant = "metric", className = "" }: Props) {
  const base =
    "inline-flex items-center gap-1 rounded-full border border-amber-300/70 bg-amber-50 text-amber-900";
  const sizing =
    variant === "metric"
      ? "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
      : "px-2.5 py-1 text-xs font-medium";
  return (
    <span className={`${base} ${sizing} ${className}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Estimated (pre-standard dataset)
    </span>
  );
}
