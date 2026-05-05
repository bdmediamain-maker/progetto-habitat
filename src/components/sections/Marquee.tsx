/**
 * Marquee — continuous horizontal text ticker.
 *
 * Runs as a pure CSS animation (no JS) at 30s / loop.
 * Text is duplicated 4× so the loop is seamless at any viewport width.
 * Hover pauses the animation.
 *
 * Positioned between the portfolio and philosophy sections in page.tsx.
 */
export default function Marquee() {
  // The text duplicated inside each track item — 2× = seamless -50% loop
  const TEXT =
    'ARCHITETTURA\u2003•\u2003BIOARCHITETTURA\u2003•\u2003INTERIOR DESIGN\u2003•\u2003EDILIZIA SOSTENIBILE\u2003•\u2003VERONA\u2003•\u2003';

  return (
    <div
      className="w-full overflow-hidden bg-base py-8"
      role="marquee"
      aria-label="Studio keywords"
    >
      {/*
        The track is twice as wide as its content (two identical halves).
        The CSS animation shifts it left by -50% (one full copy width),
        then loops back to 0 — creating a seamless infinite scroll.
        `group` enables the CSS hover-pause without JavaScript.
      */}
      <div
        className="group flex w-max cursor-default animate-marquee hover:[animation-play-state:paused]"
      >
        {/* Two identical halves = seamless -50% loop */}
        {[0, 1].map((half) => (
          <span
            key={half}
            aria-hidden={half === 1 ? 'true' : undefined}
            className="flex shrink-0 select-none items-center whitespace-nowrap font-display font-bold uppercase text-primary/20"
            style={{ fontSize: 'clamp(12px, 2vw, 28px)' }}
          >
            {/* Repeat text within each half so there's enough content at large screens */}
            {TEXT.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}
