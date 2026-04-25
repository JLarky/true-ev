export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
        <p className="font-medium text-neutral-800">TrueEV</p>
        <p className="mt-1 max-w-2xl">
          Building a normalized, independently-measured comparison standard
          for electric vehicles. All current values are modeled estimates
          based on aggregated public data and simulation. A proprietary
          measurement standard is under development.
        </p>
        <p className="mt-4 text-xs text-neutral-500">
          © {new Date().getFullYear()} TrueEV — Pre-standard release.
        </p>
      </div>
    </footer>
  );
}
