import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PlatformBadges from "@/components/PlatformBadges";
import { apps, type AppStatus } from "@/lib/apps";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: `${app.name} — PivotFlow Labs`,
    description: app.description,
  };
}

export default async function AppCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-ivory/10">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Link
                href="/#apps"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ivory/50 transition-colors hover:text-brass"
              >
                ← All apps
              </Link>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-4xl tracking-tight text-ivory sm:text-5xl">
                  {app.name}
                </h1>
                <StatusBadge status={app.status} />
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ivory/50">
                {app.tagline}
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80">
                {app.problem ?? app.description}
              </p>

              <div className="mt-8">
                <PlatformBadges platforms={app.platforms} />
              </div>

              {app.href && (
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-brass/90"
                >
                  Visit {app.name}
                  <span aria-hidden>→</span>
                </a>
              )}
            </Reveal>
          </div>
        </section>

        {app.features && app.features.length > 0 && (
          <section className="border-b border-ivory/10">
            <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
                  Features
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {app.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl border border-ivory/10 bg-panel p-5 text-sm leading-relaxed text-ivory/80"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        {app.stack && app.stack.length > 0 && (
          <section>
            <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
                  Built with
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {app.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-ivory/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ivory/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function StatusBadge({ status }: { status: AppStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-live">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
        </span>
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center font-mono text-xs uppercase tracking-wider text-ivory/40">
      TBD
    </span>
  );
}
