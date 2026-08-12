import Navbar from "./Navbar";
import heroImage from "../assets/hero-bg1.png";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-end overflow-hidden bg-[#0B1330]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />

      {/* Background — aerial island photo */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Readability scrim — darker at top (navbar) and bottom (text), lets the photo breathe in the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,19,48,0.55) 0%, rgba(11,19,48,0.1) 32%, rgba(11,19,48,0.2) 55%, rgba(11,19,48,0.85) 100%)",
        }}
      />

      {/* Flight-path signature, echoing the loop in the logo */}
      <svg
        className="pointer-events-none absolute right-[8%] top-[18%] h-40 w-40 opacity-70 sm:h-56 sm:w-56"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M20 140 C 60 40, 140 40, 180 100"
          stroke="#F5A83C"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <path
          d="M170 92 L188 100 L172 112 L177 101 Z"
          fill="#F5A83C"
        />
      </svg>

      <Navbar />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-20 pt-40 sm:px-10 md:pb-28 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#3FA8DE]">
            Explore · Experience · Memories
          </p>

          <h1
            className="text-[42px] leading-[1.05] font-bold tracking-tight text-white sm:text-[58px] lg:text-[72px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Escapes that turn into{" "}
            <span className="bg-gradient-to-r from-[#F2894E] via-[#F5A83C] to-[#E8637A] bg-clip-text text-transparent">
              stories you'll retell
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
            Handpicked travel packages to India's most breathtaking places —
            pick a destination, tell us who's coming, and we'll handle the rest.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-[#F5A83C] px-7 py-3.5 text-[15px] font-semibold text-[#0B1330] transition-transform duration-300 hover:scale-[1.03] hover:bg-white"
            >
              Explore Packages
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#packages"
        aria-label="Scroll to packages"
        className="absolute bottom-8 right-8 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white sm:flex"
      >
        ↓
      </a>
    </section>
  );
}
