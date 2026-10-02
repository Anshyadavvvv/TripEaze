import { useState } from "react";

// Folder structure assumed: src/components/Info4.jsx  ->  src/assets/safiriX.jpg
import jaisalmer from "../assets/safiri1.jpg";
import agra from "../assets/safiri3.jpg";
import tawang from "../assets/safiri4.jpg";
import srinagar from "../assets/safiri5.jpg";
import munnar from "../assets/safiri6.jpg";
import jaipur from "../assets/safiri7.jpg";
import delhi from "../assets/safiri8.jpg";

const destinations = [
  { name: "Jaisalmer", region: "Rajasthan", img: jaisalmer },
  { name: "Agra", region: "Uttar Pradesh", img: agra },
  { name: "Tawang", region: "Arunachal Pradesh", img: tawang },
  { name: "Srinagar", region: "Jammu & Kashmir", img: srinagar },
  { name: "Munnar", region: "Kerala", img: munnar },
  { name: "Jaipur", region: "Rajasthan", img: jaipur },
  { name: "New Delhi", region: "Delhi", img: delhi },
];

/* Central Element with Safiri Branding Logo (Matching Safiri.jpeg) */
const SafiriLogoCore = () => (
  <svg className="info4__svg" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <radialGradient id="safiri-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0a6158" />
        <stop offset="70%" stopColor="#004d46" />
        <stop offset="100%" stopColor="#02342f" />
      </radialGradient>

      <filter id="badge-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Outer Badge Outer Ring */}
    <circle cx="100" cy="100" r="96" fill="url(#safiri-bg)" stroke="#f5a63a" strokeWidth="2.5" />
    <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 4" />

    {/* Compass Dial Marks */}
    <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round">
      <line x1="100" y1="18" x2="100" y2="26" />
      <line x1="100" y1="174" x2="100" y2="182" />
      <line x1="18" y1="100" x2="26" y2="100" />
      <line x1="174" y1="100" x2="182" y2="100" />
    </g>

    {/* Safiri Logo Text with Signature Orange Dot */}
    <g filter="url(#badge-glow)">
      <text
        x="92"
        y="110"
        textAnchor="middle"
        fill="#f4eedd"
        fontSize="34"
        fontWeight="800"
        fontFamily="'Google Sans Flex', 'Product Sans', sans-serif"
        letterSpacing="-0.8px"
      >
        Safiri
      </text>
      {/* Signature Orange Dot */}
      <circle cx="148" cy="106" r="4.5" fill="#f5a63a" />
    </g>

    {/* Decorative Circular Dotted Flight Track */}
    <path
      d="M 45,100 A 55,55 0 1,1 155,100 A 55,55 0 1,1 45,100"
      fill="none"
      stroke="#f5a63a"
      strokeWidth="1.2"
      strokeDasharray="3 5"
      opacity="0.4"
    />
  </svg>
);

