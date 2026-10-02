/**
 * Safiri — "Every Safiri trip" features section (Info3)
 * Asymmetric bento: one dominant destination visual + five supporting blocks.
 *
 * Theme (from the Safiri logo): green #004741, cream #F4E7C7, orange #FF6400.
 *
 * Stack: React + Tailwind (same as before). Fonts: Bricolage Grotesque + Plus Jakarta Sans.
 *
 * PHOTOS: drop real photography paths below. When empty, a built-in illustrated
 * landscape is shown, so the section never looks broken.
 */
const PHOTOS = {
  hero: "", // e.g. "/images/safiri/spiti-road.jpg"  (landscape, ~1600x1400, subject in the middle)
  stay: "", // e.g. "/images/safiri/stay.jpg"        (landscape, ~800x400)
};

const FONT_DISPLAY = "'Bricolage Grotesque', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const GREEN = "#004741";
const ORANGE = "#FF6400";

const COPY = {
  stays: {
    title: "Handpicked stays",
    text: "Places we'd actually recommend to our own friends — vetted, never random.",
  },
  experiences: {
    title: "Curated experiences",
    text: "The best of each destination, minus the tourist traps.",
  },
  support: {
    title: "Real human support",
    text: "Talk to an actual person on call — before, during and after your trip.",
  },
  itinerary: {
    title: "Day-by-day itinerary",
    text: "A clear plan for every day — stays, transfers and activities, sorted.",
  },
  secure: {
    title: "Secure & documented",
    text: "Every booking and voucher shared with you, organised in one place.",
  },
  pricing: {
    title: "Transparent INR pricing",
    text: "Clear quotes in rupees. No hidden fees, no surprises.",
  },
};

