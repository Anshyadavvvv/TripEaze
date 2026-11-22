import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import uttarakhand from "../assets/hero/uttarakhand.jpg";
import ladakh from "../assets/hero/ladakh.jpg";
import kashmir from "../assets/hero/kashmir.jpg";
import parvati from "../assets/hero/parvati.jpg";
import manali from "../assets/hero/manali.jpg";

const AUTOPLAY_MS = 7000;

// Edit place / region / season / stay to match your real packages
const slides = [
  { id: "uttarakhand", place: "Uttarakhand", region: "Garhwal & Kumaon Himalaya", season: "Mar to Jun", stay: "6 days", img: uttarakhand, pos: "52% 50%" },
  { id: "ladakh", place: "Ladakh", region: "Nubra Valley, high-altitude desert", season: "Jun to Sep", stay: "8 days", img: ladakh, pos: "50% 72%" },
  { id: "kashmir", place: "Kashmir", region: "Snow peaks above pine valleys", season: "Apr to Oct", stay: "7 days", img: kashmir, pos: "50% 38%" },
  { id: "parvati", place: "Parvati Valley", region: "Himachal Pradesh, cedar forests", season: "Mar to Jun", stay: "5 days", img: parvati, pos: "50% 50%" },
  { id: "manali", place: "Manali", region: "Himachal Pradesh, snow ridges", season: "Oct to Mar", stay: "5 days", img: manali, pos: "55% 40%" },
];

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef(null);
  const current = slides[active];

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const next = () => setActive((i) => (i + 1) % slides.length);

  // Mouse parallax: only writes two CSS variables, no re-render
  const onMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const pill =
    "rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-medium text-white/90 backdrop-blur-md";

  return (
    <section className="relative bg-[#FAF6EA]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes sf-rise { 0% { transform: translateY(24px); opacity: 0; filter: blur(8px); } 100% { transform: none; opacity: 1; filter: blur(0); } }
        @keyframes sf-swap { 0% { transform: translateY(16px); opacity: 0; } 100% { transform: none; opacity: 1; } }
        @keyframes sf-kenburns { 0% { transform: scale(1.03) translate3d(0,0,0); } 100% { transform: scale(1.14) translate3d(-1.5%, 1%, 0); } }
        @keyframes sf-progress { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        @keyframes sf-spin { to { transform: rotate(360deg); } }
        @keyframes sf-mist { 0% { transform: translateX(-5%); } 100% { transform: translateX(5%); } }
        .sf-rise { animation: sf-rise 1000ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .sf-swap { animation: sf-swap 700ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .sf-kenburns { animation: sf-kenburns 22s ease-in-out infinite alternate; }
        .sf-progress { transform-origin: left; animation: sf-progress linear both; }
        .sf-spin { animation: sf-spin 30s linear infinite; }
        .sf-mist { animation: sf-mist 24s ease-in-out infinite alternate; }
        .sf-serif { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; }
        .sf-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .sf-rise, .sf-swap, .sf-kenburns, .sf-progress, .sf-spin, .sf-mist { animation: none !important; }
        }
      `}</style>

      <Navbar />

      <div className="mx-auto max-w-[1500px] px-4 pt-24 pb-6 sm:px-8 sm:pt-28 sm:pb-10 lg:px-12 lg:pt-32 lg:pb-14">
        <div
          ref={stageRef}
          onMouseMove={onMove}
          className="relative isolate flex min-h-[88vh] flex-col justify-between overflow-hidden rounded-[28px] bg-[#0B1330] shadow-[0_40px_90px_-24px_rgba(11,19,48,0.6)] ring-1 ring-black/10 sm:rounded-[36px] lg:min-h-[max(90vh,800px)]"
        >
          {/* Layer 1: destination photos, crossfade + slow drift, mouse parallax */}
          <div
            className="absolute -inset-6 -z-30 transition-transform duration-700 ease-out"
            style={{ transform: "translate3d(calc(var(--px,0) * -18px), calc(var(--py,0) * -12px), 0)" }}
          >
            {slides.map((s, i) => (
              <img
                key={s.id}
                src={s.img}
                alt={i === active ? `${s.place}: ${s.region}` : ""}
                aria-hidden={i !== active}
                className="sf-kenburns absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms]"
                style={{
                  objectPosition: s.pos,
                  opacity: i === active ? 1 : 0,
                  animationPlayState: i === active ? "running" : "paused",
                }}
              />
            ))}
          </div>

          {/* Layer 2: scrims, drifting mist, grain */}
          <div
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,19,48,0.68) 0%, rgba(11,19,48,0.2) 32%, rgba(11,19,48,0.08) 50%, rgba(11,19,48,0.6) 74%, rgba(11,19,48,0.92) 100%)",
            }}
          />
          <div
            className="absolute inset-0 -z-20"
            style={{ background: "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(11,19,48,0.55) 100%)" }}
          />
          <div
            className="sf-mist pointer-events-none absolute -inset-x-[20%] bottom-[22%] -z-10 h-[38%] opacity-70"
            style={{
              filter: "blur(34px)",
              background:
                "radial-gradient(50% 50% at 28% 50%, rgba(255,255,255,0.18), transparent 70%), radial-gradient(40% 45% at 74% 60%, rgba(255,214,90,0.12), transparent 70%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] mix-blend-overlay" style={{ backgroundImage: grain }} />

          {/* Layer 3: flight path with a gliding gold plane */}
          <svg
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden
          >
            <path
              id="sf-flight"
              d="M -30 470 C 230 250, 520 170, 760 250 S 1000 330, 1040 240"
              stroke="#FFD65A"
              strokeOpacity="0.75"
              strokeWidth="1.4"
              strokeDasharray="2 9"
              strokeLinecap="round"
            />
            {!reduceMotion && (
              <g>
                <circle r="16" fill="#FFD65A" opacity="0.2" />
                <path d="M11 0 L-9 -8 L-4 0 L-9 8 Z" fill="#FFD65A" />
                <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="1.2s">
                  <mpath href="#sf-flight" />
                </animateMotion>
              </g>
            )}
          </svg>

          {/* Rotating badge */}
          <a
            href="/packages"
            aria-label="Browse all packages"
            className="sf-rise group absolute right-8 top-[34%] z-10 hidden h-32 w-32 items-center justify-center lg:flex xl:right-14"
            style={{ animationDelay: "900ms" }}
          >
            <svg viewBox="0 0 120 120" className="sf-spin absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id="sf-ring" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
              </defs>
              <text fill="rgba(255,255,255,0.9)" fontSize="10" letterSpacing="1.7" fontWeight="500">
                <textPath href="#sf-ring">handpicked journeys across india  •  handpicked trips  •</textPath>
              </text>
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD65A] text-[22px] text-[#0B1330] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
              ↗
            </span>
          </a>

          {/* Top: headline + actions */}
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-12 text-center sm:px-10 sm:pt-16 lg:pt-20">
            <h1
              className="sf-rise text-[38px] leading-[1.04] font-bold tracking-tight text-white sm:text-[60px] lg:text-[82px]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                animationDelay: "160ms",
                textShadow: "0 2px 30px rgba(11,19,48,0.45)",
              }}
            >
              Escapes that turn into
              <br />
              <span className="sf-serif text-[1.1em] font-normal tracking-normal text-[#FFD65A]">stories you'll retell</span>
            </h1>

            <div className="sf-rise mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "480ms" }}>
              <a
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5A83C] px-7 py-3.5 text-[15px] font-semibold text-[#0B1330] shadow-[0_10px_30px_-8px_rgba(245,168,60,0.7)] transition duration-300 hover:scale-[1.03] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore packages <span aria-hidden>→</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-[#004741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Plan my trip
              </a>
            </div>
          </div>

          {/* Bottom: live destination info + selector cards */}
          <div className="sf-rise relative z-10 mx-auto mt-10 grid w-full max-w-[1300px] items-end gap-6 px-5 pb-6 sm:px-8 sm:pb-8 xl:grid-cols-[340px_1fr] xl:gap-10" style={{ animationDelay: "700ms" }}>
            <div key={current.id} className="sf-swap text-left" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="flex items-center gap-3 text-white tabular-nums">
                <span className="text-[13px] font-semibold">{String(active + 1).padStart(2, "0")}</span>
                <span className="h-px w-12 bg-white/40" />
                <span className="text-[13px] text-white/60">{String(slides.length).padStart(2, "0")}</span>
              </div>
              <h2 className="sf-serif mt-2 text-[48px] leading-none text-white sm:text-[64px]">{current.place}</h2>
              <p className="mt-2 text-[14px] text-white/75">{current.region}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={pill}>Best in {current.season}</span>
                <span className={pill}>{current.stay} trip</span>
              </div>
            </div>

            <div
              className="sf-scroll -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 pt-3 sm:mx-0 sm:px-0 xl:justify-end"
              style={{ scrollbarWidth: "none" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    aria-label={`Show ${s.place}`}
                    onClick={() => setActive(i)}
                    className={`group relative h-[150px] w-[116px] shrink-0 overflow-hidden rounded-2xl border text-left transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-[178px] sm:w-[132px] ${
                      on
                        ? "-translate-y-2 border-[#FFD65A] shadow-[0_22px_40px_-14px_rgba(255,214,90,0.4)]"
                        : "border-white/20 hover:-translate-y-1 hover:border-white/60"
                    }`}
                  >
                    <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: s.pos }} />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0B1330]/90 via-[#0B1330]/10 to-transparent" />
                    <span className="absolute inset-x-3 bottom-4 block">
                      <span className="block text-[14px] font-semibold leading-tight text-white">{s.place}</span>
                      <span className="mt-0.5 block text-[11.5px] text-white/70">{s.season}</span>
                    </span>
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
                        <span
                          key={active}
                          onAnimationEnd={next}
                          className="sf-progress block h-full w-full bg-[#FFD65A]"
                          style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}