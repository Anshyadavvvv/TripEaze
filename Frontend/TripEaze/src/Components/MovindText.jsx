const destinations = [
  "Kedarnath",
  "Kasol",
  "Chakrata",
  "Moila",
  "Bir",
  "Triund",
  "Chandrashila",
  "Manali",
  "Spiti Valley",
  "Rishikesh",
  "Udaipur",
];

export default function MovingText() {
  return (
    <section
      className="relative overflow-hidden bg-[#0B1330] py-14 sm:py-16"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
      />
      <style>{`
        @keyframes tripeaze-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .tripeaze-marquee-track {
          animation: tripeaze-marquee 36s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Hovering ANY destination pauses the whole row */
        .tripeaze-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .tripeaze-marquee-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tripeaze-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Eyebrow */}
      <div className="relative mb-9 px-6 text-center sm:mb-10">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#F5A83C]"
        >
          Where We Take You
        </p>
        <span className="mx-auto mt-3 block h-px w-14 bg-white/15" />
      </div>

      {/* Top / bottom hairlines frame the belt like a ticket strip */}
      <div className="pointer-events-none absolute inset-x-0 top-[76px] h-px bg-white/[0.07] sm:top-[84px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.07]" />

      {/* Edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32"
        style={{ background: "linear-gradient(to right, #0B1330, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32"
        style={{ background: "linear-gradient(to left, #0B1330, transparent)" }}
      />

      {/* Static list for screen readers */}
      <span className="sr-only">
        Destinations we cover: {destinations.join(", ")}
      </span>

      <div
        className="tripeaze-marquee-track flex w-max flex-nowrap items-center"
        aria-hidden="true"
      >
        {[...destinations, ...destinations].map((place, i) => (
          <div key={i} className="flex shrink-0 items-center">
            <span
              tabIndex={0}
              className="group/word relative cursor-default whitespace-nowrap px-6 py-2 outline-none sm:px-8 md:px-10"
            >
              <span
                className="block font-extrabold uppercase text-white/90 transition-all duration-300 ease-out group-hover/word:scale-110 group-hover/word:text-[#F5A83C] group-focus-visible/word:scale-110 group-focus-visible/word:text-[#F5A83C]"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(24px, 5.4vw, 62px)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                {place}
              </span>
              {/* underline sweeps in on hover, echoes the flight-path motif */}
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] origin-center scale-x-0 bg-[#F5A83C] transition-transform duration-300 ease-out group-hover/word:scale-x-100 group-focus-visible/word:scale-x-100 sm:inset-x-8 md:inset-x-10" />
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A83C"
              strokeWidth="1.8"
              className="mx-1 shrink-0 opacity-70 sm:mx-2"
              style={{ width: "clamp(12px, 1.8vw, 18px)", height: "clamp(12px, 1.8vw, 18px)" }}
            >
              <path d="m22 2-7 20-4-9-9-4Z" strokeLinejoin="round" />
              <path d="M22 2 11 13" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}