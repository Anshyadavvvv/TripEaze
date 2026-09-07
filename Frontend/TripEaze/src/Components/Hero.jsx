import Navbar from "./Navbar";
import heroImage from "../assets/Hero2.jpg";

export default function Hero() {
  return (
    <section
      className="relative bg-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes te-rise {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .te-rise {
          animation: te-rise 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .te-rise { animation: none !important; }
        }
      `}</style>

      <Navbar />

      {/* Side gutters + top clearance for the (overlaying) navbar */}
      <div className="mx-auto max-w-[1500px] px-4 pt-24 pb-6 sm:px-8 sm:pt-28 sm:pb-10 lg:px-12 lg:pt-32 lg:pb-14">
        <div className="relative flex min-h-[72vh] items-center justify-center overflow-hidden rounded-[28px] shadow-[0_30px_70px_-20px_rgba(11,19,48,0.35)] sm:min-h-[78vh] sm:rounded-[36px] md:min-h-[84vh]">
          {/* Background — aerial island photo */}
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Readability scrim — evenly gentle so the photo stays visible behind the centered text */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,19,48,0.45) 0%, rgba(11,19,48,0.15) 30%, rgba(11,19,48,0.25) 60%, rgba(11,19,48,0.55) 100%)",
            }}
          />

          {/* Flight-path signature, echoing the loop in the logo */}
          <svg
            className="pointer-events-none absolute right-[6%] top-[10%] h-32 w-32 opacity-70 sm:h-48 sm:w-48"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M20 140 C 60 40, 140 40, 180 100"
              stroke="#FFD65A"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
            <path d="M170 92 L188 100 L172 112 L177 101 Z" fill="#FFD65A" />
          </svg>

          {/* Content — centered in the middle of the image, animates in on load */}
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
            <p
              className="te-rise mb-4 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#FFD65A]"
              style={{ animationDelay: "80ms" }}
            >
              Explore · Experience · Memories
            </p>

            <h1
              className="te-rise text-[36px] leading-[1.1] font-bold tracking-tight text-white sm:text-[52px] lg:text-[66px]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                animationDelay: "220ms",
              }}
            >
              Escapes that turn into{" "}
              <span className="text-[#FFD65A]">stories you'll retell</span>
            </h1>

            {/* <p
              className="te-rise mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 sm:text-[18px]"
              style={{ animationDelay: "360ms" }}
            >
              Handpicked travel packages to India's most breathtaking places —
              pick a destination, tell us who's coming, and we'll handle the rest.
            </p> */}

            <div
              className="te-rise mt-9 flex flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "480ms" }}
            >
              <a
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5A83C] px-7 py-3.5 text-[15px] font-semibold text-[#0B1330] transition-transform duration-300 hover:scale-[1.03] hover:bg-white"
              >
                Explore Packages
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Scroll cue */}
          <a
            href="#packages"
            aria-label="Scroll to packages"
            className="te-rise absolute bottom-6 right-6 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white sm:flex"
            style={{ animationDelay: "600ms" }}
          >
            ↓
          </a>
        </div>
      </div>
    </section>
  );
}