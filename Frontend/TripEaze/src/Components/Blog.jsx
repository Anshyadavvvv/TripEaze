import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import triundImage from "../assets/Triund.png";
import birImage from "../assets/Bir.png";
import kasolImage from "../assets/Kasol.png";

const stories = [
  { category: "Mountain notes", date: "08 Aug 2026", title: "A quieter way to meet the Himalayas", copy: "The small choices that make a mountain escape feel less rushed and far more rewarding.", image: triundImage, alt: "View of the Himalayan mountains" },
  { category: "On the road", date: "25 Jul 2026", title: "Why Bir is made for an unhurried weekend", copy: "Paragliding may draw you in, but the valley's slower rhythm is the real reason to stay.", image: birImage, alt: "Landscape in Bir" },
  { category: "Field guide", date: "10 Jul 2026", title: "Kasol beyond the usual itinerary", copy: "A thoughtful route through forest trails, riverside stops, and the corners worth lingering in.", image: kasolImage, alt: "Kasol valley scenery" },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] pb-16 pt-28 text-[#10203a] sm:pb-24 sm:pt-36" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" />
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <header className="border-b border-[#10203a]/15 pb-11 sm:pb-14">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#c56b3f]"><span className="h-px w-9 bg-[#c56b3f]" />The TripEaze journal</p>
          <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><h1 className="text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Good places. Better stories.</h1><p className="max-w-lg leading-8 text-[#526073] sm:text-lg">Practical notes, local perspective, and a little inspiration for the next time you decide to go.</p></div>
        </header>

        <section className="grid gap-0 border-b border-[#10203a]/15 py-12 lg:grid-cols-[1.3fr_.7fr] lg:py-16">
          <div className="pr-0 lg:pr-16"><div className="overflow-hidden bg-[#d9ded7]"><img src={stories[0].image} alt={stories[0].alt} className="h-[300px] w-full object-cover sm:h-[430px]" /></div></div>
          <article className="flex flex-col justify-center pt-7 lg:pt-0"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c56b3f]">Featured / {stories[0].date}</p><h2 className="mt-5 text-3xl leading-tight tracking-[-0.04em] sm:text-4xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{stories[0].title}</h2><p className="mt-5 max-w-md leading-7 text-[#526073]">{stories[0].copy}</p><span className="mt-7 inline-flex w-fit items-center gap-3 border-b border-[#10203a] pb-2 text-sm font-bold">Read story <span aria-hidden="true">↗</span></span></article>
        </section>

        <section className="pt-12 lg:pt-16">
          <div className="mb-8 flex items-center justify-between sm:mb-10"><h2 className="text-2xl tracking-[-0.04em] sm:text-3xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Latest dispatches</h2><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#738093]">03 stories</span></div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-7">
            {stories.map((story) => <article key={story.title} className="group"><div className="overflow-hidden bg-[#e9e5dc]"><img src={story.image} alt={story.alt} className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-72" /></div><div className="border-b border-[#10203a]/15 pb-7 pt-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c56b3f]">{story.category} <span className="mx-2 text-[#10203a]/35">/</span> {story.date}</p><h3 className="mt-3 text-2xl leading-tight tracking-[-0.035em]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{story.title}</h3><p className="mt-3 text-sm leading-6 text-[#526073]">{story.copy}</p><span className="mt-5 inline-block text-sm font-bold transition-colors group-hover:text-[#c56b3f]">Read notes →</span></div></article>)}
          </div>
        </section>

        <section className="mt-16 bg-[#10203a] px-7 py-10 text-white sm:mt-24 sm:flex sm:items-center sm:justify-between sm:px-12 sm:py-12"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e4a26f]">Ready when you are</p><h2 className="mt-3 text-3xl tracking-[-0.035em] sm:text-4xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Find your next good story.</h2></div><Link to="/packages" className="mt-7 inline-flex items-center gap-3 bg-[#f7f4ee] px-5 py-3 text-sm font-bold text-[#10203a] transition-colors hover:bg-[#e4a26f] sm:mt-0">Explore trips <span aria-hidden="true">→</span></Link></section>
      </section>
    </main>
  );
}
