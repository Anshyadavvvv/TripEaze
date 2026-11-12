import Navbar from "../Components/Navbar";
import Bir2 from "../assets/Bir2.png";
import { NavLink } from "react-router-dom";
import Modal from "../Components/Modal";
import { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Presentational hooks (no business logic)                           */
/* ------------------------------------------------------------------ */

const MQ_REDUCE = "(prefers-reduced-motion: reduce)";
const MQ_FINE = "(hover: hover) and (pointer: fine)";
const canMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  !window.matchMedia(MQ_REDUCE).matches;
const canHover = () => canMotion() && window.matchMedia(MQ_FINE).matches;

/* IntersectionObserver reveal, once: true */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window) || !canMotion()) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* Scroll progress bar, written straight to the DOM in rAF (no re-render) */
function useScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return bar;
}

/* Hero mouse parallax: sets --px / --py (-1..1) */
function useParallax() {
  const ref = useRef(null);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const onMouseMove = (e) => {
    if (!canHover()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    });
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };
  return { ref, onMouseMove, onMouseLeave };
}

/* 3D tilt + cursor sheen (--mx / --my) */
function useTilt(max = 4) {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    if (!canHover()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return { ref, onMouseMove, onMouseLeave };
}

/* Readable text colour on an accent background */
function onAccent(hex) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const L =
    0.2126 * f((n >> 16) & 255) +
    0.7152 * f((n >> 8) & 255) +
    0.0722 * f(n & 255);
  return L > 0.18 ? "#10201E" : "#FFFFFF";
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`rv ${shown ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Letters({ text, start = 0 }) {
  return [...text].map((c, i) => (
    <span key={i} className="ch" style={{ "--i": start + i }}>
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Bir() {
  const [showModal, setShowModal] = useState(false);
  const progress = useScrollProgress();
  const parallax = useParallax();
  const cardTilt = useTilt(3);

  const magnet = (e) => {
    if (!canHover()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", `${(((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(1)}px`);
    el.style.setProperty("--ty", `${(((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(1)}px`);
  };
  const unmagnet = (e) => {
    e.currentTarget.style.setProperty("--tx", "0px");
    e.currentTarget.style.setProperty("--ty", "0px");
  };

  return (
    <div className="bir" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .bir{
          --forest:#004D43; --forest-deep:#06201D; --ivory:#F8F5EB; --gold:#FFC94A; --gold-deep:#8A5F00;
          --ink:#10201E; --white:#FFFFFF; --ink-76:rgba(16,32,30,.78); --ink-68:rgba(16,32,30,.7);
          --hair:rgba(16,32,30,.1); --ease:cubic-bezier(.22,1,.36,1);
          background:var(--ivory); color:var(--ink); position:relative; overflow-x:clip;
        }
        .bir .disp{font-family:'Bricolage Grotesque',sans-serif}
        .bir .serif{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-.01em;font-size:1.08em;color:var(--forest)}
        .bir a:focus-visible,.bir [role="button"]:focus-visible{outline:3px solid var(--gold);outline-offset:3px;box-shadow:0 0 0 6px var(--forest)}

        /* ---------- keyframes ---------- */
        @keyframes kb{from{transform:scale(1.05)}to{transform:scale(1.12)}}
        @keyframes glide{from{transform:translate3d(0,0,0)}to{transform:translate3d(135vw,-36px,0)}}
        @keyframes bob{0%,100%{transform:translate3d(0,0,0) rotate(-2deg)}50%{transform:translate3d(0,-9px,0) rotate(3deg)}}
        @keyframes rise{from{opacity:0;transform:translate3d(0,.55em,0)}to{opacity:1;transform:none}}
        @keyframes fadeUp{from{opacity:0;transform:translate3d(0,18px,0)}to{opacity:1;transform:none}}
        @keyframes ping{0%{transform:scale(1);opacity:.5}80%,100%{transform:scale(2.6);opacity:0}}
        @keyframes halo{0%{transform:scale(1);opacity:.42}100%{transform:scale(1.75);opacity:0}}
        @keyframes shimmer{0%{transform:translateX(-120%)}55%,100%{transform:translateX(120%)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes drift{from{transform:translate3d(0,0,0)}to{transform:translate3d(48px,-36px,0)}}
        @keyframes cue{0%{transform:translate3d(0,0,0);opacity:0}30%{opacity:1}100%{transform:translate3d(0,12px,0);opacity:0}}
        @keyframes floaty{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-6px,0)}}
        @keyframes chipIn{from{opacity:0;transform:translate3d(0,12px,0) scale(.96)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{opacity:0;transform:translate3d(-20px,0,0)}to{opacity:1;transform:none}}

        /* ---------- atmosphere ---------- */
        .atmos{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
        .topo{position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='520' viewBox='0 0 520 520' fill='none' stroke='%23004D43' stroke-width='1.1'%3E%3Cpath d='M0 70C80 20 160 120 260 70S440 20 520 70'/%3E%3Cpath d='M0 150C90 110 170 190 260 150S430 110 520 150'/%3E%3Cpath d='M0 240C70 180 180 300 260 240S450 190 520 240'/%3E%3Cpath d='M0 330C100 290 160 370 260 330S420 280 520 330'/%3E%3Cpath d='M0 420C80 360 190 480 260 420S440 370 520 420'/%3E%3Cpath d='M0 500C90 470 170 530 260 500S430 470 520 500'/%3E%3C/svg%3E")}
        .grain{position:absolute;inset:0;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .orb{position:absolute;width:560px;height:560px;border-radius:50%;animation:drift 26s ease-in-out infinite alternate}
        .orb-g{background:radial-gradient(circle,rgba(255,201,74,.34),rgba(255,201,74,0) 66%)}
        .orb-f{background:radial-gradient(circle,rgba(0,77,67,.2),rgba(0,77,67,0) 66%)}

        /* ---------- motion system ---------- */
        .rv{opacity:0;transform:translate3d(0,24px,0);transition:opacity .7s var(--ease) var(--d,0ms),transform .7s var(--ease) var(--d,0ms)}
        .rv.in{opacity:1;transform:none}
        .stg>:nth-child(2){--d:70ms}.stg>:nth-child(3){--d:140ms}.stg>:nth-child(4){--d:210ms}.stg>:nth-child(5){--d:280ms}.stg>:nth-child(6){--d:350ms}

        /* ---------- hero ---------- */
        .l-img{transform:translate3d(calc(var(--px,0)*-12px),calc(var(--py,0)*-8px),0);transition:transform .7s var(--ease)}
        .kb{animation:kb 24s ease-in-out infinite alternate;transform-origin:60% 40%}
        .l-sky{transform:translate3d(calc(var(--px,0)*-20px),calc(var(--py,0)*-12px),0);transition:transform .7s var(--ease)}
        .l-r1{transform:translate3d(calc(var(--px,0)*-10px),calc(var(--py,0)*-5px),0);transition:transform .7s var(--ease)}
        .l-r2{transform:translate3d(calc(var(--px,0)*-18px),calc(var(--py,0)*-8px),0);transition:transform .7s var(--ease)}
        .l-txt{transform:translate3d(calc(var(--px,0)*6px),calc(var(--py,0)*4px),0);transition:transform .7s var(--ease)}
        .glider{position:absolute;left:-18vw;top:0;animation:glide 48s linear -12s infinite}
        .glider svg{animation:bob 5.5s ease-in-out infinite;display:block}
        .glider .gtrail{position:absolute;right:92%;top:46%;width:170px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55))}
        .ch{display:inline-block;opacity:0;animation:rise .9s var(--ease) calc(var(--i)*55ms + 200ms) forwards}
        .rise{opacity:0;animation:fadeUp .9s var(--ease) calc(var(--i)*110px + 150ms) forwards}
        .badge{display:inline-flex;align-items:center;gap:10px;border-radius:999px;background:var(--gold);color:var(--ink);padding:6px 16px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 8px 24px -8px rgba(255,201,74,.7)}
        .pdot{position:relative;width:8px;height:8px;border-radius:50%;background:var(--forest-deep);display:inline-block}
        .pdot::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--forest-deep);animation:ping 2s var(--ease) infinite}
        .hero-h1{font-size:clamp(44px,9vw,120px);line-height:.98;letter-spacing:-.04em;font-weight:800;color:#fff;text-shadow:0 4px 36px rgba(6,32,29,.45)}
        .hero-h1 .gold{color:var(--gold);font-size:1.06em;letter-spacing:-.025em;display:block}
        .chips{perspective:900px;transform-style:preserve-3d}
        .gchip{transform:translate3d(calc(var(--px,0)*var(--k,10)*1px),calc(var(--py,0)*var(--k,10)*.7px),var(--z,0px));transition:transform .6s var(--ease)}
        .gchip>span{display:block;border-radius:999px;border:1px solid rgba(255,255,255,.42);background:rgba(6,32,29,.34);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:#fff;padding:10px 20px;font-size:14px;font-weight:600;box-shadow:0 12px 32px -12px rgba(6,32,29,.6);animation:floaty 6s ease-in-out infinite}
        .cue{position:absolute;left:50%;margin-left:-20px;width:40px;height:40px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(6,32,29,.32);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;align-items:flex-start;justify-content:center;padding-top:10px}
        .cue i{display:block;width:3px;height:8px;border-radius:3px;background:#fff;animation:cue 2s var(--ease) infinite}

        /* ---------- meta strip ---------- */
        .strip{display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px;padding:16px 24px;border-radius:24px;background:rgba(255,255,255,.74);-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);border:1px solid rgba(255,255,255,.7);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 2px 4px rgba(6,32,29,.04),0 12px 24px -10px rgba(6,32,29,.16),0 32px 56px -24px rgba(6,32,29,.26)}
        .mi{position:relative;display:flex;align-items:center;gap:12px;font-size:14px;font-weight:600;color:var(--ink);transition:transform .4s var(--ease)}
        .mi:hover{transform:translateY(-2px)}
        .mi::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;border-radius:2px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease)}
        .mi:hover::after{transform:scaleX(1)}
        .mwell{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;flex-shrink:0}

        /* ---------- section heading ---------- */
        .glyph{display:grid;place-items:center;width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--forest-deep);box-shadow:0 0 0 3px color-mix(in srgb,var(--a) 28%,transparent),0 6px 14px -6px rgba(6,32,29,.5)}
        .hair-r{flex:1;min-width:16px;height:1px;background:linear-gradient(90deg,var(--a),transparent)}

        /* ---------- trail (timeline) ---------- */
        .trail-svg{position:absolute;left:0;top:44px;bottom:0;width:40px;height:calc(100% - 44px);overflow:visible}
        .trail-mask{stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset .9s var(--ease) .25s}
        .rv.in .trail-mask{stroke-dashoffset:0}
        .coin{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;font-weight:800;font-size:13px;background-color:var(--a);background-image:radial-gradient(circle at 30% 22%,rgba(255,255,255,.7),rgba(255,255,255,0) 46%),linear-gradient(160deg,rgba(255,255,255,.22),rgba(0,0,0,.2));box-shadow:inset 0 1px 1px rgba(255,255,255,.75),inset 0 -3px 6px rgba(0,0,0,.22),0 0 0 4px var(--ivory),0 0 0 5px rgba(16,32,30,.12),0 12px 18px -8px rgba(6,32,29,.55);transition:transform .8s var(--ease);transform-style:preserve-3d}
        .group:hover .coin{transform:rotateY(360deg)}
        .halo{position:absolute;inset:0;border-radius:50%;animation:halo 2.6s var(--ease) infinite}
        .dlabel{display:inline-block;border-radius:999px;padding:2px 10px;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink)}

        /* ---------- tilt + day cards ---------- */
        .tilt{position:relative;transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(var(--tz,0px));transition:transform .5s var(--ease),box-shadow .5s var(--ease);will-change:transform}
        .tilt:hover{--tz:14px}
        .tilt::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .4s var(--ease);background:radial-gradient(420px circle at var(--mx,50%) var(--my,0%),rgba(255,201,74,.2),rgba(255,201,74,0) 60%)}
        .tilt:hover::after{opacity:1}
        .dcard{overflow:hidden;border-radius:24px;border:1px solid var(--hair);background:linear-gradient(180deg,#fff,rgba(255,255,255,.82));box-shadow:0 1px 2px rgba(6,32,29,.04),0 8px 20px -10px rgba(6,32,29,.12)}
        .dcard:hover{box-shadow:0 2px 4px rgba(6,32,29,.05),0 18px 36px -14px rgba(6,32,29,.22),0 40px 64px -32px rgba(6,32,29,.2)}
        .rail{position:absolute;left:0;top:0;bottom:0;width:6px;background:linear-gradient(180deg,var(--a),color-mix(in srgb,var(--a) 20%,transparent))}
        .wm{position:absolute;right:-4px;top:-20px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(96px,24vw,148px);line-height:1;color:transparent;-webkit-text-stroke:3px var(--a);opacity:.08;pointer-events:none;user-select:none}
        .dbadge{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:44px;height:44px;border-radius:16px;font-weight:800;font-size:15px;background-color:var(--a);background-image:linear-gradient(145deg,rgba(255,255,255,.3),rgba(0,0,0,.14));box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -2px 4px rgba(0,0,0,.16),0 8px 14px -8px var(--a)}
        .dbadge::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 40%)}
        .bul>li{position:relative;list-style:none;padding-left:20px}
        .bul>li::before{content:"";position:absolute;left:2px;top:.62em;width:6px;height:6px;background:var(--a);transform:rotate(45deg)}
        .bul>ul{margin-top:6px;margin-bottom:2px;padding-left:14px;border-left:1px dashed color-mix(in srgb,var(--a) 55%,transparent)}
        .bul>ul>li{position:relative;list-style:none;padding-left:18px}
        .bul>ul>li::before{content:"";position:absolute;left:0;top:.6em;width:7px;height:7px;border-radius:50%;border:1.5px solid var(--a);background:transparent}

        /* ---------- inclusions / exclusions ---------- */
        .lift{transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
        .lift:hover{transform:translate3d(0,-6px,0)}
        .inc{position:relative;overflow:hidden;border-radius:24px;padding:24px;color:var(--ivory);--ck:var(--gold);--ckbg:rgba(255,201,74,.16);background:radial-gradient(120% 80% at 0% 0%,rgba(255,201,74,.14),rgba(255,201,74,0) 55%),var(--forest-deep);box-shadow:0 2px 4px rgba(6,32,29,.2),0 22px 44px -18px rgba(6,32,29,.55)}
        .inc:hover{box-shadow:0 4px 8px rgba(6,32,29,.2),0 30px 56px -18px rgba(6,32,29,.65)}
        .exc{position:relative;overflow:hidden;border-radius:24px;padding:24px;border:1px solid var(--hair);background:radial-gradient(110% 70% at 100% 100%,rgba(232,99,122,.12),rgba(232,99,122,0) 60%),#fff;box-shadow:0 1px 2px rgba(6,32,29,.04),0 12px 28px -14px rgba(6,32,29,.16)}
        .exc:hover{box-shadow:0 2px 4px rgba(6,32,29,.05),0 24px 44px -16px rgba(6,32,29,.24)}
        .ck path{stroke-dasharray:1 1;stroke-dashoffset:1;transition:stroke-dashoffset .7s var(--ease) .3s}
        .rv.in .ck path{stroke-dashoffset:0}
        .hwell{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;flex-shrink:0}

        /* ---------- boarding pass ---------- */
        .ticket-shell{filter:drop-shadow(0 2px 3px rgba(6,32,29,.06)) drop-shadow(0 18px 24px rgba(6,32,29,.1))}
        .ticket{position:relative;background:#fff;border-radius:24px;border:1px solid var(--hair);--stub:124px;
          -webkit-mask:radial-gradient(circle 12px at 0 calc(100% - var(--stub)),#0000 96%,#000) 0 0/51% 100% no-repeat,radial-gradient(circle 12px at 100% calc(100% - var(--stub)),#0000 96%,#000) 100% 0/51% 100% no-repeat;
          mask:radial-gradient(circle 12px at 0 calc(100% - var(--stub)),#0000 96%,#000) 0 0/51% 100% no-repeat,radial-gradient(circle 12px at 100% calc(100% - var(--stub)),#0000 96%,#000) 100% 0/51% 100% no-repeat;
          --ck:var(--forest);--ckbg:rgba(0,77,67,.1)}
        .ticket::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;border-radius:24px 0 0 24px;background:linear-gradient(180deg,var(--gold),var(--forest))}
        .tear{position:absolute;left:24px;right:24px;bottom:var(--stub);border-top:2px dashed rgba(16,32,30,.22)}
        .stub{height:var(--stub);display:flex;flex-direction:column;justify-content:center;gap:12px;padding:0 20px 0 24px}
        .tlabel{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-68);margin-bottom:12px}
        .gpay{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;max-width:100%;border-radius:999px;background:var(--ivory);border:1px solid var(--hair);padding:8px 16px 8px 12px;font-size:13px;font-weight:600;white-space:nowrap}
        .gpay::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 3px rgba(255,201,74,.3)}
        .barcode{height:24px;width:100%;max-width:240px;opacity:.78;background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 5px,var(--ink) 5px 6px,transparent 6px 8px,var(--ink) 8px 11px,transparent 11px 13px,var(--ink) 13px 14px,transparent 14px 17px)}

        /* ---------- carry chips ---------- */
        .carry>*{opacity:0}
        .carry.in>*{opacity:1;animation:chipIn .6s var(--ease) backwards}
        .carry.in>:nth-child(4n+2){animation-delay:60ms}.carry.in>:nth-child(4n+3){animation-delay:120ms}.carry.in>:nth-child(4n+4){animation-delay:180ms}
        .chip{display:flex;align-items:center;gap:8px;border-radius:999px;border:1px solid var(--hair);background:rgba(255,255,255,.82);padding:8px 16px;font-size:13.5px;font-weight:500;color:var(--ink-76);transition:transform .4s var(--ease),border-color .4s,box-shadow .4s}
        .chip:hover{transform:translate3d(0,-3px,0);border-color:rgba(255,201,74,.95);box-shadow:0 0 0 3px rgba(255,201,74,.25),0 10px 20px -10px rgba(6,32,29,.25)}
        .note{border-left:2px solid var(--gold);padding-left:16px;font-style:italic;font-size:13.5px;line-height:1.6;color:var(--ink-76)}

        /* ---------- refund meter ---------- */
        .meter{position:absolute;left:14px;top:16px;bottom:16px;width:4px;border-radius:999px;background:linear-gradient(180deg,#22C55E,#F5A83C 25%,#F2894E 50%,#E8637A 72%,#D64550 88%,#8E1B2E);box-shadow:0 0 18px rgba(245,168,60,.35)}
        .cr{position:relative;border-radius:16px;border:1px solid var(--hair);padding:16px 16px 16px 20px;background-color:rgba(255,255,255,.82);background-image:linear-gradient(100deg,var(--cw),rgba(255,255,255,0) 62%);opacity:0;transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
        .cr.in{opacity:1;animation:slideIn .7s var(--ease) backwards}
        .cr:hover{transform:translate3d(4px,0,0);box-shadow:0 12px 24px -14px rgba(6,32,29,.3)}
        .cr-node{position:absolute;left:-27px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:var(--c);box-shadow:0 0 0 3px var(--ivory),0 0 14px 2px var(--c)}

        /* ---------- booking card ---------- */
        .bwrap{position:relative;overflow:hidden;border-radius:24px;padding:1.5px;background:rgba(0,77,67,.2);box-shadow:0 2px 4px rgba(6,32,29,.06),0 24px 48px -16px rgba(6,32,29,.3)}
        .spin{position:absolute;inset:-80%;background:conic-gradient(from 0deg,var(--gold),var(--forest),var(--gold),var(--forest),var(--gold));animation:spin 9s linear infinite}
        .bcard{position:relative;border-radius:22.5px;padding:24px;background:linear-gradient(180deg,rgba(255,255,255,.94),rgba(248,245,235,.96));-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
        .rupee{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:var(--gold-deep);margin-right:2px}
        .prow{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;border-radius:16px;padding:12px 16px;background:rgba(16,32,30,.045);border:1px solid transparent;transition:transform .4s var(--ease)}
        .prow:hover{transform:translate3d(0,-2px,0)}
        .prow.best{background:linear-gradient(100deg,rgba(255,201,74,.34),rgba(255,201,74,.12));border-color:rgba(255,201,74,.8)}
        .prow.best::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.75) 50%,transparent 70%);animation:shimmer 3.8s var(--ease) infinite}
        .ribbon{background:var(--gold);color:var(--ink);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 14px 3px 8px;clip-path:polygon(0 0,100% 0,88% 50%,100% 100%,0 100%)}
        .book{--tx:0px;--ty:0px;position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;background:var(--forest);color:#fff;padding:14px 24px;font-size:15px;font-weight:700;box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 14px 28px -10px rgba(0,77,67,.7);transform:translate3d(var(--tx),var(--ty),0);transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
        .book::before{content:"";position:absolute;z-index:-1;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,201,74,.85),transparent);transform:skewX(-20deg) translateX(0);transition:transform .9s var(--ease)}
        .book:hover::before{transform:skewX(-20deg) translateX(560%)}
        .book:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 18px 34px -10px rgba(0,77,67,.8)}
        .book:active{transform:translate3d(var(--tx),var(--ty),0) scale(.97)}
        .arr{display:inline-block;transition:transform .4s var(--ease)}
        .book:hover .arr{transform:translate3d(6px,0,0)}
        .pill2{display:flex;flex:1 1 130px;align-items:center;justify-content:center;gap:8px;white-space:nowrap;border-radius:999px;border:1px solid var(--hair);background:rgba(255,255,255,.86);padding:8px 12px;font-size:13px;font-weight:600;color:var(--ink);cursor:pointer;transition:transform .4s var(--ease),border-color .4s,box-shadow .4s}
        .pill2:hover{transform:translate3d(0,-2px,0);box-shadow:0 10px 20px -12px rgba(6,32,29,.35)}
        .pill2:active{transform:scale(.97)}
        .well{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;flex-shrink:0}

        /* ---------- reduced motion: whole motion layer off ---------- */
        @media (prefers-reduced-motion: reduce){
          .bir *,.bir *::before,.bir *::after{animation:none!important;transition:none!important}
          .rv,.ch,.rise,.carry>*,.cr{opacity:1!important;transform:none!important}
          .trail-mask,.ck path{stroke-dashoffset:0!important}
          .glider{left:62%}
          .tilt{transform:none!important}
          .book{transform:none!important}
        }
      `}</style>

      {/* scroll progress */}
      <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full" aria-hidden="true">
        <div
          ref={progress}
          className="h-full origin-left"
          style={{
            transform: "scaleX(0)",
            background: "linear-gradient(90deg, var(--forest), var(--gold))",
          }}
        />
      </div>

      <Navbar />

      {/* ---------- HERO ---------- */}
      <section
        ref={parallax.ref}
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
        className="relative isolate z-0 h-[82vh] max-h-[900px] min-h-[560px] w-full overflow-hidden bg-[var(--forest-deep)]"
      >
        <div className="l-img absolute inset-0">
          <img
            src={Bir2}
            alt="Bir Billing paragliding"
            className="kb h-full w-full object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 18% 88%, rgba(6,32,29,.4), rgba(6,32,29,0) 60%), linear-gradient(to top, rgba(6,32,29,.55) 0%, rgba(6,32,29,.2) 38%, rgba(6,32,29,.1) 100%)",
          }}
        />

        {/* paraglider wing */}
        <div className="l-sky pointer-events-none absolute inset-x-0 top-[14%]" aria-hidden="true">
          <div className="glider">
            <span className="gtrail" />
            <svg width="112" height="66" viewBox="0 0 120 70" fill="none">
              <path d="M6 24C30 -2 90 -2 114 24C96 15 24 15 6 24Z" fill="#FFC94A" />
              <path d="M6 24C30 -2 60 -2 60 8C40 12 22 16 6 24Z" fill="#FFFFFF" fillOpacity=".25" />
              <path d="M10 22L58 56M110 22L62 56M60 12V56M34 14L59 56M86 14L61 56" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth=".8" />
              <circle cx="60" cy="58" r="3.2" fill="#06201D" />
              <path d="M60 61V67M57 64h6" stroke="#06201D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ridges */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true" className="l-r1 pointer-events-none absolute inset-x-0 bottom-[-12px] h-[140px] w-full sm:h-[180px] lg:h-[220px]">
          <path d="M0 120L90 96L180 112L300 70L400 100L520 62L640 104L760 80L880 112L1000 66L1120 100L1240 76L1340 104L1440 88V200H0Z" fill="#06201D" fillOpacity=".5" />
        </svg>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true" className="l-r2 pointer-events-none absolute inset-x-0 bottom-[-12px] h-[130px] w-full sm:h-[165px] lg:h-[200px]">
          <path d="M0 150L120 128L210 146L330 112L450 142L580 108L700 146L820 124L940 150L1060 116L1180 144L1300 122L1440 148V200H0Z" fill="#004D43" fillOpacity=".72" />
        </svg>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-2px] h-[110px] w-full sm:h-[150px] lg:h-[190px]">
          <path d="M0 176C200 150 320 186 520 168S860 146 1040 170S1320 160 1440 178V200H0Z" fill="#F8F5EB" />
        </svg>

        {/* floating glass chips (desktop) */}
        <div className="chips pointer-events-none absolute bottom-[230px] right-10 z-10 hidden flex-col items-end gap-3 lg:flex" aria-hidden="true">
          <div className="gchip" style={{ "--k": 22, "--z": "70px" }}><span>2N / 3D</span></div>
          <div className="gchip" style={{ "--k": 14, "--z": "40px" }}><span>From ₹6,999</span></div>
          <div className="gchip" style={{ "--k": 8, "--z": "10px" }}><span>Delhi | Chandigarh</span></div>
        </div>

        {/* content */}
        <div className="l-txt absolute inset-x-0 bottom-0 z-10 px-6 pb-[128px] sm:px-10 sm:pb-[160px] lg:pb-[200px]">
          <div className="mx-auto max-w-6xl">
            <span className="badge rise" style={{ "--i": 0 }}>
              <i className="pdot" aria-hidden="true" />
              Adventure · 2N/3D
            </span>
            <h1 className="hero-h1 disp mt-4" aria-label="Bir – McLeodganj">
              <span aria-hidden="true" className="block">
                <Letters text="Bir –" start={0} />
              </span>
              <span aria-hidden="true" className="serif gold">
                <Letters text="McLeodganj" start={5} />
              </span>
            </h1>
            <p
              className="rise mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-[17px]"
              style={{ "--i": 7, textShadow: "0 2px 20px rgba(6,32,29,.6)" }}
            >
              Monastery mornings, mountain bonfires, and a paraglide over the
              Kangra valley — a short escape that punches way above its weight.
            </p>
          </div>
        </div>

        {/* scroll cue */}
        <div className="cue bottom-[84px] z-10 hidden sm:flex lg:bottom-[104px]" aria-hidden="true">
          <i />
        </div>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="relative z-10 pb-24">
        <div className="atmos" aria-hidden="true">
          <div className="topo" />
          <div className="grain" />
          <div className="orb orb-g" style={{ top: "2%", right: "-12%" }} />
          <div className="orb orb-f" style={{ top: "36%", left: "-18%", animationDelay: "-9s" }} />
          <div className="orb orb-g" style={{ top: "70%", right: "-10%", animationDelay: "-16s" }} />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-3">
          {/* ===================== LEFT: CONTENT ===================== */}
          <div className="space-y-14 lg:col-span-2">
            {/* Quick meta */}
            <Reveal className="relative z-20 -mt-14">
              <div className="strip">
                <div className="mi">
                  <span className="mwell" style={{ background: "#F2894E26" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#F2894E" strokeWidth="1.8" />
                      <path d="M12 7v5l3 2" stroke="#F2894E" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  2 Nights / 3 Days
                </div>
                <div className="hidden h-5 w-px bg-[rgba(16,32,30,.12)] sm:block" />
                <a href="tel:+919929190452" className="mi">
                  <span className="mwell" style={{ background: "#3FA8DE26" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
                        stroke="#3FA8DE"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  +91 99291 90452
                </a>
                <div className="hidden h-5 w-px bg-[rgba(16,32,30,.12)] sm:block" />
                <div className="mi">
                  <span className="mwell" style={{ background: "#E8637A26" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#E8637A" strokeWidth="1.8" />
                      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="#E8637A" strokeWidth="1.8" />
                    </svg>
                  </span>
                  safiri.in
                </div>
              </div>
            </Reveal>

            {/* Brief itinerary — the trail */}
            <div>
              <SectionHeading accent="#F2894E" title="Brief Itinerary" />
              <div className="stg mt-8">
                <TimelineItem
                  accent="#F2894E"
                  day="Day 0"
                  text="Departure from Delhi | Chandigarh"
                />
                <TimelineItem
                  accent="#E8637A"
                  day="Day 1"
                  text="Mcleodganj Exploration | Dalai Lama Monastery | Dinner & Stay"
                />
                <TimelineItem
                  accent="#3FA8DE"
                  day="Day 2"
                  text="Reach Bir Billing | Local Sightseeing | Dinner & Stay"
                />
                <TimelineItem
                  accent="#F5A83C"
                  day="Day 3"
                  text="Leave for Paragliding | Cafe Hopping | Departure"
                />
                <TimelineItem
                  accent="#06201D"
                  day="Day 4"
                  text="Reach back to Delhi | Chandigarh by Early Morning"
                  last
                />
              </div>
            </div>

            {/* Detailed itinerary */}
            <div>
              <SectionHeading accent="#3FA8DE" title="Detailed Itinerary" />

              <div className="stg mt-8 space-y-5">
                <DayCard
                  accent="#F2894E"
                  day="0"
                  title="Departure from Delhi | Chandigarh"
                >
                  <li>Departure in the Evening.</li>
                  <li>The group will assemble at Pickup Point.</li>
                  <li>
                    Afterward, you'll get a small briefing from the trip leader.
                  </li>
                  <li>Halt for Dinner in-between (at own cost).</li>
                </DayCard>

                <DayCard
                  accent="#E8637A"
                  day="1"
                  title="Mcleodganj Exploration | Dalai Lama Monastery | Dinner & Stay"
                >
                  <li>
                    After reaching Mcleodganj, Hotel Check-in & Freshen up.
                  </li>
                  <li>
                    After some rest, go & explore the Mcleodganj flea market.
                  </li>
                  <li>
                    Visit Bhagsu Waterfall, Dalai Lama Monastery, & Cafes.
                  </li>
                  <li>Dinner & overnight stay at hotel.</li>
                </DayCard>

                <DayCard
                  accent="#3FA8DE"
                  day="2"
                  title="Reach Bir | Local Sightseeing | Dinner & Stay"
                >
                  <li>Have your breakfast at the hotel.</li>
                  <li>Departure to Bir. Enroute, we'll visit:</li>
                  <ul className="ml-5 list-[circle] space-y-1">
                    <li>Dharamshala HPCA</li>
                    <li>Palampur Tea Garden</li>
                    <li>Baijnath Temple</li>
                  </ul>
                  <li>Reach Bir in the evening.</li>
                  <li>Check-in at stay.</li>
                  <li>Enjoy a bonfire with some light music.</li>
                  <li>Dinner & overnight stay at Bir.</li>
                </DayCard>

                <DayCard
                  accent="#F5A83C"
                  day="3"
                  title="Leave for Paragliding | Cafe Hopping | Departure"
                >
                  <li>Wake up early & have your breakfast at hotel.</li>
                  <li>
                    Leave for paragliding and head towards Billing Paragliding
                    take-off site.
                  </li>
                  <li>Paragliding cost is extra.</li>
                  <li>Billing → Bir via paragliding.</li>
                  <li>Take-off from Billing and land in Bir.</li>
                  <li>Adventure ride duration: 15–30 minutes.</li>
                  <li>Enjoy the views after landing.</li>
                  <li>Later departure in the evening.</li>
                </DayCard>

                <DayCard
                  accent="#06201D"
                  day="4"
                  title="Reach back to Delhi | Chandigarh by Early Morning"
                >
                  <li>
                    Reach Delhi/Chandigarh early in the morning with lots of
                    memories and pictures.
                  </li>
                  <li>Bid goodbye to fellow travelers.</li>
                </DayCard>
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:-translate-y-2">
                <Reveal>
                  <div className="inc lift">
                    <svg
                      className="pointer-events-none absolute bottom-0 right-0"
                      width="200"
                      height="110"
                      viewBox="0 0 200 110"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M0 110L48 44L74 74L112 20L160 82L176 62L200 96V110Z" stroke="#F8F5EB" strokeOpacity=".16" strokeWidth="1.2" />
                      <path d="M0 110L36 72L70 96L110 56L150 100L200 70" stroke="#FFC94A" strokeOpacity=".2" strokeWidth="1.2" />
                    </svg>
                    <div className="relative flex items-center gap-3">
                      <span className="hwell" style={{ background: "rgba(255,201,74,.16)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="#FFC94A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <h3 className="disp text-[18px] font-bold text-[var(--ivory)]">
                        Inclusions
                      </h3>
                    </div>
                    <ul className="relative mt-5 space-y-3 text-[14px] leading-relaxed text-[rgba(248,245,235,.92)]">
                      <CheckItem>1 Night stay at Mcleodganj (Hotel)</CheckItem>
                      <CheckItem>1 Night stay at Bir (Camp)</CheckItem>
                      <CheckItem>4 Meals — 2 Breakfast, 2 Dinner</CheckItem>
                      <CheckItem>Transfer to/from in AC Deluxe Bus/TT</CheckItem>
                      <CheckItem>
                        Mcleodganj/Dharamshala/Bir-Billing sightseeing
                      </CheckItem>
                      <CheckItem>All permits</CheckItem>
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="sm:translate-y-2">
                <Reveal delay={100}>
                  <div className="exc lift">
                    <div className="flex items-center gap-3">
                      <span className="hwell" style={{ background: "rgba(232,99,122,.12)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path d="M6 6l12 12M18 6L6 18" stroke="#E8637A" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <h3 className="disp text-[18px] font-bold text-[var(--ink)]">
                        Exclusions
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--ink-76)]">
                      <CrossItem>Any other food & beverages</CrossItem>
                      <CrossItem>Paragliding charges</CrossItem>
                      <CrossItem>Entry tickets to viewpoints</CrossItem>
                      <CrossItem>Expenses not mentioned in inclusions</CrossItem>
                      <CrossItem>
                        Extra cost due to natural circumstances beyond control
                      </CrossItem>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Booking process — boarding pass */}
            <Reveal className="ticket-shell">
              <div className="ticket">
                <div className="p-6 pb-5 pl-7" style={{ paddingBottom: "calc(var(--stub) + 20px)" }}>
                  <p className="tlabel">Booking</p>
                  <SectionHeading
                    accent="#F5A83C"
                    title="Booking Process"
                    compact
                  />
                  <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-[var(--ink-76)]">
                    <CheckItem>Booking Amount: ₹2000 per person</CheckItem>
                    <CheckItem>Balance amount to be paid while boarding</CheckItem>
                  </ul>
                </div>
                <span className="tear" aria-hidden="true" />
                <div className="stub" style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
                  <div className="gpay">
                    GPay:{" "}
                    <span className="text-[var(--forest)]">utkarshveeryadav@oksbi</span>
                  </div>
                  <div className="barcode" aria-hidden="true" />
                </div>
              </div>
            </Reveal>

            {/* Things to carry */}
            <div>
              <SectionHeading accent="#E8637A" title="Things to Carry" />
              <Reveal className="carry mt-6 flex flex-wrap gap-2.5">
                <CarryItem>Day backpack (20–30 L)</CarryItem>
                <CarryItem>Sunscreen (SPF 40+)</CarryItem>
                <CarryItem>Floaters or Sandals</CarryItem>
                <CarryItem>Water Bottle (1 L)</CarryItem>
                <CarryItem>Down Jacket / Main Jacket</CarryItem>
                <CarryItem>Toiletry Bag</CarryItem>
                <CarryItem>Outdoor Shoes</CarryItem>
                <CarryItem>Personal Basic Medical Kit</CarryItem>
                <CarryItem>3 Quick Dry T-Shirts</CarryItem>
                <CarryItem>Mobile Charger / Power Bank</CarryItem>
                <CarryItem>Cold Cream</CarryItem>
                <CarryItem>3 Pairs of Cotton Socks</CarryItem>
                <CarryItem>Documents</CarryItem>
                <CarryItem>Quick Dry Towel</CarryItem>
                <CarryItem>Travel Laundry Bag</CarryItem>
                <CarryItem>Sanitizer</CarryItem>
                <CarryItem>Camera</CarryItem>
                <CarryItem>Sun Cap</CarryItem>
                <CarryItem>Lip Balm</CarryItem>
                <CarryItem>Sunglasses</CarryItem>
              </Reveal>
              <p className="note mt-5">
                If you wear spectacles, use Photochromic Glasses instead of
                contact lenses.
              </p>
            </div>

            {/* Cancellation policy — refund meter */}
            <div>
              <SectionHeading accent="#06201D" title="Cancellation Policy" />
              <div className="relative mt-6 pl-9">
                <span className="meter" aria-hidden="true" />
                <div className="space-y-3">
                  <CancelRow
                    color="#22C55E"
                    window="More than 60 days before departure"
                  >
                    Free cancellation. Booking amount is non-refundable.
                  </CancelRow>
                  <CancelRow color="#F5A83C" window="59–45 days before departure">
                    Booking amount (non-refundable) + 10% of remaining trip cost
                    charged. Remaining amount refunded.
                  </CancelRow>
                  <CancelRow color="#F2894E" window="44–30 days before departure">
                    Booking amount (non-refundable) + 25% of remaining trip cost
                    charged. Remaining amount refunded.
                  </CancelRow>
                  <CancelRow color="#E8637A" window="29–15 days before departure">
                    Booking amount (non-refundable) + 50% of remaining trip cost
                    charged. Remaining amount refunded.
                  </CancelRow>
                  <CancelRow color="#D64550" window="15–8 days before departure">
                    Booking amount (non-refundable) + 75% of remaining trip cost
                    charged. Remaining amount refunded.
                  </CancelRow>
                  <CancelRow color="#8E1B2E" window="Within 7 days of departure">
                    Booking amount (non-refundable) + 100% of remaining trip cost
                    charged. No refund.
                  </CancelRow>
                </div>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT: BOOKING CARD ===================== */}
          <div className="lg:col-span-1 lg:pt-8">
            <div className="sticky top-24">
              <Reveal>
                <div {...cardTilt} className="tilt bwrap">
                  <span className="spin" aria-hidden="true" />
                  <div className="bcard">
                    <p className="text-[13px] text-[var(--ink-68)]">Starting from</p>
                    <p className="disp text-[52px] font-extrabold leading-none tracking-tight text-[var(--ink)]">
                      <span className="rupee">₹</span>6,999
                      <span className="text-[14px] font-medium tracking-normal text-[var(--ink-68)]">
                        {" "}
                        /person
                      </span>
                    </p>

                    <div className="mt-6 space-y-3">
                      <PriceRow label="Double Sharing" price="₹7,999" />
                      <PriceRow label="Triple Sharing" price="₹7,499" />
                      <PriceRow label="Quad Sharing" price="₹6,999" best />
                    </div>
                    <p className="mt-2 text-[11.5px] text-[var(--ink-68)]">
                      + 5% GST on all plans
                    </p>

                    <NavLink
                      to="/packages/bir/enquiry"
                      onMouseMove={magnet}
                      onMouseLeave={unmagnet}
                      className="book mt-6"
                    >
                      Book Now
                      <span className="arr" aria-hidden>→</span>
                    </NavLink>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a
                        href="https://wa.me/919929190452?text=Hi!%20I'm%20interested%20in%20the%20Bir%20%E2%80%93%20McLeodganj%20package."
                        target="_blank"
                        rel="noreferrer"
                        title="Enquire on WhatsApp"
                        className="pill2"
                      >
                        <span className="well" style={{ background: "rgba(34,197,94,.14)" }}>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="#22C55E"
                            className="shrink-0"
                          >
                            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.4.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
                          </svg>
                        </span>
                        WhatsApp
                      </a>

                      <a
                        onClick={() => setShowModal(true)}
                        //href="/itineraries/bir-billing-itinerary.pdf"
                        // download="Bir-Billing-Itinerary.pdf"
                        // title="Download the full itinerary PDF"
                        role="button"
                        tabIndex={0}
                        className="pill2"
                      >
                        <span className="well" style={{ background: "rgba(63,168,222,.14)" }}>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="shrink-0"
                          >
                            <path
                              d="M12 3v11m0 0 3.5-3.5M12 14l-3.5-3.5M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
                              stroke="#3FA8DE"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Get Itinerary
                      </a>
                      <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        packageName="Bir – McLeodganj"
                        downloadUrl="/documents/Bir-Billing-Itinerary.pdf"
                        fileName="Bir-Billing-Itinerary.pdf"
                      />
                    </div>

                    <p className="mt-4 text-center text-[12px] text-[var(--ink-68)]">
                      Booking amount ₹2,000/person · Balance while boarding
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- small presentational helpers ---------------- */

function SectionHeading({ accent, title, compact }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <div className="flex items-center gap-3">
      <span className="glyph" style={{ "--a": accent }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M2.5 19L9.5 6l4 7 2.5-3.5L21.5 19Z" fill="#FFC94A" />
          <path d="M9.5 6l1.9 3.4-1.9-.9-1.9.9Z" fill="#FFFFFF" />
        </svg>
      </span>
      <h2
        className={`disp min-w-0 font-bold leading-[1.05] tracking-tight text-[var(--ink)] ${
          compact ? "text-[20px]" : "text-[26px] sm:text-[36px]"
        }`}
      >
        {words.join(" ")}
        {words.length ? " " : ""}
        <span className="serif">{last}</span>
      </h2>
      <span className="hair-r" style={{ "--a": accent }} aria-hidden="true" />
    </div>
  );
}

function TimelineItem({ accent, day, text, last }) {
  const num = day.match(/\d+/)?.[0] ?? "";
  const [ref, shown] = useReveal();
  const mid = `trl-${num}`;
  const odd = Number(num) % 2 === 1;
  return (
    <div
      ref={ref}
      className={`rv ${shown ? "in" : ""} group relative flex gap-4 ${last ? "pb-0" : "pb-10"}`}
    >
      {!last && (
        <svg
          className="trail-svg"
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <mask id={mid} maskUnits="userSpaceOnUse" x="-20" y="0" width="80" height="100">
              <path
                className="trail-mask"
                d={odd ? "M20 0C0 25 40 55 20 100" : "M20 0C40 25 0 55 20 100"}
                stroke="#fff"
                strokeWidth="6"
              />
            </mask>
          </defs>
          <path
            d={odd ? "M20 0C0 25 40 55 20 100" : "M20 0C40 25 0 55 20 100"}
            stroke={accent}
            strokeOpacity=".75"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
            mask={`url(#${mid})`}
          />
        </svg>
      )}
      <span className="relative z-10 block h-10 w-10 shrink-0 [perspective:420px]">
        <span className="halo" style={{ background: accent }} aria-hidden="true" />
        <span className="coin" style={{ "--a": accent, color: onAccent(accent) }}>
          {num}
        </span>
      </span>
      <div className="flex-1 pt-1">
        <p className="dlabel" style={{ background: `${accent}2E` }}>
          {day}
        </p>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[var(--ink)]">
          {text}
        </p>
      </div>
    </div>
  );
}

function DayCard({ accent, day, title, children }) {
  const [ref, shown] = useReveal();
  const tilt = useTilt(4);
  return (
    <div ref={ref} className={`rv ${shown ? "in" : ""}`}>
      <div {...tilt} className="dcard tilt" style={{ "--a": accent }}>
        <span className="rail" aria-hidden="true" />
        <span className="wm" aria-hidden="true">
          {String(day).padStart(2, "0")}
        </span>
        <div className="relative flex items-start gap-4 p-5 pl-7 sm:p-6 sm:pl-8">
          <span className="dbadge" style={{ color: onAccent(accent) }}>
            {day}
          </span>
          <div className="w-full">
            <h3 className="text-[16px] font-bold leading-snug text-[var(--ink)]">{title}</h3>
            <ul className="bul mt-3 space-y-1.5 text-[14px] leading-relaxed text-[var(--ink-76)]">
              {children}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="ck mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" style={{ fill: "var(--ckbg, rgba(34,197,94,.12))" }} />
        <path
          d="M8 12.5l2.5 2.5L16 9.5"
          pathLength="1"
          style={{ stroke: "var(--ck, #22C55E)" }}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </li>
  );
}

function CrossItem({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="#E8637A1F" />
        <path
          d="M9 9l6 6M15 9l-6 6"
          stroke="#E8637A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </li>
  );
}

function CarryItem({ children }) {
  return (
    <div className="chip">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC94A] shadow-[0_0_0_3px_rgba(255,201,74,.28)]" />
      {children}
    </div>
  );
}

function CancelRow({ color, window, children }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`cr ${shown ? "in" : ""}`}
      style={{ "--c": color, "--cw": `${color}24` }}
    >
      <span className="cr-node" aria-hidden="true" />
      <p className="text-[14px] font-bold text-[var(--ink)]">{window}</p>
      <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--ink-76)]">{children}</p>
    </div>
  );
}

function PriceRow({ label, price, best }) {
  return (
    <div className={`prow ${best ? "best" : ""}`}>
      <span className="relative z-[1] flex items-center gap-2 text-[13.5px] font-medium text-[var(--ink)]">
        {label}
        {best && <span className="ribbon">Best Value</span>}
      </span>
      <span className="disp relative z-[1] text-[16px] font-bold text-[var(--ink)]">{price}</span>
    </div>
  );
}