const steps = [
  {
    number: 1,
    accent: "#F2894E",
    accent2: "#7C6FF0", // purple — blended in per request
    title: "Share your details",
    description:
      "Pick a destination and fill a quick form — your name, contact number and travel dates. Takes under 2 minutes.",
    icon: (
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5v-3.5H6.5A2.5 2.5 0 0 1 4 14.5v-8Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    number: 2,
    accent: "#E8637A",
    accent2: "#3FA8DE", // blue — blended in per request
    title: "We get in touch",
    description:
      "Our travel expert calls you within a day to lock the itinerary, stays and transfers — with clear, upfront pricing.",
    icon: (
      <path
        d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    number: 3,
    accent: "#3FA8DE",
    accent2: "#22C55E", // green — blended in per request
    title: "You just travel",
    description:
      "Confirm, pack and go. We handle the bookings and logistics so all you carry is the excitement.",
    icon: (
      <path
        d="M13 4 3 12l4 1.2M13 4l-2.5 15-2.5-6.8M13 4l7 6-6.5 3.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Info2() {
  return (
    <section
      className="bg-white py-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#F5A83C]">
          How TripEaze Works
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-[32px] font-bold leading-tight text-[#0B1330] sm:text-[42px]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Tell us where. We'll handle how.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-y-14 sm:grid-cols-3 sm:gap-x-8">
          {steps.map((step) => (
            <div key={step.number} className="group flex flex-col items-center">
              <div className="relative">
                <div
                  className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-3deg]"
                  style={{
                    background: `linear-gradient(135deg, ${step.accent} 0%, ${step.accent2} 100%)`,
                    boxShadow: `0 12px 26px -10px ${step.accent}80, 0 6px 16px -8px ${step.accent2}66`,
                  }}
                >
                  {/* Glossy highlight for depth */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 rounded-full opacity-40 blur-md"
                    style={{ background: "white" }}
                  />
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative"
                  >
                    {step.icon}
                  </svg>
                </div>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5A83C] text-[12px] font-bold text-[#0B1330] shadow-[0_4px_10px_rgba(245,168,60,0.5)]">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 text-[18px] font-bold text-[#0B1330]">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[280px] text-[14.5px] leading-relaxed text-[#0B1330]/55">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#enquiry"
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-[#0B1330] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#F5A83C] hover:text-[#0B1330]"
        >
          Start Planning
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}