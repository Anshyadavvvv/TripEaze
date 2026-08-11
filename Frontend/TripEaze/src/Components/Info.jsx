import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 40, suffix: "+", decimals: 0, label: "Tours Crafted" },
  { target: 10, suffix: "", decimals: 0, label: "Destinations" },
  { target: 4.8, suffix: "", decimals: 1, label: "Avg Rating" },
  { target: 1200, suffix: "+", decimals: 0, label: "Happy Travellers" },
];

function formatNumber(value, decimals) {
  return decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-IN");
}

function Counter({ target, suffix, decimals, start, duration = 1600 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let rafId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return (
    <span>
      {formatNumber(value, decimals)}
      {suffix}
    </span>
  );
}

export default function Info() {
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B1330] py-14"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 sm:px-10 md:grid-cols-4 md:divide-x md:divide-white/10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-[34px] font-extrabold leading-none text-white sm:text-[44px]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <Counter
                target={stat.target}
                suffix={stat.suffix}
                decimals={stat.decimals}
                start={hasStarted}
              />
            </div>
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[13px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}