import Link from "next/link";
import { apps, type AppStatus, type PortfolioApp } from "@/lib/apps";
import Reveal from "./Reveal";
import PlatformBadges from "./PlatformBadges";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export default function AppsGrid() {
  return (
    <section id="apps" className="scroll-mt-24 border-b border-ivory/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
            01 — Portfolio
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ivory sm:text-4xl">
            Apps we’ve shipped
          </h2>
          <p className="mt-4 text-ivory/70">
            Each one built, shipped, and maintained by PivotFlow Labs — proof
            before pitch.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <li key={app.slug}>
              <Reveal className="h-full" delayMs={index * 120}>
                <AppCard app={app} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AppCard({ app }: { app: PortfolioApp }) {
  return (
    <div
      className={`group flex h-full flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_18px_40px_-20px_rgba(200,155,60,0.35)] ${
        app.status === "tbd"
          ? "border-dashed border-ivory/15 bg-panel/50"
          : "border-ivory/10 bg-panel"
      }`}
    >
      <Link href={`/apps/${app.slug}`} className={`flex flex-1 flex-col rounded-sm ${FOCUS_RING}`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl text-ivory">{app.name}</h3>
          <StatusBadge status={app.status} />
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ivory/50">
          {app.tagline}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70">
          {app.description}
        </p>
        {app.stack && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {app.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-ivory/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ivory/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-brass">
          Case study
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>

      <div className="mt-5">
        <PlatformBadges platforms={app.platforms} size="sm" />
      </div>

      {app.href && (
        <a
          href={app.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-1 self-start font-mono text-[11px] uppercase tracking-wider text-ivory/40 transition-colors hover:text-brass ${FOCUS_RING}`}
        >
          Visit live
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: AppStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-live">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
        </span>
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center font-mono text-[10px] uppercase tracking-wider text-ivory/40">
      TBD
    </span>
  );
}
