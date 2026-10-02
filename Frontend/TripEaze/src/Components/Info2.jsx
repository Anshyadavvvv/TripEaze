"use client";

/**
 * Safiri — "How Safiri works" journey section (Info2)
 *
 * Brand (from the Safiri logo): green #004741 · cream #F4E7C7 · orange #FF6400
 * Fonts:  Poppins (headline, numerals, titles — matches the logo)  +  Plus Jakarta Sans (body)
 *         Make sure Poppins 700/800 is loaded alongside your existing fonts.
 *
 * PHOTOS: add real photography paths below. When empty, built-in illustrated
 * visuals are shown so nothing looks broken.
 */
import { useEffect, useRef, useState } from "react";

const PHOTOS = {
  plan: "", // optional map / destination crop for step 01   (landscape, ~800x300)
  expert: "", // optional portrait of a travel expert (square, ~200x200)
  trip: "", // large destination photo for step 03          (landscape, ~900x450)
};

const FONT_DISPLAY = "'Poppins', 'Bricolage Grotesque', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const TEAL = "#004741";
const TEAL_LIGHT = "#0A5A52";
const CREAM = "#F4E7C7";
const ORANGE = "#FF6400";

const STEPS = [
  {
    n: "01",
    title: "Share your details",
    text: "Pick a destination and fill a quick form — your name, contact number and travel dates. Takes under 2 minutes.",
  },
  {
    n: "02",
    title: "We get in touch",
    text: "Our travel expert calls you within a day to lock the itinerary, stays and transfers — with clear, upfront pricing.",
  },
  {
    n: "03",
    title: "You just travel",
    text: "Confirm, pack and go. We handle the bookings and logistics so all you carry is the excitement.",
  },
];

/* Route markers on the desktop stage (x in ‰ of width, y in px). */
const POINTS = [
  { x: 45, y: 450, label: "Plan", stem: [400, 50], below: false },
  { x: 375, y: 510, label: "Connect", stem: [510, 50], below: true },
  { x: 695, y: 440, label: "Travel", stem: [400, 40], below: false },
];
const MARKER_AT = [0.06, 0.4, 0.74]; // route progress at which each marker lights up
const BLOCK_AT = [0.02, 0.34, 0.68]; // …and each chapter fades in

const ROUTE =
  "M-10 530 C20 530 20 450 45 450 C180 450 250 510 375 510 C500 510 570 440 695 440 C820 440 900 380 1010 360";

