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

const accents = [
  { bg: '#F5A83C', text: '#B9720C' }, // gold
  { bg: '#2DD4BF', text: '#0F8F86' }, // teal
];

// Cycles each card through cream / navy-dark / accent-gradient backgrounds,
// the way the reference stack mixes light, dark and colour cards.
const themeOf = (i) => ['light', 'dark', 'accent'][i % 3];

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

function Stars({ rating, theme }) {
  const dim = theme === 'dark' ? 'text-white/25' : 'text-[#0B1330]/15';
  const fill = theme === 'accent' ? '#0B1330' : '#F5A83C';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? fill : 'none'}
          stroke={i < rating ? fill : 'currentColor'}
          strokeWidth="1.6"
          className={i < rating ? '' : dim}
        >
          <path d="M12 3.5l2.47 5.18 5.53.63-4.1 3.86 1.07 5.58L12 15.9l-4.97 2.85 1.07-5.58-4.1-3.86 5.53-.63L12 3.5Z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge({ theme }) {
  const styles =
    theme === 'dark'
      ? 'border-white/20 bg-white/10 text-white/80'
      : theme === 'accent'
      ? 'border-[#0B1330]/25 bg-[#0B1330]/10 text-[#0B1330]'
      : 'border-[#0F8F86]/30 bg-[#2DD4BF]/10 text-[#0F8F86]';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${styles}`}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      Verified
    </span>
  );
}

const themeClasses = {
  light: 'bg-[#FAF6EF] text-[#0B1330]',
  dark: 'bg-[#0B1330] text-white',
  accent: 'text-[#0B1330]',
};

function TestimonialCard({ review, index, style, accent }) {
  const theme = themeOf(index);
  const isAccent = theme === 'accent';

  return (
    <div
      tabIndex={0}
      className={`te-card absolute w-[220px] cursor-pointer rounded-[22px] p-5 shadow-[0_20px_45px_-15px_rgba(11,19,48,0.35)] outline-none sm:w-[248px] sm:p-6 ${themeClasses[theme]}`}
      style={{
        ...style,
        background: isAccent
          ? `linear-gradient(150deg, ${accent.bg}, ${accent.bg}CC)`
          : undefined,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className={`h-10 w-10 flex-shrink-0 rounded-full border-2 object-cover ${
            theme === 'dark' ? 'border-white/20' : theme === 'accent' ? 'border-[#0B1330]/25' : 'border-[#0F8F86]/30'
          }`}
        />
        <div className="min-w-0">
          <h4 className="truncate text-[13.5px] font-bold leading-tight">{review.name}</h4>
          <p
            className="truncate text-[11px]"
            style={{ opacity: theme === 'light' ? 0.55 : 0.6 }}
          >
            {review.location}
          </p>
        </div>
      </div>

      <div className="mb-2.5 flex items-center justify-between">
        <Stars rating={review.rating} theme={theme} />
        {review.verified && <VerifiedBadge theme={theme} />}
      </div>

      <p
        className="te-quote text-[13px] leading-relaxed"
        style={{ opacity: theme === 'light' ? 0.75 : 0.88 }}
      >
        &ldquo;{review.comment}&rdquo;
      </p>

      <div
        className={`mt-4 flex items-center justify-between border-t pt-3 text-[10.5px] font-semibold ${
          theme === 'dark' ? 'border-white/15' : theme === 'accent' ? 'border-[#0B1330]/15' : 'border-[#0B1330]/10'
        }`}
      >
        <span className="inline-flex items-center gap-1" style={{ color: theme === 'light' ? accent.text : 'inherit' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {review.destination}
        </span>
        <span style={{ opacity: 0.6 }}>{review.date}</span>
      </div>
    </div>
  );
}

/** Lays cards out along a shallow arc, like cards fanned in a hand — center
 * card sits lowest/flattest, outer cards fan up and rotate outward. */
function layoutFor(i, n) {
  const center = (n - 1) / 2;
  const offset = i - center;
  const norm = center === 0 ? 0 : offset / center; // -1 .. 1

  const angleStep = 6; // deg per card from center
  const hStep = 7.6; // % horizontal spacing per card from center
  const arcAmplitude = 12; // % — how much outer cards rise

  const rotate = offset * angleStep;
  const left = 50 + offset * hStep;
  const top = 42 - arcAmplitude * norm * norm;
  const z = Math.round((n - Math.abs(offset)) * 10);

  return { rotate, left, top, z };
}

export default function Review() {
  const [headingRef, headingVisible] = useReveal();
  const n = reviewsData.length;

  return (
    <section className="te-motion relative overflow-hidden bg-[#FAF6EF] py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        .te-quote {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .te-card {
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .te-card:hover,
        .te-card:focus-visible {
          transform: translate(-50%, -50%) rotate(0deg) translateY(-20px) scale(1.08) !important;
          z-index: 999 !important;
          box-shadow: 0 45px 90px -20px rgba(11,19,48,0.45);
        }
        .te-card:hover .te-quote,
        .te-card:focus-visible .te-quote {
          -webkit-line-clamp: unset;
        }

        .te-fade-up { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms ease; }
        .te-fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .te-stack { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms ease; transition-delay: 150ms; }
        .te-stack.is-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .te-motion, .te-motion * { animation: none !important; }
          .te-card { transition: box-shadow 200ms ease; }
        }
      `}</style>

      {/* quiet ambient glow — one place to spend the boldness, not scattered */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: '#F5A83C' }}
      />

      {/* ---- Header ---- */}
      <div
        ref={headingRef}
        className={`te-body te-fade-up relative mb-6 px-4 text-center ${headingVisible ? 'is-visible' : ''}`}
      >
        <span className="te-display text-xs font-semibold uppercase tracking-[0.25em] text-[#B9720C]">
          Testimonials
        </span>
        <h2 className="te-display mt-3 text-[32px] font-bold tracking-tight text-[#0B1330] sm:text-[48px]">
          Trusted by travellers everywhere
        </h2>
        <p className="te-body mx-auto mt-4 max-w-xl text-[15px] text-[#6B7488]">
          Real trips, real people. Hover a card to read the full story behind the rating.
        </p>
      </div>

      {/* ---- Fanned card stack ---- */}
      <div
        className={`te-stack relative mx-auto mt-14 h-[420px] w-full max-w-4xl px-4 sm:h-[460px] ${headingVisible ? 'is-visible' : ''}`}
      >
        {reviewsData.map((review, i) => {
          const { rotate, left, top, z } = layoutFor(i, n);
          return (
            <TestimonialCard
              key={review.id}
              review={review}
              index={i}
              accent={accents[i % accents.length]}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                zIndex: z,
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}