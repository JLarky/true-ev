import { EstimatedBadge } from "@/components/EstimatedBadge";

export default function MethodologyPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-700">
          Methodology
        </span>
        <EstimatedBadge variant="card" />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        The TrueEV canonical spec
      </h1>
      <p className="mt-4 text-neutral-700">
        EV manufacturers don&rsquo;t use the same test conditions, and
        reviewers don&rsquo;t either. TrueEV publishes one specification and
        reports every vehicle against it. There are exactly three numbers per
        vehicle.
      </p>

      <Section title="1. Highway range">
        <Bullet>Constant 70 mph cruise.</Bullet>
        <Bullet>Measured from 10% to 80% usable battery.</Bullet>
        <Bullet>Reference ambient temperature: 10&deg;C.</Bullet>
        <Bullet>Output: miles.</Bullet>
      </Section>

      <Section title="2. Charging time, 10–80%">
        <Bullet>DC fast charging at the highest power the vehicle accepts.</Bullet>
        <Bullet>Battery preconditioned to its target temperature on arrival.</Bullet>
        <Bullet>Output: minutes.</Bullet>
      </Section>

      <Section title="3. Charging curve snapshot, 10–50%">
        <Bullet>
          Same conditions as above — isolates the high-power region of the
          curve, which dominates real road-trip stops.
        </Bullet>
        <Bullet>Output: minutes.</Bullet>
      </Section>

      <Section title="Why a baseline?">
        <p className="text-neutral-700">
          The 2026 Tesla Model Y Long Range AWD on 19&Prime; wheels is the
          baseline reference vehicle. Every comparison is reported as a
          percent better or worse than the Model Y, in the direction that
          matters (more miles is better, fewer minutes is better).
        </p>
      </Section>

      <Section title="Pre-standard dataset">
        <p className="text-neutral-700">
          This release does <strong>not</strong> contain proprietary measured
          data. Every value is a modeled estimate built from aggregated
          manufacturer specs, independent reviews, and curve-fit
          approximations. We label this clearly on every page and on every
          metric.
        </p>
        <p className="mt-3 text-neutral-700">
          A standardized independent EV testing protocol is under development.
          As real measurements arrive, vehicles will flip from
          &ldquo;Estimated&rdquo; to &ldquo;Measured&rdquo; one at a time.
        </p>
      </Section>

      <Section title="What's deliberately not here yet">
        <Bullet>Temperature-scaling curves.</Bullet>
        <Bullet>Per-speed efficiency models.</Bullet>
        <Bullet>User scenario calculators.</Bullet>
        <Bullet>
          An &ldquo;asterisk system&rdquo; for behavior traits (winter range
          falloff, charge-curve shape, regen behavior).
        </Bullet>
        <p className="mt-3 text-neutral-700">
          These are intentionally deferred. The first job is to publish three
          consistent numbers per vehicle. Everything else builds on top.
        </p>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-1.5">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 text-neutral-700">
      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
      <span>{children}</span>
    </p>
  );
}
