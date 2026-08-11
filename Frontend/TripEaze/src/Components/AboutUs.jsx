import React, { useEffect, useRef, useState } from "react";

// Photo for the right side. A portrait-ish photo of someone overlooking a
// landscape works best.
import aboutImage from "../assets/about2.png";
import Navbar from "../Components/Navbar";

const features = [
  {
    label: "Authentic Experiences",
    color: "#0F8F86",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m14.5 9.5-2 5-3-1 2-5 3 1Z" />
      </>
    ),
  },
  {
    label: "Carefully Curated Trips",
    color: "#F5A83C",
    icon: <path d="m8 17 4-9 4 9M6 17h12" />,
  },
  {
    label: "Passion for People & Places",
    color: "#F2704B",
    icon: <path d="M12 20.5s-7-4.35-7-9.5a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 19 11c0 5.15-7 9.5-7 9.5Z" />,
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

export default function AboutUs() {
  const [ref, visible] = useReveal();

  return (
    <section className="te-motion relative overflow-hidden bg-[#FAF6EF] py-20 lg:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes te-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .te-bob { animation: te-bob 4s ease-in-out infinite; }
        .te-fade-up { opacity: 0; transform: translateY(24px); transition: opacity 700ms ease, transform 700ms ease; }
        .te-fade-up.is-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .te-motion, .te-motion * { animation: none !important; transition: opacity 300ms ease !important; }
        }
      `}</style>
      <Navbar />
      {/* ---- Flat Memphis-style background shapes ---- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#F5A83C]/70" />
        <div className="absolute top-8 right-[18%] h-72 w-72 rounded-full bg-[#FCEFD8]" />
        <div className="absolute top-1/3 right-[6%] h-[26rem] w-[26rem] rounded-full bg-[#2DD4BF]/15" />
        <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-[#0B1330]" />
        <div className="absolute bottom-[8%] right-[26%] h-40 w-40 rounded-full bg-[#F2704B]/60" />
        <div className="absolute bottom-0 -left-6 h-32 w-32 rounded-full bg-[#2DD4BF]/25" />

        {/* dot grid, top center */}
        <div className="absolute top-3 left-[34%] grid grid-cols-5 gap-2 opacity-40">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
          ))}
        </div>
        {/* dot grid, upper right */}
        <div className="absolute top-14 right-[10%] grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#0B1330]/70" />
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8"
      >
        {/* ---- Left: copy ---- */}
        <div className={`te-body te-fade-up ${visible ? "is-visible" : ""}`}>
          <svg width="60" height="18" viewBox="0 0 60 18" fill="none" stroke="#0F8F86" strokeWidth="2.2">
            <path d="M1 9c4-6 8 6 12 0s8-6 12 0 8-6 12 0 8-6 12 0" />
          </svg>

          <h2 className="te-display mt-4 text-5xl font-extrabold tracking-tight text-[#0B1330] sm:text-6xl">
            About <span className="text-[#0F8F86]">Us</span>
          </h2>
          <span className="mt-4 block h-1.5 w-16 rounded-full bg-[#F2704B]" />

          <h3 className="te-display mt-6 text-xl font-bold uppercase tracking-wide text-[#0B1330] sm:text-2xl">
            The People Behind Your <span className="text-[#F2704B]">Journeys</span>
          </h3>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#3F4B63]">
            We're a team of passionate travellers, planners, and dreamers who
            believe every trip has the power to{" "}
            <span className="font-semibold text-[#F2704B]">transform</span> you.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#3F4B63]">
            From hidden gems to iconic destinations, we design journeys that
            connect you with places, people, and memories you'll carry for
            life.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap gap-8">
            {features.map((f) => (
              <div key={f.label} className="w-32">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-8px_rgba(11,19,48,0.35)]"
                  style={{ background: f.color }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {f.icon}
                  </svg>
                </span>
                <p className="te-display mt-3 text-sm font-bold leading-snug text-[#0B1330]">
                  {f.label}
                </p>
                <span className="mt-2 block h-0.5 w-8 rounded-full" style={{ background: f.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: photo, clean square/rectangle ---- */}
        <div
          className={`te-fade-up relative mx-auto w-full max-w-sm lg:max-w-md ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-20px_rgba(11,19,48,0.35)]">
            <img src={aboutImage} alt="A TripEaze traveller overlooking a valley" className="h-full w-full object-cover" />
          </div>

          {/* floating flight-path badge */}
          <div className="te-bob absolute -top-6 right-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#0F8F86] text-white shadow-[0_16px_30px_-10px_rgba(15,143,134,0.6)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
          </div>
          <svg className="absolute -top-16 right-16 h-14 w-10 opacity-60" viewBox="0 0 40 56" fill="none">
            <path d="M2 54C2 30 30 30 30 4" stroke="#0B1330" strokeWidth="1.5" strokeDasharray="4 5" />
          </svg>

          {/* coral dot cluster, bottom-left of image */}
          <div className="absolute -bottom-4 -left-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-[#F2704B]" />
            ))}
          </div>

          {/* gold plus mark */}
          <svg className="absolute bottom-10 -right-3 h-5 w-5 text-[#F5A83C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" />
          </svg>

          {/* concentric topographic rings */}
          <svg className="absolute -bottom-10 -right-8 h-24 w-24 opacity-30" viewBox="0 0 100 100" fill="none" stroke="#F8FAFC" strokeWidth="1.5">
            <circle cx="70" cy="70" r="12" /><circle cx="70" cy="70" r="22" /><circle cx="70" cy="70" r="32" />
          </svg>
        </div>
      </div>
    </section>
  );
}