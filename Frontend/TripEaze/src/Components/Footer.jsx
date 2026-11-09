import React, { useState } from "react";

// Place the provided background image at: src/assets/footer2.png
import footerBg from "../assets/footer2.png";
import safiriLogo from "../assets/Safiri.jpeg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire this up to your newsletter endpoint
    setSubscribed(true);
    setEmail("");
  };

  const exploreLinks = ["Destinations", "Packages", "Itineraries", "Reviews"];
  const companyLinks = ["About Us", "Careers", "Blog", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Sitemap"];

  return (
    <footer className="relative overflow-hidden te-motion">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes te-rise {
          0% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .te-rise { animation: te-rise 700ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .te-motion, .te-motion * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-[#004741] bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      {/* Readability overlay: darken + fade into the page above, keeping the sunset glow visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #004741 0%, rgba(0,71,65,0.4) 22%, rgba(0,45,42,0.5) 42%, rgba(0,35,33,0.85) 68%, #002522 100%)",
        }}
      />

      {/* Top gradient hairline, matches the enquiry-form accent */}
      <div
        className="relative h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #F5A83C 20%, #2DD4BF 55%, #F5A83C 85%, transparent)",
        }}
      />

      <div className="relative te-body max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4 te-rise">
            <div className="flex items-center gap-2.5">
              <img
                src={safiriLogo}
                alt="Safiri"
                className="h-14 w-32 rounded-xl object-cover object-center border border-[#F5A83C]/30"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300/90 max-w-xs">
              Handpicked travel packages and journeys planned around how you
              actually want to explore — no two trips the same.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                { label: "Instagram", path: "https://www.instagram.com/safiriclub?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==" },
                { label: "X", path: "M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.6 22H1.5l8.1-9.3L1 2h7l4.9 6.1L18.9 2Zm-1.2 18.1h1.7L6.4 3.8H4.6l13.1 16.3Z" },
                { label: "Facebook", path: "M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-1 .3-1.6 1.7-1.6h1.6V3.5A21 21 0 0 0 14.5 3c-2.5 0-4.2 1.5-4.2 4.4v2.9H7.5v3.3h2.8V22h3.2Z" },
                { label: "YouTube", path: "M23 12s0-3.2-.4-4.7a3 3 0 0 0-2.1-2.1C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 8.8 1 12 1 12s0 3.2.4 4.7a3 3 0 0 0 2.1 2.1c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.5.4-4.7.4-4.7ZM9.8 15.3V8.7l5.8 3.3-5.8 3.3Z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-200 hover:border-[#F5A83C]/50 hover:text-[#F5A83C] hover:bg-[#F5A83C]/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 te-rise" style={{ animationDelay: "80ms" }}>
            <h4 className="te-display text-xs font-semibold uppercase tracking-wider text-[#F5A83C]">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-300/90 transition-colors duration-200 hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 te-rise" style={{ animationDelay: "140ms" }}>
            <h4 className="te-display text-xs font-semibold uppercase tracking-wider text-[#F5A83C]">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-300/90 transition-colors duration-200 hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 te-rise" style={{ animationDelay: "200ms" }}>
            <h4 className="te-display text-xs font-semibold uppercase tracking-wider text-[#F5A83C]">
              Travel Inspiration
            </h4>
            <p className="mt-4 text-sm text-slate-300/90">
              Get new destinations and package drops in your inbox, roughly
              twice a month.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <span>✓</span> You're on the list — welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20"
                />
                <button
                  type="submit"
                  className="te-display flex-shrink-0 rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] px-5 py-2.5 text-sm font-semibold text-[#0B1330] transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,168,60,0.4)] active:scale-[0.98]"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Safiri. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-slate-400 transition-colors duration-200 hover:text-[#F5A83C]"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand watermark, echoes the hairline's orange -> teal -> orange sweep at low opacity */}
      <div className="relative w-full select-none overflow-hidden pt-6 sm:pt-10 md:pt-12" aria-hidden="true">
        <p
          className="te-display text-center font-extrabold leading-none tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F5A83C]/[0.18] via-white/[0.14] to-[#2DD4BF]/[0.18] te-rise"
          style={{ fontSize: "clamp(3.25rem, 19vw, 13.5rem)", animationDelay: "260ms" }}
        >
         Safiri
        </p>
      </div>
    </footer>
  );
}