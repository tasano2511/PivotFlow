import Reveal from "./Reveal";

const CONTACT_EMAIL = "support@pivotflowlabs.com";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-ivory/10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div className="flex items-center gap-2 font-display text-ivory">
          <span>PivotFlow Labs LLC</span>
          <span className="text-ivory/40">·</span>
          <span className="font-mono text-xs text-ivory/50">{year}</span>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`rounded-sm font-mono text-sm text-ivory/70 underline decoration-ivory/20 underline-offset-4 transition-colors hover:text-brass hover:decoration-brass ${FOCUS_RING}`}
        >
          {CONTACT_EMAIL}
        </a>
      </Reveal>
    </footer>
  );
}