const Info4 = () => {
  const [active, setActive] = useState(null);
  const current = active !== null ? destinations[active] : null;

  const onFocus = (e, i) => {
    if (e.target.matches(":focus-visible")) setActive(i);
  };

  return (
    <section className="info4" aria-labelledby="info4-title">
      <style>{css}</style>

      <div className="info4__card">
        <header className="info4__head">
          <h2 id="info4-title" className="info4__title font-bold ">
            Pick a place. <span>We'll plan the rest.</span>
          </h2>
          <p className="info4__sub">
            From the lakes of Jaisalmer to the monasteries of Tawang, here are
            the destinations our travellers keep coming back to.
          </p>
        </header>

        <div className="info4__orbit">
          <div className="info4__track" aria-hidden="true" />

          <div className="info4__core">
            <SafiriLogoCore />
            <div className={`info4__label${current ? " is-on" : ""}`} aria-live="polite">
              {current && (
                <>
                  <strong>{current.name}</strong>
                  <span>{current.region}</span>
                </>
              )}
            </div>
          </div>

          <ul className="info4__ring">
            {destinations.map((d, i) => (
              <li
                key={d.name}
                className="info4__item"
                style={{ "--a": `${(360 / destinations.length) * i}deg` }}
              >
                <div className="info4__counter">
                  <button
                    type="button"
                    className="info4__thumb"
                    aria-label={`${d.name}, ${d.region}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={(e) => onFocus(e, i)}
                    onBlur={() => setActive(null)}
                  >
                    <img src={d.img} alt={d.name} loading="lazy" draggable="false" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const css = `
@import url("https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300;400;500;700;800&display=swap");

.info4 {
  --green-900: #02342f;
  --green-800: #004d46;
  --green-700: #0a6158;
  --orange: #f5a63a;
  --orange-deep: #d97f10;
  --yellow: #f8c94b;
  padding: 20px 16px;
  background: #fff;
  font-family: "Google Sans Flex", "Google Sans", "Product Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-weight: 300;
}

.info4__card {
  position: relative;
  max-width: 1440px; /* Width ko kafi increase kiya gaya hai */
  margin: 0 auto;
  padding: 52px 32px 48px; /* Height thodi si badhai gayi hai */
  border-radius: 36px;
  text-align: center;
  color: var(--green-900);
  background:
    radial-gradient(60% 50% at 50% 58%, rgba(0,77,70,.07), transparent 70%),
    #fff;
  border: 1px solid rgba(0,77,70,.12);
}

.info4__head { max-width: 720px; margin: 0 auto 32px; }

.info4__title {
  margin: 0 0 14px;
  font-size: clamp(1.8rem, 4.2vw, 3rem);
  line-height: 1.12;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--green-800);
}
.info4__title span { display: block; color: var(--orange-deep); }

.info4__sub {
  margin: 0 auto;
  max-width: 58ch;
  font-size: clamp(.95rem, 1.6vw, 1.08rem);
  line-height: 1.6;
  font-weight: 300;
  color: rgba(2,52,47,.75);
}

/* ---------- orbit (Width increased significantly) ---------- */
.info4__orbit {
  position: relative;
  width: min(100%, 620px); /* Orbit size width badhai gayi hai */
  aspect-ratio: 1;
  margin: 0 auto;
  border-radius: 50%;
  container-type: inline-size;
}

.info4__track {
  position: absolute;
  inset: 9cqw;
  border-radius: 50%;
  border: 1.5px dashed rgba(0,77,70,.28);
}

/* Center Safiri Logo Badge */
.info4__core {
  position: absolute;
  inset: 22%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  filter: drop-shadow(0 16px 32px rgba(2,52,47,.28));
}
.info4__svg { position: absolute; inset: 0; width: 100%; height: 100%; }

.info4__label {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 16px;
  border-radius: 14px;
  background: rgba(255,255,255,.96);
  box-shadow: 0 6px 20px rgba(2,52,47,.25);
  line-height: 1.2;
  opacity: 0;
  transform: scale(.94);
  transition: opacity .2s ease, transform .2s ease;
  pointer-events: none;
}
.info4__label.is-on { opacity: 1; transform: scale(1); }
.info4__label strong { font-size: clamp(.88rem, 3.2cqw, 1.1rem); font-weight: 500; color: var(--green-900); }
.info4__label span { font-size: clamp(.7rem, 2.4cqw, .82rem); font-weight: 400; color: var(--green-700); white-space: nowrap; }

/* Ring */
.info4__ring {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: info4-spin 48s linear infinite;
}
.info4__item {
  --item: 17cqw;
  --radius: calc(50cqw - var(--item) / 2);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--item);
  height: var(--item);
  margin: calc(var(--item) / -2) 0 0 calc(var(--item) / -2);
  transform: rotate(var(--a)) translateY(calc(var(--radius) * -1)) rotate(calc(var(--a) * -1));
}
.info4__counter {
  width: 100%;
  height: 100%;
  animation: info4-counter 48s linear infinite;
}
.info4__thumb {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 3px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: #e6efed;
  box-shadow: 0 0 0 1px rgba(0,77,70,.15), 0 10px 22px rgba(2,52,47,.25);
  transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
}
.info4__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.info4__thumb:hover,
.info4__thumb:focus-visible {
  transform: scale(1.16);
  border-color: var(--orange);
  box-shadow: 0 12px 26px rgba(2,52,47,.3), 0 0 0 6px rgba(245,166,58,.22);
  outline: none;
}

@media (hover: hover) {
  .info4__orbit:hover .info4__ring,
  .info4__orbit:hover .info4__counter { animation-play-state: paused; }
}
.info4__orbit:has(.info4__thumb:focus-visible) .info4__ring,
.info4__orbit:has(.info4__thumb:focus-visible) .info4__counter { animation-play-state: paused; }

@keyframes info4-spin    { to { transform: rotate(360deg); } }
@keyframes info4-counter { to { transform: rotate(-360deg); } }

/* ---------- responsive ---------- */
@media (min-width: 900px) {
  .info4 { padding: 32px 24px; }
  .info4__card { padding: 64px 48px 56px; border-radius: 44px; }
  .info4__orbit { width: min(100%, 640px); }
  .info4__item { --item: 15cqw; }
  .info4__track { inset: 8cqw; }
}
@media (max-width: 480px) {
  .info4__card { border-radius: 24px; padding: 36px 16px 32px; }
  .info4__thumb { border-width: 2px; }
  .info4__core { inset: 21%; }
}

@media (prefers-reduced-motion: reduce) {
  .info4__ring, .info4__counter { animation: none; }
}
`;

export default Info4;