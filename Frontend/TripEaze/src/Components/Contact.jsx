import Navbar from "./Navbar";

const contactDetails = [
  { label: "Call us", value: "+91 99291 90452", href: "tel:+919929190452" },
  { label: "Email us", value: "hello@tripeaze.in", href: "mailto:hello@tripeaze.in" },
  { label: "Find us", value: "Delhi, India", href: "https://maps.google.com/?q=Delhi,India" },
];

export default function Contact() {
  return (
    <main
      className="min-h-screen bg-[#F4F5F0] pb-16 pt-28 text-[#142620] sm:pb-24 sm:pt-36"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap"
      />
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid overflow-hidden rounded-sm border border-[#142620]/15 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: typographic panel, replaces the photo */}
          <div className="flex min-h-[300px] flex-col justify-between bg-[#142620] p-9 text-[#F4F5F0] sm:p-12 lg:min-h-[640px] lg:p-14">
            <p className="text-sm tracking-tight text-[#B08D2D]">TripEaze</p>
            <p
              className="max-w-sm text-[2.1rem] leading-[1.15] tracking-[-0.02em] sm:text-4xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              A good trip starts with a simple hello.
            </p>
            <p className="max-w-xs text-sm leading-6 text-[#F4F5F0]/70">
              Tell us where you’re headed and we’ll take care of the rest.
            </p>
          </div>

          {/* Right: content */}
          <div className="px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <h1
              className="text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Let’s plan something worth looking forward to.
            </h1>
            <p className="mt-6 max-w-lg leading-7 text-[#5B6B63]">
              Whether you already know where you want to go or just need a
              spark, our team is here to help you shape the right escape.
            </p>

            <div className="mt-10 divide-y divide-[#142620]/12 border-y border-[#142620]/12">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-5 py-5"
                >
                  <div>
                    <p className="text-sm text-[#5B6B63]">{detail.label}</p>
                    <p className="mt-1 text-lg font-medium tracking-[-0.01em] group-hover:text-[#B08D2D]">
                      {detail.value}
                    </p>
                  </div>
                  <span
                    className="text-xl text-[#B08D2D] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 border-l-2 border-[#B08D2D] pl-5">
              <p className="text-sm font-medium text-[#142620]">
                Planning a group getaway?
              </p>
              <p className="mt-1 text-sm leading-6 text-[#5B6B63]">
                Call us with your dates and destination ideas. We’ll take it
                from there.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}