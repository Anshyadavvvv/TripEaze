/*
  Blog.jsx — editorial preview section for the TripEaze homepage.
  No photography, no icon illustrations: each story gets a duotone
  colour plate carrying an oversized cropped wordmark, echoing the
  giant-type treatment already used elsewhere on the site (Footer,
  Hero). One featured story + a short reading list, print-inspired.
*/

function CoverPlate({ from, to, word, wordClassName, className }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex select-none items-end justify-center whitespace-nowrap font-extrabold leading-none tracking-tighter text-white/[0.16] ${wordClassName}`}
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {word}
      </span>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />
    </div>
  );
}

const featured = {
  id: "himalayan-treks",
  category: "Trekking",
  accent: "#4B4F8C",
  from: "#0B1330",
  to: "#2A2F63",
  word: "Himalaya",
  title: "5 Himalayan treks every first-timer should attempt",
  excerpt:
    "From gentle day hikes near Triund to a proper multi-day climb toward Chandrashila — a beginner's map to the ranges.",
  readTime: "6 min read",
  date: "Aug 2026",
};

const secondaryPosts = [
  {
    id: "western-coast-beaches",
    category: "Coastal",
    accent: "#0E7C72",
    from: "#0E4F4A",
    to: "#2DD4BF",
    letter: "C",
    title: "Hidden beaches along India's western coast",
    readTime: "5 min read",
    date: "Jul 2026",
  },
  {
    id: "udaipur-weekend",
    category: "City guide",
    accent: "#B9701F",
    from: "#7A3B1E",
    to: "#F5A83C",
    letter: "U",
    title: "48 hours in Udaipur: a weekend itinerary",
    readTime: "4 min read",
    date: "Jul 2026",
  },
  {
    id: "spiti-road-trip",
    category: "Road trips",
    accent: "#B23F63",
    from: "#4A1942",
    to: "#E8637A",
    letter: "S",
    title: "The ultimate Spiti Valley road trip route",
    readTime: "7 min read",
    date: "Jun 2026",
  },
];

export default function Blog() {
  return (
    <section
      className="relative bg-white py-20 sm:py-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes te-rise {
          0% { transform: translateY(18px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .te-rise { animation: te-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .te-rise { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Masthead */}
        <div className="te-rise flex flex-col gap-4 border-b border-[#0B1330]/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
          <h2
            className="text-[32px] font-bold leading-tight tracking-tight text-[#0B1330] sm:text-[40px] lg:text-[44px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Notes from the road
          </h2>
          <a
            href="/blog"
            className="inline-block shrink-0 border-b border-[#0B1330]/20 pb-0.5 text-sm font-semibold text-[#0B1330] transition-colors duration-200 hover:border-[#F5A83C] hover:text-[#F5A83C]"
          >
            View all stories
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Featured story */}
          <article
            className="te-rise lg:col-span-7"
            style={{ animationDelay: "120ms" }}
          >
            <a href={`/blog/${featured.id}`} className="group block">
              <CoverPlate
                from={featured.from}
                to={featured.to}
                word={featured.word}
                wordClassName="text-[4rem] pb-2 sm:text-[6rem] lg:text-[7.5rem]"
                className="aspect-[4/3] rounded-[28px] shadow-[0_25px_60px_-20px_rgba(11,19,48,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:aspect-[16/10] lg:aspect-[4/5]"
              />
            </a>
            <div className="mt-6">
              <p className="text-sm font-semibold" style={{ color: featured.accent }}>
                {featured.category}
              </p>
              <h3
                className="mt-2 text-2xl font-bold leading-snug text-[#0B1330] sm:text-[28px]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                <a href={`/blog/${featured.id}`} className="hover:text-[#F5A83C] transition-colors duration-200">
                  {featured.title}
                </a>
              </h3>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#5A6394]">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-[#8891B5]">
                <span>{featured.readTime}</span>
                <span aria-hidden="true">•</span>
                <span>{featured.date}</span>
              </div>
            </div>
          </article>

          {/* Reading list */}
          <div
            className="te-rise flex flex-col divide-y divide-[#0B1330]/[0.08] lg:col-span-5"
            style={{ animationDelay: "220ms" }}
          >
            {secondaryPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex items-center gap-5 py-6 first:pt-0 last:pb-0"
              >
                <CoverPlate
                  from={post.from}
                  to={post.to}
                  word={post.letter}
                  wordClassName="text-[3.25rem] pb-0.5 sm:text-[3.75rem]"
                  className="h-20 w-20 shrink-0 rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105 sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold" style={{ color: post.accent }}>
                    {post.category}
                  </p>
                  <h4
                    className="mt-1 truncate text-base font-bold text-[#0B1330] sm:text-[17px]"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {post.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#8891B5]">
                    {post.readTime} · {post.date}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-[#0B1330]/25 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#F5A83C]"
                >
                  ›
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}