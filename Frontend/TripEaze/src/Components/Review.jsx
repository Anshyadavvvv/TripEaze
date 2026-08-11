import React, { useEffect, useRef, useState } from 'react';

const reviewsData = [
  {
    id: 1,
    name: 'Manshi Sarkar',
    location: 'Kolkata, India',
    destination: 'Harsil Valley',
    date: 'March 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'I recently went on a trip with TripEaze, and it was hands down my best trip yet. I left a piece of my heart in Harsil Valley. The villages, valleys, and temples were beautiful and apple trees were everywhere.',
  },
  {
    id: 2,
    name: 'Priyanka Paul',
    location: 'Mumbai, India',
    destination: 'Chopta & Chandrashila',
    date: 'January 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Incredible first trip with TripEaze to Chopta, Tungnath, and Chandrashila! Everything was well taken care of, comfortable stays and good food made for smooth execution throughout the journey.',
  },
  {
    id: 3,
    name: 'Tejaswi Gupta',
    location: 'New Delhi, India',
    destination: 'Udaipur',
    date: 'December 2025',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Although I\u2019ve travelled solo many times, this group trip with friends to Udaipur was magical. When I returned, my heart was heavy with memories. I had an incredible time!',
  },
  {
    id: 4,
    name: 'Rahul Sharma',
    location: 'Bengaluru, India',
    destination: 'Spiti Valley',
    date: 'November 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Simply stunning! The arrangements were top notch. The views were breathtaking and the community vibe made everyone feel right at home from day one.',
  },
  {
    id: 5,
    name: 'Amit Verma',
    location: 'Pune, India',
    destination: 'Ladakh',
    date: 'October 2025',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Unforgettable trip! As a photographer, I got amazing frames throughout the journey. Perfect execution and management by the TripEaze team.',
  },
  {
    id: 6,
    name: 'Kavita Mehta',
    location: 'Ahmedabad, India',
    destination: 'Munnar',
    date: 'September 2025',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Best mountain retreat! The peaceful surroundings and guided hikes exceeded my expectations. Loved the homestay experience!',
  },
  {
    id: 7,
    name: 'Rohan Gupta',
    location: 'Jaipur, India',
    destination: 'Rishikesh',
    date: 'August 2025',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Great trip overall! Felt safe, comfortable, and well taken care of by the team. Met amazing fellow travellers along the way.',
  },
  {
    id: 8,
    name: 'Sunita Rao',
    location: 'Hyderabad, India',
    destination: 'Coorg',
    date: 'July 2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    verified: true,
    comment: 'Perfect balance of adventure and relaxation. The guides were extremely knowledgeable and friendly. Can\u2019t wait for my next trip!',
  },
];

const rowOf = (arr) => [...arr, ...arr]; // duplicate for a seamless loop

const row1 = rowOf(reviewsData);
const row2 = rowOf([...reviewsData].reverse());
const row3 = rowOf([...reviewsData.slice(3), ...reviewsData.slice(0, 3)]);

const accents = [
  { bg: '#F5A83C', text: '#B9720C' }, // gold
  { bg: '#2DD4BF', text: '#0F8F86' }, // teal
];

/** Fires once when the element scrolls into view; used for the fade-up reveal. */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

const Stars = ({ rating }) => (
  <div className="te-stars flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i < rating ? '#F5A83C' : 'none'}
        stroke="#F5A83C"
        strokeWidth="1.5"
        style={{ animationDelay: `${i * 140}ms` }}
      >
        <path d="M12 3.5l2.47 5.18 5.53.63-4.1 3.86 1.07 5.58L12 15.9l-4.97 2.85 1.07-5.58-4.1-3.86 5.53-.63L12 3.5Z" />
      </svg>
    ))}
  </div>
);

const VerifiedBadge = () => (
  <span className="te-verified-pulse inline-flex items-center gap-1 rounded-full border border-[#0F8F86]/30 bg-[#2DD4BF]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0F8F86]">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
    Verified
  </span>
);

