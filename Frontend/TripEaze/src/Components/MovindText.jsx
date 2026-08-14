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
    <section className="relative overflow-hidden bg-[#0B1330] py-6 sm:py-8">
      <style>{`
        @keyframes tripeaze-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .tripeaze-marquee-track {
          animation: tripeaze-marquee 32s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .tripeaze-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .tripeaze-marquee-track {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tripeaze-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Edge fade for a polished finish */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24"
        style={{ background: "linear-gradient(to right, #0B1330, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24"
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
              className="whitespace-nowrap px-6 font-extrabold uppercase text-white sm:px-8 md:px-10"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(26px, 6vw, 72px)",
                letterSpacing: "0.06em",
              }}
            >
              {place}
            </span>

            <span
              className="mx-1 shrink-0 text-[#F5A83C] sm:mx-2"
              style={{ fontSize: "clamp(14px, 2.5vw, 28px)" }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}