/* ------------------------------------------------------------------ */
/* Scroll progress (0 → 1) for the stage                               */
/* ------------------------------------------------------------------ */
function useJourneyProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const v = (start - r.top) / (r.height * 0.85);
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/* ------------------------------------------------------------------ */
/* Icons (thin line, one grid)                                         */
/* ------------------------------------------------------------------ */
const ICONS = {
  headset: (
    <>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <path d="M5 13h2.2v4.5h-.7A1.5 1.5 0 0 1 5 16v-3Z" />
      <path d="M19 13h-2.2v4.5h.7a1.5 1.5 0 0 0 1.5-1.5v-3Z" />
      <path d="M17 17.5c0 1.4-1.6 2.5-4 2.5h-1" />
    </>
  ),
  phone: (
    <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 16 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

function Icon({ name, size = 20, className = "", stroke = 1.4 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */
function PlanVisual() {
  return (
    <div className="relative h-[150px] lg:h-[140px]">
      <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-[#F4E7C7]/15 bg-[#0A5A52]">
        <div className="sj-zoom absolute inset-0">
          {PHOTOS.plan ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PHOTOS.plan} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 150"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <pattern id="sj-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke={CREAM} strokeOpacity=".07" />
                </pattern>
              </defs>
              <rect width="400" height="150" fill="url(#sj-grid)" />
              <g fill="none" stroke={CREAM} strokeOpacity=".16" transform="rotate(-14 260 60)">
                {[26, 48, 70, 94, 120].map((r) => (
                  <ellipse key={r} cx="260" cy="60" rx={r * 1.6} ry={r} />
                ))}
              </g>
              <path
                d="M70 108 C130 70 170 118 230 74 S320 40 350 38"
                fill="none"
                stroke={ORANGE}
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
              <circle cx="70" cy="108" r="5" fill={ORANGE} stroke={CREAM} strokeWidth="2" />
              <circle cx="350" cy="38" r="5" fill={ORANGE} stroke={CREAM} strokeWidth="2" />
              <g fill={TEAL} fontSize="11" fontWeight="600" style={{ fontFamily: FONT_BODY }}>
                <text x="82" y="126">Manali</text>
                <text x="338" y="30" textAnchor="end">Kaza</text>
              </g>
              <text
                x="12"
                y="140"
                fill={TEAL}
                fillOpacity=".6"
                fontSize="9"
                style={{ fontFamily: FONT_BODY }}
              >
                32.24° N, 77.19° E
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* the "form" the traveller fills in */}
      <div className="sj-lift absolute -bottom-5 right-3 w-[176px] rounded-[12px] bg-[#F4E7C7] p-3 text-[#004741] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.55)]">
        {[
          ["Name", "w-3/5"],
          ["Contact", "w-4/5"],
          ["Dates", "w-2/5"],
        ].map(([label, w], i) => (
          <div key={label} className={i ? "mt-2" : ""}>
            <p className="text-[10px] font-semibold text-[#004741]/60">{label}</p>
            <div className="mt-1 h-[3px] w-full rounded-full bg-[#004741]/15">
              <div className={`h-full rounded-full bg-[#004741] ${w}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallVisual() {
  return (
    <div className="sj-lift relative mt-6 rounded-[14px] bg-[#F4E7C7] p-4 text-[#004741] shadow-[0_22px_40px_-18px_rgba(0,0,0,0.6)] lg:ml-10">
      <div className="flex items-center gap-3">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#004741] text-[#F4E7C7]">
          {PHOTOS.expert ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PHOTOS.expert} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon name="headset" size={22} />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-tight">Your travel expert</p>
          <p className="mt-0.5 text-[12px] text-[#004741]/65">Calls you within a day</p>
        </div>
        <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6400] text-[#004741]">
          <Icon name="phone" size={17} stroke={1.6} />
        </span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {["Itinerary", "Stays", "Transfers", "Upfront pricing"].map((c) => (
          <li
            key={c}
            className="rounded-full border border-[#004741]/25 px-2.5 py-1 text-[11px] font-medium"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TripScene() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 440 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sj-trip-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F5F57" />
          <stop offset=".55" stopColor="#E3D3AC" />
          <stop offset="1" stopColor="#F4E7C7" />
        </linearGradient>
        <filter id="sj-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="sj-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="440" height="220" fill="url(#sj-trip-sky)" />
      <circle cx="300" cy="128" r="46" fill={ORANGE} opacity=".4" filter="url(#sj-blur)" />
      <circle cx="300" cy="128" r="22" fill={ORANGE} />
      <path d="M0 140 L60 100 L110 128 L190 70 L260 125 L330 90 L440 140 V220 H0Z" fill="#7FB0A4" opacity=".85" />
      <path d="M0 170 L80 130 L150 160 L240 112 L330 160 L440 128 V220 H0Z" fill="#2E8074" />
      <path d="M0 195 L100 160 L200 190 L300 150 L440 185 V220 H0Z" fill="#0A5A52" />
      <path d="M0 208 C120 196 300 200 440 206 V220 H0Z" fill="#00251F" />
      <path
        d="M170 220 L290 220 C262 200 244 186 238 170 L226 170 C224 186 210 200 170 220Z"
        fill={CREAM}
        opacity=".9"
      />
      <path
        d="M230 220 C232 200 234 186 232 170"
        fill="none"
        stroke={ORANGE}
        strokeWidth="2"
        strokeDasharray="8 7"
      />
      <rect width="440" height="220" filter="url(#sj-grain)" opacity=".08" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}

function TripVisual() {
  return (
    <div className="relative">
      <div className="relative h-[210px] overflow-hidden rounded-[14px] border border-[#F4E7C7]/15 bg-[#0A5A52] lg:h-[220px]">
        <div className="sj-zoom absolute inset-0">
          {PHOTOS.trip ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PHOTOS.trip} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <TripScene />
          )}
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#004741]/80 px-3 py-1.5 text-[11px] font-medium text-[#004741] backdrop-blur-sm">
          <Icon name="pin" size={13} className="text-[#FF6400]" />
          Kaza
          <span aria-hidden="true" className="h-3 w-px bg-[#F4E7C7]/30" />
          <span className="tabular-nums text-[#004741]/75">32.23° N, 78.07° E</span>
        </div>
      </div>
      {/* ticket that overlaps the photo edge */}
      <div className="sj-lift absolute -right-2 top-14 flex items-center gap-2.5 rounded-[10px] bg-[#F4E7C7] py-2 pl-3 pr-4 text-[#004741] shadow-[0_16px_28px_-14px_rgba(0,0,0,0.6)] sm:-right-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6400] text-[#004741]">
          <Icon name="check" size={14} stroke={2} />
        </span>
        <span className="text-[12px] font-bold">Confirmed</span>
        <span aria-hidden="true" className="ml-1 h-6 border-l border-dashed border-[#004741]/30" />
        <span className="text-[10px] font-semibold tabular-nums text-[#004741]/60">SF-0426</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step text                                                           */
/* ------------------------------------------------------------------ */
function Numeral({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block text-[64px] font-extrabold leading-[0.85] tracking-[-0.04em] text-[#004741] lg:text-[76px] ${className}`}
      style={{ fontFamily: FONT_DISPLAY }}
    >
      {children}
    </span>
  );
}

function StepTitle({ children }) {
  return (
    <h3
      className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-[#004741] lg:text-[30px]"
      style={{ fontFamily: FONT_DISPLAY }}
    >
      {children}
    </h3>
  );
}

function StepText({ children }) {
  return (
    <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-[#004741]/75">{children}</p>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Info2() {
  const stageRef = useRef(null);
  const p = useJourneyProgress(stageRef);
  const activeMarker = MARKER_AT.reduce((a, t, i) => (p >= t ? i : a), -1);

  const mobilePins = ["top-1", "top-1", "top-1"];

  return (
    <section
      className="relative overflow-hidden bg-[#FAF6EA] py-20 text-[#004741] sm:py-28 lg:py-32"
      style={{ fontFamily: FONT_BODY }}
    >
      <style>{`
        .sj-lift{transition:transform .5s cubic-bezier(.22,1,.36,1);}
        .group:hover .sj-lift{transform:translateY(-5px);}
        .sj-zoom{transition:transform 1.4s cubic-bezier(.22,1,.36,1);}
        .group:hover .sj-zoom{transform:scale(1.05);}

        .sj-pin{position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:9999px;background:${ORANGE};border:4px solid ${TEAL};box-shadow:0 0 0 1px rgba(244,231,199,.4);opacity:0;transform:scale(.4);transition:opacity .5s ease,transform .6s cubic-bezier(.34,1.56,.64,1);}
        .sj-pin.is-on{opacity:1;transform:scale(1);}
        .sj-pin::after{content:"";position:absolute;inset:-10px;border-radius:9999px;border:1px solid ${ORANGE};opacity:0;}
        .sj-pin.is-active::after{animation:sj-pulse 3s ease-out infinite;}
        @keyframes sj-pulse{0%{transform:scale(.6);opacity:.7}100%{transform:scale(1.8);opacity:0}}
        .sj-tag{position:absolute;left:0;transform:translateX(-50%);white-space:nowrap;font-size:12px;font-weight:700;letter-spacing:.02em;color:${TEAL};opacity:0;transition:opacity .5s ease .1s;}
        .sj-tag.is-on{opacity:.9;}

        .sj-draw{stroke-dasharray:1 2;transition:stroke-dashoffset .25s ease-out;}

        .sj-cta .sj-cta-disc{transition:transform .4s cubic-bezier(.22,1,.36,1),background-color .3s;}
        .sj-cta .sj-cta-arrow{transition:transform .4s cubic-bezier(.22,1,.36,1);}
        .sj-cta:hover .sj-cta-disc{transform:scale(1.06);}
        .sj-cta:hover .sj-cta-arrow{transform:translateX(4px);}

        @media (min-width:1024px){
          .sj-rise{opacity:0;transform:translateY(20px);transition:opacity .8s ease,transform .9s cubic-bezier(.22,1,.36,1);}
          .sj-rise[data-on="true"]{opacity:1;transform:none;}
        }
        @media (prefers-reduced-motion:reduce){
          .sj-rise,.sj-pin,.sj-tag,.sj-draw,.sj-zoom,.sj-lift{transition:none !important;}
          .sj-pin.is-active::after{animation:none;}
          .group:hover .sj-zoom,.group:hover .sj-lift{transform:none;}
        }
      `}</style>

      {/* contour texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[620px] w-[900px] opacity-[0.09]"
        viewBox="0 0 900 620"
        fill="none"
        stroke={CREAM}
      >
        <g transform="rotate(-16 520 280)">
          {[60, 100, 140, 185, 232, 282, 336].map((r) => (
            <ellipse key={r} cx="520" cy="280" rx={r * 1.55} ry={r} />
          ))}
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10">
        {/* ---------- Header ---------- */}
        <header className="max-w-5xl">
          <p className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.2em] text-[#004741]">
            <span aria-hidden="true" className="h-px w-9 bg-[#FF6400]" />
            HOW SAFIRI WORKS
          </p>
          <h2
            className="mt-6 text-[46px] font-extrabold leading-[0.96] tracking-[-0.035em] text-[#004741] sm:text-[76px] lg:text-[108px]"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Tell us where<span className="text-[#004741]">.</span>
            <br />
            {"We'll handle how"}
            <span className="text-[#004741]">.</span>
          </h2>
        </header>

        {/* ---------- Journey ---------- */}
        <div ref={stageRef} className="relative mt-16 lg:mt-20 lg:h-[920px]">
          {/* desktop route */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1000 920"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={ROUTE} fill="none" stroke={CREAM} strokeOpacity=".28" strokeWidth="1.5" strokeDasharray="2 7" />
            <path
              d={ROUTE}
              fill="none"
              stroke={ORANGE}
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
              className="sj-draw"
              style={{ strokeDashoffset: 1 - p }}
            />
          </svg>

          {/* desktop stems + markers */}
          {POINTS.map((pt, i) => (
            <div key={pt.label} className="hidden lg:block" aria-hidden="true">
              <span
                className="absolute z-10 w-px bg-[#F4E7C7]/25"
                style={{ left: `${pt.x / 10}%`, top: pt.stem[0], height: pt.stem[1] }}
              />
              <div className="absolute z-20" style={{ left: `${pt.x / 10}%`, top: pt.y }}>
                <span
                  className={`sj-pin ${p >= MARKER_AT[i] ? "is-on" : ""} ${activeMarker === i ? "is-active" : ""}`}
                />
                <span
                  className={`sj-tag ${p >= MARKER_AT[i] ? "is-on" : ""}`}
                  style={{ top: pt.below ? -36 : 18 }}
                >
                  {pt.label}
                </span>
              </div>
            </div>
          ))}

          {/* mobile route */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[19px] top-2 w-px bg-[#F4E7C7]/20 lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-[18px] top-2 w-[3px] rounded-full bg-[#FF6400] lg:hidden"
            style={{ height: `calc(${Math.round(p * 100)}% - 16px)` }}
          />

          <ol className="m-0 list-none p-0">
            {/* 01 — PLAN */}
            <li
              data-on={p >= BLOCK_AT[0]}
              className="sj-rise group relative mb-16 pl-12 lg:absolute lg:left-[3%] lg:top-0 lg:z-10 lg:mb-0 lg:flex lg:h-[400px] lg:w-[30%] lg:flex-col lg:justify-end lg:pl-0"
            >
              <MobilePin on={p >= MARKER_AT[0]} className={mobilePins[0]} />
              <PlanVisual />
              <Numeral className="relative z-10 -mt-8 pl-1">{STEPS[0].n}</Numeral>
              <div className="mt-2">
                <StepTitle>{STEPS[0].title}</StepTitle>
                <StepText>{STEPS[0].text}</StepText>
              </div>
            </li>

            {/* 02 — CONNECT */}
            <li
              data-on={p >= BLOCK_AT[1]}
              className="sj-rise group relative mb-16 pl-12 lg:absolute lg:left-[36%] lg:top-[560px] lg:z-10 lg:mb-0 lg:w-[33%] lg:pl-0"
            >
              <MobilePin on={p >= MARKER_AT[1]} className={mobilePins[1]} />
              <div className="flex items-end gap-4">
                <Numeral>{STEPS[1].n}</Numeral>
                <div className="pb-1">
                  <StepTitle>{STEPS[1].title}</StepTitle>
                </div>
              </div>
              <StepText>{STEPS[1].text}</StepText>
              <CallVisual />
            </li>

            {/* 03 — TRAVEL */}
            <li
              data-on={p >= BLOCK_AT[2]}
              className="sj-rise group relative pl-12 lg:absolute lg:left-[68%] lg:top-0 lg:z-10 lg:flex lg:h-[400px] lg:w-[30%] lg:flex-col lg:justify-end lg:pl-0"
            >
              <MobilePin on={p >= MARKER_AT[2]} className={mobilePins[2]} />
              <TripVisual />
              <Numeral className="relative z-10 -mt-8 pl-1">{STEPS[2].n}</Numeral>
              <div className="mt-2">
                <StepTitle>{STEPS[2].title}</StepTitle>
                <StepText>{STEPS[2].text}</StepText>
              </div>
            </li>
          </ol>
        </div>

        {/* ---------- Closing ---------- */}
        <div className="mt-16 flex flex-col gap-8 border-t border-[#F4E7C7]/15 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="max-w-md text-[17px] leading-relaxed text-[#004741]/75">
            It takes under 2 minutes. Share your details and we take it from there.
          </p>
          <a
            href="/packages"
            className="sj-cta inline-flex items-center gap-5 self-start rounded-full bg-[#F4E7C7] py-2 pl-8 pr-2 text-[17px] font-bold text-[#004741] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6400]"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Start Planning
            <span className="sj-cta-disc flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#FF6400] text-[#004741]">
              <Icon name="arrow" size={22} stroke={2} className="sj-cta-arrow" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* mobile-only marker that sits on the vertical route */
function MobilePin({ on, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute left-[11px] ${className} h-4 w-4 rounded-full border-[3px] border-[#004741] shadow-[0_0_0_1px_rgba(244,231,199,0.4)] transition-colors duration-500 lg:hidden ${
        on ? "bg-[#FF6400]" : "bg-[#F4E7C7]/40"
      }`}
    />
  );
}