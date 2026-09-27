import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import aboutImage from "../assets/about2.png";

const principles = [
  { number: "01", title: "Trips with a point of view", copy: "We trade generic itineraries for considered routes, local texture, and enough room to make a place your own." },
  { number: "02", title: "The details are the journey", copy: "Thoughtful stays, clear plans, and the small practical decisions that let you travel with your mind at ease." },
  { number: "03", title: "Made for real travellers", copy: "No rushed checklists. Just well-paced experiences designed around the way people actually want to explore." },
];

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] pb-16 pt-28 text-[#10203a] sm:pb-24 sm:pt-36" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" />
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-end gap-10 border-b border-[#10203a]/15 pb-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:pb-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#c56b3f]"><span className="h-px w-9 bg-[#c56b3f]" />Our story</p>
            <h1 className="max-w-3xl text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Travel should feel like a story worth telling.</h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#526073] sm:text-lg">TripEaze is for curious people who want to see more than the obvious. We create easy, intentional getaways that bring you closer to the landscapes, flavours, and people that make a destination memorable.</p>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20 lg:py-20">
          <div className="relative">
            <div className="absolute -left-3 top-10 hidden h-[72%] w-full border border-[#c56b3f] lg:block" />
            <img src={aboutImage} alt="Traveller looking across a mountain valley" className="relative h-[430px] w-full object-cover sm:h-[560px]" />
            <div className="relative ml-auto -mt-20 mr-5 max-w-[300px] bg-[#10203a] px-6 py-6 text-white sm:mr-10 sm:px-8 sm:py-7"><p className="text-3xl leading-none" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>The best plans leave space for the unexpected.</p></div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c56b3f]">Why we exist</p>
            <h2 className="mt-5 text-4xl leading-tight tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Less planning noise. More moments that stay with you.</h2>
            <p className="mt-6 max-w-xl leading-8 text-[#526073]">Between endless tabs and one-size-fits-all tours, getting away can feel like work. We started TripEaze to make discovery feel simple again — with journeys that are carefully shaped but never over-scripted.</p>
            <Link to="/packages" className="mt-9 inline-flex w-fit items-center gap-3 border-b border-[#10203a] pb-2 text-sm font-bold text-[#10203a] transition-colors hover:border-[#c56b3f] hover:text-[#c56b3f]">Explore our journeys <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <section className="border-t border-[#10203a]/15 pt-12 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[.8fr_2.2fr] lg:gap-16">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c56b3f]">Our approach</p><h2 className="mt-4 text-3xl leading-tight tracking-[-0.04em] sm:text-4xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>What guides every escape.</h2></div>
            <div className="grid gap-0 divide-y divide-[#10203a]/15">
              {principles.map((principle) => <article key={principle.number} className="grid gap-4 py-7 first:pt-0 sm:grid-cols-[56px_1fr] sm:gap-7"><span className="text-sm font-bold text-[#c56b3f]">{principle.number}</span><div><h3 className="text-lg font-bold tracking-[-0.025em]">{principle.title}</h3><p className="mt-2 max-w-2xl leading-7 text-[#526073]">{principle.copy}</p></div></article>)}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