function TestimonialCard({ review, accent }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="te-card group relative mx-3.5 w-[280px] flex-none cursor-pointer rounded-[24px] p-[1px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:scale-[1.03] sm:w-[320px] lg:w-[350px]"
    >
      {/* gradient border */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent.bg}80, rgba(11,19,48,0.06) 40%, ${accent.bg}40)`,
        }}
      />

      <div className="relative overflow-hidden rounded-[23px] border border-[#0B1330]/[0.07] bg-white/75 p-6 backdrop-blur-xl transition-shadow duration-500 group-hover:border-[#0B1330]/15"
        style={{ boxShadow: '0 20px 50px rgba(11,19,48,0.10)' }}
      >
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), ${accent.bg}26, transparent 65%)`,
          }}
        />
        {/* hover glow beneath */}
        <div
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[30px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${accent.bg}30` }}
        />

        {/* floating quote mark */}
        <span
          className="te-float absolute right-5 top-4 select-none font-serif text-3xl leading-none opacity-25"
          style={{ color: accent.bg }}
          aria-hidden
        >
          &rdquo;
        </span>

        <div className="relative mb-4 flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-12 w-12 rounded-full border-2 object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"
            style={{ borderColor: `${accent.bg}80` }}
          />
          <div className="min-w-0">
            <h4 className="truncate text-[15px] font-bold leading-tight text-[#0B1330]">
              {review.name}
            </h4>
            <span className="text-[12px] font-medium text-[#6B7488]">
              {review.location}
            </span>
          </div>
        </div>

        <div className="relative mb-3 flex items-center justify-between">
          <Stars rating={review.rating} />
          {review.verified && <VerifiedBadge />}
        </div>

        <p className="relative mb-5 text-[14px] font-normal text-[#3F4B63]" style={{ lineHeight: 1.8 }}>
          &ldquo;{review.comment}&rdquo;
        </p>

        <div className="relative flex items-center justify-between border-t border-[#0B1330]/[0.08] pt-3 text-[11.5px]">
          <span className="inline-flex items-center gap-1 font-semibold" style={{ color: accent.text }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {review.destination}
          </span>
          <span className="text-[#8A93A8]">{review.date}</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction, duration, delayMs, visible, className = '' }) {
  return (
    <div
      className={`te-row w-full overflow-hidden py-4 ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div
        className={`te-track flex w-max ${direction === 'right' ? 'te-marquee-right' : 'te-marquee-left'}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((review, index) => (
          <TestimonialCard
            key={`${review.id}-${direction}-${index}`}
            review={review}
            accent={accents[index % accents.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default function Review() {
  const [headingRef, headingVisible] = useReveal();

  return (
    <section className="te-motion relative overflow-hidden bg-[#FAF6EF] py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes te-marquee-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes te-marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .te-marquee-left  { animation-name: te-marquee-l; animation-timing-function: linear; animation-iteration-count: infinite; }
        .te-marquee-right { animation-name: te-marquee-r; animation-timing-function: linear; animation-iteration-count: infinite; }
        .te-row:has(.te-card:hover) .te-track { animation-play-state: paused; }

        @keyframes te-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -24px) scale(1.08); }
        }
        @keyframes te-drift {
          0% { transform: translateY(0) translateX(0); opacity: .2; }
          50% { opacity: .45; }
          100% { transform: translateY(-140px) translateX(12px); opacity: .08; }
        }
        @keyframes te-shimmer {
          0%, 100% { filter: drop-shadow(0 0 0 transparent); }
          50% { filter: drop-shadow(0 0 4px rgba(245,168,60,0.7)); }
        }
        .te-stars svg { animation: te-shimmer 3.2s ease-in-out infinite; }
        @keyframes te-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .te-verified-pulse { animation: te-pulse 3.6s ease-in-out infinite; }
        @keyframes te-float-quote {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .te-float { animation: te-float-quote 4.5s ease-in-out infinite; }

        .te-fade-up { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms ease; }
        .te-fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .te-row { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms ease; }
        .te-row.is-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .te-motion, .te-motion * { animation: none !important; transition: opacity 300ms ease !important; }
          .te-track { transform: none !important; }
        }
      `}</style>

      {/* ---- Background layers ---- */}
      <div className="pointer-events-none absolute inset-0">
        {/* blurred gradient blobs */}
        <div
          className="absolute -top-32 left-[8%] h-96 w-96 rounded-full opacity-30 blur-[90px]"
          style={{ background: '#F5A83C', animation: 'te-blob 16s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[-10%] right-[6%] h-[28rem] w-[28rem] rounded-full opacity-25 blur-[100px]"
          style={{ background: '#2DD4BF', animation: 'te-blob 20s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full opacity-[0.12] blur-[80px]"
          style={{ background: '#F5A83C', animation: 'te-blob 13s ease-in-out infinite' }}
        />

        {/* subtle mountain silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.05]"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          fill="#0B1330"
        >
          <path d="M0 220 L160 120 L280 180 L420 60 L560 170 L700 100 L860 200 L1000 90 L1160 190 L1300 130 L1440 210 L1440 260 L0 260 Z" />
        </svg>

        {/* drifting particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: `${(i * 29) % 90}%`,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              background: i % 2 === 0 ? '#F5A83C' : '#2DD4BF',
              animation: `te-drift ${9 + (i % 6)}s ease-in-out ${(i % 5) * 0.6}s infinite`,
            }}
          />
        ))}

        {/* faint noise texture */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ---- Header ---- */}
      <div
        ref={headingRef}
        className={`te-body te-fade-up relative mb-16 px-4 text-center ${headingVisible ? 'is-visible' : ''}`}
      >
        <span className="te-display text-xs font-semibold uppercase tracking-[0.25em] text-[#B9720C]">
          Testimonials
        </span>
        <h2 className="te-display mt-3 bg-gradient-to-br from-[#0B1330] via-[#0B1330] to-[#4B5675] bg-clip-text text-[32px] font-bold tracking-tight text-transparent sm:text-[48px]">
          Trusted by travellers everywhere
        </h2>
        <p className="te-body mx-auto mt-4 max-w-xl text-[15px] text-[#6B7488]">
          Real trips, real people. Here's what it's like to travel with TripEaze,
          straight from the people who've done it.
        </p>
      </div>

      {/* ---- Marquee rows ---- */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent_0,black_6%,black_94%,transparent_100%)]">
        <MarqueeRow items={row1} direction="left" duration={52} delayMs={150} visible={headingVisible} />
        <MarqueeRow items={row2} direction="right" duration={60} delayMs={280} visible={headingVisible} className="hidden md:block" />
        <MarqueeRow items={row3} direction="left" duration={68} delayMs={410} visible={headingVisible} className="hidden lg:block" />
      </div>
    </section>
  );
}