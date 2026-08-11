const features = [
  {
    accent: "#F2894E",
    title: "Handpicked stays",
    description:
      "Places we'd actually recommend to our own friends — vetted, never random.",
    icon: (
      <path
        d="M12 3.5l2.47 5.18 5.53.63-4.1 3.86 1.07 5.58L12 15.9l-4.97 2.85 1.07-5.58-4.1-3.86 5.53-.63L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    accent: "#E8637A",
    title: "Curated experiences",
    description: "The best of each destination, minus the tourist traps.",
    icon: (
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    accent: "#3FA8DE",
    title: "Real human support",
    description:
      "Talk to an actual person on call — before, during and after your trip.",
    icon: (
      <path
        d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    accent: "#F5A83C",
    title: "Day-by-day itinerary",
    description:
      "A clear plan for every day — stays, transfers and activities, sorted.",
    icon: (
      <path
        d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    accent: "#0B1330",
    title: "Secure & documented",
    description:
      "Every booking and voucher shared with you, organised in one place.",
    icon: (
      <path
        d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    accent: "#F2894E",
    title: "Transparent INR pricing",
    description: "Clear quotes in rupees. No hidden fees, no surprises.",
    icon: (
      <path
        d="M3 7.5A1.5 1.5 0 0 1 4.5 6h13A1.5 1.5 0 0 1 19 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3 16.5v-9Z M15.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Info3() {
  return (
    <section
      className="relative overflow-hidden bg-[#F6F6FA] py-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Ambient background glow — subtle, brand-tinted, not a flat block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.15] blur-3xl"
        style={{ backgroundColor: "#F2894E" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
        style={{ backgroundColor: "#3FA8DE" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-10">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#F5A83C]">
          Every TripEaze Trip
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-[32px] font-bold leading-tight text-[#0B1330] sm:text-[42px]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Not just bookings — a trip that's fully sorted.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-[28px] border border-[#0B1330]/[0.06] bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-transparent hover:shadow-[0_28px_55px_-16px_rgba(11,19,48,0.22)]"
            >
              {/* Accent bar — sweeps in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: feature.accent }}
              />

              <div
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
                style={{
                  background: `linear-gradient(135deg, ${feature.accent}26, ${feature.accent}0D)`,
                  boxShadow: `0 10px 24px -12px ${feature.accent}66`,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: feature.accent }}
                >
                  {feature.icon}
                </svg>
              </div>

              <h3 className="mt-5 text-[17px] font-bold text-[#0B1330]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#0B1330]/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}