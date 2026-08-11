import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/tripeaze_logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-5xl -translate-x-1/2 border border-white/10 bg-[#0B1330]/90 shadow-[0_8px_32px_rgba(11,19,48,0.35)] backdrop-blur-xl transition-[border-radius] duration-300 sm:bg-[#0B1330]/70 ${
        isOpen ? "rounded-[28px]" : "rounded-full"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
      />

      <nav className="flex items-center justify-between px-4 py-2 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="TripEaze"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="hidden sm:block text-[15px] font-bold tracking-tight text-white">
            Trip<span className="text-[#F5A83C]">eaze</span>
          </span>
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
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-[#0B1330] transition-colors duration-300 hover:bg-[#F5A83C]"
        >
          Explore Packages
          <span aria-hidden>→</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
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
      <div
        className={`md:hidden overflow-hidden rounded-b-[28px] transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pb-4 pt-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
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
            className="mt-1 rounded-full bg-white px-5 py-2 text-center text-[14px] font-semibold text-[#0B1330] transition-colors hover:bg-[#F5A83C]"
          >
            Explore Packages
          </NavLink>
        </div>
      </div>
    </header>
  );
}