import { NavLink } from "react-router-dom";
import ChakrataMoila from "../assets/ChakrataMoila.png";
import Bir from "../assets/Bir.png";
import Kasol from "../assets/Kasol.png";
import Triund from "../assets/Triund.png";
import ShahganjShah from "../assets/ShahganjShah.png";

// Small reusable bits (kept dumb on purpose — no props/logic).
// Copy-paste these wherever a badge/icon is needed inside a card.

export default function Package() {
  return (
    <section
      className="bg-white py-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&display=swap"
      />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#F5A83C]">
            Our Packages
          </p>
          <h2
            className="mt-2 text-[32px] font-bold leading-tight text-[#0B1330] sm:text-[42px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Pick a place, we'll do the rest
          </h2>
        </div>

        {/* Card grid — 5 packages, each written out fully so prices/text/images are easy to edit by hand */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* ---------- 1. Chakrata Moila Top ---------- */}
          <div className="group overflow-hidden rounded-3xl border border-[#0B1330]/[0.06] bg-white shadow-[0_4px_20px_rgba(11,19,48,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(11,19,48,0.25)]">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={ChakrataMoila}
                alt="Chakrata Moila Top"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#3FA8DE] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Nature
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1330]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                2N/3D
              </span>
            </div>
            <div className="p-5">
              <h3
                className="text-[18px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Chakrata Moila Top
              </h3>
              <p className="mt-1 flex items-center gap-1 text-[13px] text-[#0B1330]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Uttarakhand
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[#0B1330]/[0.06] pt-4">
                <p className="text-[13px] text-[#0B1330]/50">
                  from{" "}
                  <span className="text-[18px] font-bold text-[#0B1330]">
                    ₹6,499
                  </span>{" "}
                  /person
                </p>
                <NavLink
                  to="/packages/chakrata-moila"
                  className="text-[14px] font-semibold text-[#F2894E] transition-colors hover:text-[#0B1330]"
                >
                  View →
                </NavLink>
              </div>
            </div>
          </div>

          {/* ---------- 2. Bir ---------- */}
          <div className="group overflow-hidden rounded-3xl border border-[#0B1330]/[0.06] bg-white shadow-[0_4px_20px_rgba(11,19,48,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(11,19,48,0.25)]">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={Bir}
                alt="Bir"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#E8637A] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Adventure
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1330]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                2N/3D
              </span>
            </div>
            <div className="p-5">
              <h3
                className="text-[18px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Bir
              </h3>
              <p className="mt-1 flex items-center gap-1 text-[13px] text-[#0B1330]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Himachal Pradesh
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[#0B1330]/[0.06] pt-4">
                <p className="text-[13px] text-[#0B1330]/50">
                  from{" "}
                  <span className="text-[18px] font-bold text-[#0B1330]">
                    ₹7,999
                  </span>{" "}
                  /person
                </p>
                <NavLink
                  to="/packages/bir"
                  className="text-[14px] font-semibold text-[#F2894E] transition-colors hover:text-[#0B1330]"
                >
                  View →
                </NavLink>
              </div>
            </div>
          </div>

          {/* ---------- 3. Kasol ---------- */}
          <div className="group overflow-hidden rounded-3xl border border-[#0B1330]/[0.06] bg-white shadow-[0_4px_20px_rgba(11,19,48,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(11,19,48,0.25)]">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={Kasol}
                alt="Kasol"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#F5A83C] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0B1330]">
                Leisure
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1330]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                3N/4D
              </span>
            </div>
            <div className="p-5">
              <h3
                className="text-[18px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Kasol
              </h3>
              <p className="mt-1 flex items-center gap-1 text-[13px] text-[#0B1330]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Himachal Pradesh
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[#0B1330]/[0.06] pt-4">
                <p className="text-[13px] text-[#0B1330]/50">
                  from{" "}
                  <span className="text-[18px] font-bold text-[#0B1330]">
                    ₹8,499
                  </span>{" "}
                  /person
                </p>
                <NavLink
                  to="/packages/kasol"
                  className="text-[14px] font-semibold text-[#F2894E] transition-colors hover:text-[#0B1330]"
                >
                  View →
                </NavLink>
              </div>
            </div>
          </div>

          {/* ---------- 4. Triund ---------- */}
          <div className="group overflow-hidden rounded-3xl border border-[#0B1330]/[0.06] bg-white shadow-[0_4px_20px_rgba(11,19,48,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(11,19,48,0.25)]">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={Triund}
                alt="Triund"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#3FA8DE] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Trek
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1330]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                1N/2D
              </span>
            </div>
            <div className="p-5">
              <h3
                className="text-[18px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Triund
              </h3>
              <p className="mt-1 flex items-center gap-1 text-[13px] text-[#0B1330]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Himachal Pradesh
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[#0B1330]/[0.06] pt-4">
                <p className="text-[13px] text-[#0B1330]/50">
                  from{" "}
                  <span className="text-[18px] font-bold text-[#0B1330]">
                    ₹4,999
                  </span>{" "}
                  /person
                </p>
                <NavLink
                  to="/packages/triund"
                  className="text-[14px] font-semibold text-[#F2894E] transition-colors hover:text-[#0B1330]"
                >
                  View →
                </NavLink>
              </div>
            </div>
          </div>

          {/* ---------- 5. Shangarh Sainj ---------- */}
          <div className="group overflow-hidden rounded-3xl border border-[#0B1330]/[0.06] bg-white shadow-[0_4px_20px_rgba(11,19,48,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(11,19,48,0.25)]">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={ShahganjShah}
                alt="Shangarh Sainj"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#F2894E] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Offbeat
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0B1330]/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                3N/4D
              </span>
            </div>
            <div className="p-5">
              <h3
                className="text-[18px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Shangarh Sainj
              </h3>
              <p className="mt-1 flex items-center gap-1 text-[13px] text-[#0B1330]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Himachal Pradesh
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-[#0B1330]/[0.06] pt-4">
                <p className="text-[13px] text-[#0B1330]/50">
                  from{" "}
                  <span className="text-[18px] font-bold text-[#0B1330]">
                    ₹9,999
                  </span>{" "}
                  /person
                </p>
                <NavLink
                  to="/packages/shangarh-sainj"
                  className="text-[14px] font-semibold text-[#F2894E] transition-colors hover:text-[#0B1330]"
                >
                  View →
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}