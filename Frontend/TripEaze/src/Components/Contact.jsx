import Navbar from "./Navbar";
import contactImage from "../assets/contact.png";

const contactDetails = [
  { label: "Call us", value: "9929190452", href: "tel:9929190452" },
  { label: "Find us", value: "Delhi, India", href: "https://maps.google.com/?q=Delhi,India" },
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] pb-16 pt-28 text-[#10203a] sm:pb-24 sm:pt-36" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" />
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid overflow-hidden border border-[#10203a]/15 lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative min-h-[360px] bg-[#203856] lg:min-h-[690px]"><img src={contactImage} alt="Traveller looking out at a mountain view" className="absolute inset-0 h-full w-full object-cover opacity-80" /><div className="absolute inset-0 bg-[#10203a]/45" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10"><p className="max-w-sm text-3xl leading-tight tracking-[-0.035em] sm:text-4xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>A good trip starts with a simple hello.</p></div></div>
          <div className="px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#c56b3f]"><span className="h-px w-9 bg-[#c56b3f]" />Contact TripEaze</p>
            <h1 className="mt-6 text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Let’s plan something worth looking forward to.</h1>
            <p className="mt-6 max-w-lg leading-8 text-[#526073]">Whether you already know where you want to go or just need a spark, our team is here to help you shape the right escape.</p>
            <div className="mt-10 divide-y divide-[#10203a]/15 border-y border-[#10203a]/15">
              {contactDetails.map((detail) => <a key={detail.label} href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noreferrer" : undefined} className="group flex items-center justify-between gap-5 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.17em] text-[#738093]">{detail.label}</p><p className="mt-1 text-lg font-semibold tracking-[-0.02em] group-hover:text-[#c56b3f]">{detail.value}</p></div><span className="text-xl text-[#c56b3f] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span></a>)}
            </div>
            <div className="mt-10 border-l-2 border-[#c56b3f] pl-5"><p className="text-sm font-bold text-[#10203a]">Planning a group getaway?</p><p className="mt-1 text-sm leading-6 text-[#526073]">Call us with your dates and destination ideas. We’ll take it from there.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
