import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-white text-sm font-bold">
            tEV
          </span>
          <span className="text-base font-semibold tracking-tight">
            TrueEV
            <span className="ml-2 text-xs font-normal text-neutral-500">
              standardized real-world metrics
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-neutral-700 hover:text-ink">
            Browse
          </Link>
          <Link href="/compare" className="text-neutral-700 hover:text-ink">
            Compare
          </Link>
          <Link
            href="/methodology"
            className="text-neutral-700 hover:text-ink"
          >
            Methodology
          </Link>
        </nav>
      </div>
    </header>
  );
}