/* ------------------------------------------------------------------ */
/* Thin-line icon set (one stroke weight, one grid)                    */
/* ------------------------------------------------------------------ */
const ICONS = {
  stay: (
    <>
      <path d="M4 20V9.5L12 4l8 5.5V20" />
      <path d="M9 20v-5.5h6V20" />
      <path d="M3 20h18" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  headset: (
    <>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <path d="M5 13h2.2v4.5h-.7A1.5 1.5 0 0 1 5 16v-3Z" />
      <path d="M19 13h-2.2v4.5h.7a1.5 1.5 0 0 0 1.5-1.5v-3Z" />
      <path d="M17 17.5c0 1.4-1.6 2.5-4 2.5h-1" />
    </>
  ),
  route: (
    <>
      <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M18 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M8 17h6.5a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6H16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V6l7-3Z" />
      <path d="M9 12l2.2 2.2L15.2 10" />
    </>
  ),
  rupee: (
    <>
      <path d="M7 5.5h10M7 9.5h10" />
      <path d="M7.5 5.5h2c3 0 4.5 1.4 4.5 4s-1.7 4-4.5 4H7.5l7 5.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 16 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
};

function Icon({ name, size = 22, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
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
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
const CARD =
  "group relative rounded-[20px] border border-[#004741]/[0.07] shadow-[0_1px_2px_rgba(0,71,65,0.04),0_18px_40px_-26px_rgba(0,71,65,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,71,65,0.05),0_30px_60px_-26px_rgba(0,71,65,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function Head({ icon, title, text, dark = false }) {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <Icon name={icon} className={dark ? "text-[#FF6400]" : "text-[#FF6400]"} />
        <h3
          className={`text-[18px] font-bold leading-tight ${dark ? "text-[#F4E7C7]" : "text-[#004741]"}`}
        >
          {title}
        </h3>
      </div>
      <p
        className={`mt-2.5 max-w-[34ch] text-[14px] leading-relaxed ${
          dark ? "text-[#F4E7C7]/70" : "text-[#004741]/65"
        }`}
      >
        {text}
      </p>
    </>
  );
}

/* Route pin (SVG). `n` picks the hover lift distance. */
function Pin({ x, y, n, label, anchor = "start", color = ORANGE, hollow = false }) {
  const dx = anchor === "start" ? 16 : -16;
  return (
    <g className={`sf-pin sf-pin-${n}`}>
      {!hollow && <circle cx={x} cy={y} r="13" fill={color} className="sf-ring" />}
      <circle
        cx={x}
        cy={y}
        r="7"
        fill={hollow ? "none" : color}
        stroke={hollow ? "#F4E7C7" : "#F4E7C7"}
        strokeOpacity={hollow ? 0.5 : 1}
        strokeWidth="2.5"
        strokeDasharray={hollow ? "3 3" : undefined}
      />
      {label && (
        <text
          x={x + dx}
          y={y + 5}
          textAnchor={anchor}
          fill="#F4E7C7"
          fontSize="14"
          fontWeight="600"
          stroke={GREEN}
          strokeOpacity=".35"
          strokeWidth="3"
          paintOrder="stroke"
          style={{ fontFamily: FONT_BODY }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Illustrated scenes (used until real photography is supplied)        */
/* ------------------------------------------------------------------ */
function HeroScene() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00241F" />
          <stop offset=".45" stopColor="#0A5A52" />
          <stop offset=".72" stopColor="#F0B889" />
          <stop offset="1" stopColor="#FF6400" />
        </linearGradient>
        <filter id="sf-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id="sf-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="800" height="700" fill="url(#sf-sky)" />
      <g fill="#F4E7C7" opacity=".7">
        <circle cx="120" cy="70" r="1.4" />
        <circle cx="210" cy="140" r="1" />
        <circle cx="330" cy="50" r="1.6" />
        <circle cx="540" cy="40" r="1.2" />
        <circle cx="600" cy="90" r="1" />
        <circle cx="700" cy="160" r="1.4" />
        <circle cx="60" cy="190" r="1" />
      </g>
      <circle cx="470" cy="300" r="90" fill="#FFC08A" opacity=".55" filter="url(#sf-blur)" />
      <circle cx="470" cy="300" r="34" fill="#F4E7C7" />
      <path
        d="M0 360 L80 300 L150 340 L240 270 L330 330 L420 250 L520 330 L610 280 L700 340 L800 290 V700 H0Z"
        fill="#7FB0A4"
        opacity=".6"
      />
      <path
        d="M0 430 L90 370 L170 420 L280 340 L380 410 L470 350 L580 430 L690 360 L800 420 V700 H0Z"
        fill="#17675D"
      />
      <path
        d="M0 520 L120 450 L220 500 L340 430 L450 510 L560 460 L680 520 L800 470 V700 H0Z"
        fill="#003A35"
      />
      <path d="M0 600 C150 560 300 590 420 570 S700 560 800 590 V700 H0Z" fill="#00221F" />
      {/* the road */}
      <path
        d="M300 700 L540 700 C490 640 455 600 442 570 C434 545 431 520 429 505 L416 505 C414 525 404 548 390 575 C376 605 340 650 300 700Z"
        fill="#0F5A52"
      />
      <path
        d="M416 700 C416 650 428 600 423 505"
        fill="none"
        stroke="#FF6400"
        strokeOpacity=".75"
        strokeWidth="2.5"
        strokeDasharray="14 12"
      />
      <rect
        width="800"
        height="700"
        filter="url(#sf-grain)"
        opacity=".08"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

function StayScene() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sf-stay-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D5E7DF" />
          <stop offset="1" stopColor="#F4E7C7" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#sf-stay-sky)" />
      <path d="M0 130 L70 85 L130 120 L210 60 L290 118 L350 90 L400 115 V200 H0Z" fill="#A5CCBF" />
      <path d="M0 150 L90 112 L170 145 L260 105 L400 150 V200 H0Z" fill="#3E8B7D" />
      <rect y="168" width="400" height="32" fill="#004741" />
      <path d="M36 170 l12 -36 12 36Z M56 170 l10 -28 10 28Z" fill="#004741" />
      <path d="M300 170 l12 -36 12 36Z M320 170 l10 -28 10 28Z" fill="#004741" />
      <rect x="190" y="138" width="86" height="32" fill="#004741" />
      <path d="M182 140 L233 114 L284 140Z" fill="#004741" />
      <g fill="#FFC27A">
        <rect x="200" y="148" width="12" height="12" rx="1" />
        <rect x="222" y="148" width="12" height="12" rx="1" />
        <rect x="254" y="148" width="12" height="12" rx="1" />
      </g>
    </svg>
  );
}

function Barcode() {
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3];
  let y = 0;
  const rects = bars.map((h, i) => {
    const r = <rect key={i} x="0" y={y} width="40" height={h} fill={GREEN} />;
    y += h + 2;
    return r;
  });
  return (
    <svg
      viewBox={`0 0 40 ${y}`}
      preserveAspectRatio="none"
      className="h-24 w-9 opacity-80"
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Info3() {
  const heroRoute = "M250 360 C300 330 330 270 390 250 S520 190 590 130";
  const expRoute = "M60 170 C140 130 190 175 250 120 S360 70 440 60";

  return (
    <section
      className="relative overflow-hidden bg-[#FAF6EA] py-20 sm:py-28"
      style={{ fontFamily: FONT_BODY }}
    >
      <style>{`
        .sf-dash{stroke-dasharray:2 7;}
        .sf-draw{stroke-dasharray:1 2;stroke-dashoffset:1;transition:stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1);}
        .group:hover .sf-draw{stroke-dashoffset:0;}
        .sf-pin{transition:transform .7s cubic-bezier(.22,1,.36,1);}
        .group:hover .sf-pin-1{transform:translateY(-3px);}
        .group:hover .sf-pin-2{transform:translateY(-5px);}
        .group:hover .sf-pin-3{transform:translateY(-7px);}
        .sf-ring{transform-box:fill-box;transform-origin:center;opacity:0;}
        .group:hover .sf-ring{animation:sf-ring 2.4s ease-out 2;}
        @keyframes sf-ring{0%{transform:scale(.5);opacity:.5}100%{transform:scale(1.9);opacity:0}}
        @media (prefers-reduced-motion:reduce){
          .sf-draw{transition:none;stroke-dashoffset:0;}
          .sf-pin{transition:none;}
          .group:hover .sf-pin-1,.group:hover .sf-pin-2,.group:hover .sf-pin-3{transform:none;}
          .group:hover .sf-ring{animation:none;}
        }
      `}</style>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* ---------- Header ---------- */}
        <header className="max-w-4xl">
          <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#C25000]">
            <span aria-hidden="true" className="h-px w-9 bg-[#FF6400]" />
            EVERY SAFIRI TRIP
          </p>
          <h2
            className="mt-5 text-[clamp(2.25rem,10vw,2.625rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#004741] sm:text-[64px] lg:text-[80px]"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            {"Not just bookings — a trip that's fully sorted"}
            <span className="text-[#FF6400]">.</span>
          </h2>
        </header>

        {/* ---------- Bento ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
          {/* HERO — destination + itinerary */}
          <article className="group relative sm:col-span-2 lg:col-span-7 lg:row-span-2">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-[20px] bg-[#004741] shadow-[0_1px_2px_rgba(0,71,65,0.06),0_30px_70px_-34px_rgba(0,71,65,0.5)] sm:min-h-[540px] sm:rounded-[24px] lg:min-h-[620px]">
              <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                {PHOTOS.hero ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={PHOTOS.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <HeroScene />
                )}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 800 700"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path d={heroRoute} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.6" className="sf-dash" />
                  <path
                    d={heroRoute}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength="1"
                    className="sf-draw"
                  />
                  <Pin x={250} y={360} n={1} label="Manali" />
                  <Pin x={390} y={250} n={2} label="Keylong" />
                  <Pin x={590} y={130} n={3} label="Kaza" anchor="end" />
                </svg>
              </div>

              {/* legibility scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#004741]/85 via-[#004741]/35 to-transparent"
              />

              {/* location chip */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.14] px-3.5 py-1.5 text-[12px] font-medium text-[#F4E7C7] backdrop-blur-md sm:left-6 sm:top-6">
                <Icon name="pin" size={14} className="text-[#FF6400]" />
                <span>Himachal Pradesh</span>
                <span aria-hidden="true" className="h-3 w-px bg-white/30" />
                <span className="hidden tabular-nums text-[#F4E7C7]/75 sm:inline">32.24° N, 77.19° E</span>
              </div>

              {/* itinerary glass panel */}
              <div className="absolute inset-x-3 bottom-3 rounded-[16px] border border-white/20 bg-white/[0.12] p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:rounded-[18px] sm:p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="route" className="text-[#FF6400]" />
                  <h3 className="text-[19px] font-bold text-[#F4E7C7]">{COPY.itinerary.title}</h3>
                </div>
                <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-[#F4E7C7]/80">
                  {COPY.itinerary.text}
                </p>
                <ol className="mt-5 grid grid-cols-3 gap-3">
                  {["Stay", "Transfer", "Activity"].map((label, i) => (
                    <li key={label}>
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            i === 0 ? "bg-[#FF6400]" : "border border-white/70"
                          }`}
                        />
                        {i < 2 && <span aria-hidden="true" className="h-px flex-1 bg-white/30" />}
                      </div>
                      <p className="mt-2 text-[11px] text-[#F4E7C7]/60">Day {i + 1}</p>
                      <p className="text-[13px] font-semibold text-[#F4E7C7]">{label}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* overlapping route chip, straddles into the next column */}
            <div className="absolute -right-10 top-28 z-10 hidden items-center gap-2 rounded-full border border-[#004741]/10 bg-white/90 px-4 py-2 text-[12px] font-semibold text-[#004741] shadow-[0_14px_30px_-14px_rgba(0,71,65,0.4)] backdrop-blur transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none lg:flex">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#FF6400]" />
              Manali → Kaza
            </div>
          </article>

          {/* STAYS */}
          <article className={`${CARD} flex flex-col bg-white p-3 lg:col-span-5 lg:min-h-[300px]`}>
            <div className="relative h-[150px] overflow-hidden rounded-[12px]">
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                {PHOTOS.stay ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={PHOTOS.stay} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <StayScene />
                )}
              </div>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-[#004741]/70 px-3 py-1 text-[11px] font-medium text-[#F4E7C7] backdrop-blur-sm">
                <Icon name="pin" size={12} className="text-[#FF6400]" />
                Kasol, Himachal
              </div>
            </div>
            <div className="px-3 pb-3 pt-4 sm:pt-5">
              <Head icon="stay" title={COPY.stays.title} text={COPY.stays.text} />
            </div>
          </article>

          {/* EXPERIENCES — navy, with mini map */}
          <article
            className={`${CARD} flex min-h-[260px] flex-col justify-end overflow-hidden bg-[#004741] p-5 text-[#F4E7C7] sm:col-span-1 sm:p-6 lg:col-span-5 lg:min-h-[300px]`}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 500 300"
              preserveAspectRatio="xMidYMin slice"
              aria-hidden="true"
            >
              <g fill="none" stroke="#fff" strokeOpacity=".08" transform="rotate(-18 380 90)">
                {[34, 62, 90, 120, 152, 188, 226].map((r) => (
                  <ellipse key={r} cx="380" cy="90" rx={r * 1.5} ry={r} />
                ))}
              </g>
              <path d={expRoute} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" className="sf-dash" />
              <path
                d={expRoute}
                fill="none"
                stroke={ORANGE}
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
                className="sf-draw"
              />
              <Pin x={60} y={170} n={1} color="#F4E7C7" />
              <Pin x={250} y={120} n={2} label="Local trail" />
              <Pin x={440} y={60} n={3} color="#F4E7C7" anchor="end" />
              <g opacity=".6">
                <Pin x={335} y={165} n={1} label="Skipped" hollow />
              </g>
            </svg>
            <div className="relative">
              <Head dark icon="compass" title={COPY.experiences.title} text={COPY.experiences.text} />
            </div>
          </article>

          {/* SECURE & DOCUMENTED — boarding-pass ticket */}
          <article
            className={`${CARD} flex overflow-hidden bg-white sm:col-span-2 lg:col-span-5 lg:min-h-[320px]`}
          >
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <Head icon="shield" title={COPY.secure.title} text={COPY.secure.text} />
              </div>
              <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-[#004741]/10 pt-4">
                {["Bookings", "Vouchers", "Itinerary"].map((f) => (
                  <li key={f} className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-[#004741]/50">{f}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004741] text-[#F4E7C7]">
                      <Icon name="check" size={13} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex w-[84px] shrink-0 flex-col items-center justify-between gap-3 border-l border-dashed border-[#004741]/20 bg-[#F8F0DA] px-3 py-6">
              <span aria-hidden="true" className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-[#FAF6EA]" />
              <span aria-hidden="true" className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-[#FAF6EA]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#004741] [writing-mode:vertical-rl]">
                SAFIRI<span className="text-[#FF6400]">.</span>
              </span>
              <Barcode />
              <span className="text-[10px] tabular-nums text-[#004741]/50">SF-0426</span>
            </div>
          </article>

          {/* SUPPORT */}
          <article
            className={`${CARD} flex flex-col justify-between bg-[#F4E7C7] p-5 sm:col-span-1 sm:p-6 lg:col-span-3 lg:min-h-[320px]`}
          >
            <div className="relative pt-11">
              <span className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#004741] shadow-[0_10px_24px_-12px_rgba(0,71,65,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FF6400]" />
                A real person
              </span>
              <div className="relative flex items-center justify-between px-2">
                <span aria-hidden="true" className="absolute inset-x-3 top-1/2 h-px bg-[#004741]/20" />
                <span aria-hidden="true" className="relative h-3 w-3 rounded-full border border-[#004741]/50 bg-[#F4E7C7]" />
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 rounded-full bg-[#FF6400] ring-4 ring-[#FF6400]/25"
                />
                <span aria-hidden="true" className="relative h-3 w-3 rounded-full border border-[#004741]/50 bg-[#F4E7C7]" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-[#004741]/60">
                <span>Before</span>
                <span className="font-semibold text-[#004741]">During</span>
                <span>After</span>
              </div>
            </div>
            <div className="mt-8">
              <Head icon="headset" title={COPY.support.title} text={COPY.support.text} />
            </div>
          </article>

          {/* PRICING */}
          <article
            className={`${CARD} flex flex-col justify-between bg-white p-5 sm:col-span-1 sm:p-6 lg:col-span-4 lg:min-h-[320px]`}
          >
            <Head icon="rupee" title={COPY.pricing.title} text={COPY.pricing.text} />
            <div className="mt-6 rounded-[14px] bg-[#FAF6EA] p-4">
              <p className="text-[11px] text-[#004741]/50">Sample quote</p>
              <dl className="mt-3 space-y-2 text-[13px] text-[#004741]">
                {[
                  ["Stays", "₹24,600"],
                  ["Transfers", "₹6,200"],
                  ["Activities", "₹4,800"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-2">
                    <dt className="text-[#004741]/70">{k}</dt>
                    <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#004741]/25" />
                    <dd className="font-medium tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex items-baseline justify-between border-t border-[#004741]/10 pt-3">
                <span className="text-[13px] font-semibold text-[#004741]">Total</span>
                <span
                  className="border-b-2 border-[#FF6400] pb-0.5 text-[18px] font-extrabold tabular-nums text-[#004741]"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  ₹35,600
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}