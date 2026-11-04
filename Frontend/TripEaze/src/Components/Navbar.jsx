import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Safiri.jpeg";
//import GooeyNav from "./GooeyNav";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    // tap anywhere outside the navbar to close the menu
    const closeOnOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutside);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-2 top-2 z-50 mx-auto box-border max-w-5xl rounded-full border border-white/10 bg-[#004741] shadow-[0_8px_32px_rgba(0,71,65,0.35)] backdrop-blur-xl sm:inset-x-[4%] sm:top-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
      />

      <nav className="flex min-h-14 min-w-0 items-center justify-between gap-3 px-3 py-1.5 sm:px-6 sm:py-2">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src={logo}
            alt="Safiri"
            className="h-10 w-24 object-cover object-center sm:h-12 sm:w-32"
          />
        </NavLink>

        {/* CTA */}
        <NavLink
          to="/packages"
          className="hidden items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-[#004741] transition-colors duration-300 hover:bg-[#F5A83C] md:inline-flex"
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
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
        >
          <span
            className={`h-[2px] w-5 bg-white transition-transform duration-300 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-transform duration-300 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu — drops down inside the bar's own width (inset-x-0), never wider */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full mt-2 box-border overflow-hidden rounded-2xl border border-white/10 bg-[#004741] p-2 shadow-[0_8px_32px_rgba(0,71,65,0.35)] md:hidden"
        >
          <div className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto overscroll-contain p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
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
              className="mt-1 rounded-full bg-white px-5 py-3 text-center text-[14px] font-semibold text-[#004741] transition-colors hover:bg-[#F5A83C]"
            >
              Explore Packages
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
