import Dial from "./Dial";
import Reveal from "./Reveal";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-24 border-b border-ivory/10">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-32">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
            PivotFlow Labs LLC
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            We build apps. Then we help you build yours.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ivory/70">
            PivotFlow Labs ships its own portfolio of apps first, then takes on a
            select number of custom builds for clients who want that same
            craft applied to their idea.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#apps"
              className={`inline-flex items-center justify-center rounded-full bg-brass px-6 py-3 font-mono text-sm uppercase tracking-wider text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-brass/90 active:translate-y-0 active:scale-95 ${FOCUS_RING}`}
            >
              See the apps
            </a>
            <a
              href="#build-with-us"
              className={`inline-flex items-center justify-center rounded-full border border-ivory/25 px-6 py-3 font-mono text-sm uppercase tracking-wider text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-brass hover:text-brass active:translate-y-0 active:scale-95 ${FOCUS_RING}`}
            >
              Have an idea?
            </a>
          </div>
        </Reveal>
        <Reveal delayMs={150} className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(closest-side,rgba(200,155,60,0.18),transparent_70%)] blur-3xl"
          />
          <Dial
            variant="hero"
            interactive
            className="h-auto w-full max-w-md text-ivory"
          />
        </Reveal>
      </div>
    </section>
  );
}
