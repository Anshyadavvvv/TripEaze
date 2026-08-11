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
    <section className="overflow-hidden bg-[#0B1330] py-8">
      <style>{`
        @keyframes tripeaze-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .tripeaze-marquee-track {
          animation: tripeaze-marquee 28s linear infinite;
        }

        .tripeaze-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="tripeaze-marquee-track flex w-max items-center">
        {[...destinations, ...destinations].map((place, i) => (
          <div key={i} className="flex items-center">
            <span
              className="whitespace-nowrap px-8 text-[44px] font-extrabold uppercase tracking-[0.08em] text-white md:px-10 md:text-[60px] lg:text-[72px]"
              style={{
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {place}
            </span>

            <span
              className="mx-2 text-[22px] text-[#F5A83C] md:text-[28px]"
              aria-hidden
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}