import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Safiri.jpeg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <header
      className="fixed left-1/2 top-2 z-50 box-border w-[calc(100vw_-_1rem)] max-w-5xl -translate-x-1/2 rounded-full border border-white/10 bg-[#004741] shadow-[0_8px_32px_rgba(0,71,65,0.35)] backdrop-blur-xl sm:top-4 sm:w-[92%]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
      />

      <nav className="flex min-w-0 min-h-14 items-center justify-between px-3 py-1.5 sm:px-6 sm:py-2">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Safiri"
            className="h-10 w-24 object-cover object-center sm:h-12 sm:w-32"
          />
          {/* <span className="hidden sm:block text-[15px] font-bold tracking-tight text-white">
            Trip<span className="text-[#F5A83C]">eaze</span>
          </span> */}
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `group relative text-[14px] font-medium transition-colors ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#F2894E] transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <NavLink
          to="/packages"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-[#004741] transition-colors duration-300 hover:bg-[#F5A83C]"
        >
          Explore Packages
          <span aria-hidden>→</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="md:hidden flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={`h-[2px] w-5 bg-white transition-transform duration-300 ${
              isOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-transform duration-300 ${
              isOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full box-border w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#004741] p-2 shadow-[0_8px_32px_rgba(0,71,65,0.35)] md:hidden"
        >
          <div className="flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/packages"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-full bg-white px-5 py-2.5 text-center text-[14px] font-semibold text-[#004741] transition-colors hover:bg-[#F5A83C]"
            >
              Explore Packages
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}