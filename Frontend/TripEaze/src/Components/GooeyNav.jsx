import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./GooeyNav.css";

const items = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function GooeyNav() {
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const updatePillPosition = useCallback((index) => {
    const links = navRef.current?.querySelectorAll(".gooey-nav__link");
    const activeLink = links?.[index];
    if (!activeLink || !pillRef.current) return;
    pillRef.current.style.width = `${activeLink.offsetWidth}px`;
    pillRef.current.style.transform = `translateX(${activeLink.offsetLeft}px)`;
  }, []);

  useEffect(() => {
    const matchingIndex = items.findIndex(({ href }) =>
      href === "/"
        ? location.pathname === "/"
        : location.pathname === href || location.pathname.startsWith(`${href}/`),
    );
    const nextIndex = matchingIndex === -1 ? -1 : matchingIndex;
    setActiveIndex(nextIndex);
    if (nextIndex >= 0) updatePillPosition(nextIndex);
  }, [location.pathname, updatePillPosition]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const observer = new ResizeObserver(() => {
      if (activeIndex >= 0) updatePillPosition(activeIndex);
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeIndex, updatePillPosition]);

  const animateSelection = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      updatePillPosition(index);
      const pill = pillRef.current;
      if (!pill) return;
      pill.classList.remove("gooey-nav__pill--animate");
      void pill.offsetWidth;
      pill.classList.add("gooey-nav__pill--animate");

      const palette = ["#F2894E", "#F5A83C"];
      for (let particleIndex = 0; particleIndex < 10; particleIndex += 1) {
        const particle = document.createElement("span");
        const angle = (Math.PI * 2 * particleIndex) / 10;
        particle.className = "gooey-nav__particle";
        particle.style.setProperty("--x", `${Math.cos(angle) * (30 + Math.random() * 22)}px`);
        particle.style.setProperty("--y", `${Math.sin(angle) * (18 + Math.random() * 18)}px`);
        particle.style.setProperty("--particle-color", palette[particleIndex % palette.length]);
        pill.appendChild(particle);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });
      }
    }
  };

  return (
    <nav className="gooey-nav" aria-label="Main navigation" ref={navRef}>
      <span className="gooey-nav__pill" ref={pillRef} aria-hidden="true" />
      {items.map((item, index) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={() => animateSelection(index)}
          className={`gooey-nav__link${activeIndex === index ? " is-active" : ""}`}
          aria-current={activeIndex === index ? "page" : undefined}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
