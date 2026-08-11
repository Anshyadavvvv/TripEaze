import { useState } from "react";


export default function FAQ() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  return (
    <section
      className="bg-[#F6F6FA] py-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&display=swap"
      />

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#F5A83C]">
            Good To Know
          </p>
          <h2
            className="mt-2 text-[30px] font-bold leading-tight text-[#0B1330] sm:text-[38px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Questions? We've got answers
          </h2>
        </div>

        {/* ---------- 1 ---------- */}
        <div className="mb-4 rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
          <button
            onClick={() => setOpen1((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-[15px] font-semibold text-[#0B1330]">
              How do I book a trip?
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 text-[#0B1330]/40 transition-transform duration-300 ${
                open1 ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              open1 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-[#0B1330]/60">
                Pick a package, tap "View", and fill the short enquiry form
                with your details and travel dates. Our team calls you within
                a day to confirm everything and share payment details.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- 2 ---------- */}
        <div className="mb-4 rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
          <button
            onClick={() => setOpen2((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-[15px] font-semibold text-[#0B1330]">
              What payment methods do you accept?
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 text-[#0B1330]/40 transition-transform duration-300 ${
                open2 ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              open2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-[#0B1330]/60">
                UPI, bank transfer, and all major debit/credit cards. A
                partial advance confirms your booking, with the balance due
                before departure.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- 3 ---------- */}
        <div className="mb-4 rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
          <button
            onClick={() => setOpen3((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-[15px] font-semibold text-[#0B1330]">
              What's included in a package?
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 text-[#0B1330]/40 transition-transform duration-300 ${
                open3 ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              open3 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-[#0B1330]/60">
                Stays, local transfers, and the activities listed on each
                package page. Flights and meals are included only where
                specifically mentioned — every package page lists this
                clearly.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- 4 ---------- */}
        <div className="mb-4 rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
          <button
            onClick={() => setOpen4((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-[15px] font-semibold text-[#0B1330]">
              Can you plan a fully custom trip?
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 text-[#0B1330]/40 transition-transform duration-300 ${
                open4 ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              open4 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-[#0B1330]/60">
                Yes. Mention it in the enquiry form or reach out directly —
                our team will build an itinerary around your dates, budget
                and the places you want to see.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- 5 ---------- */}
        <div className="rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
          <button
            onClick={() => setOpen5((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-[15px] font-semibold text-[#0B1330]">
              What's your cancellation policy?
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 text-[#0B1330]/40 transition-transform duration-300 ${
                open5 ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
              open5 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-[#0B1330]/60">
                Full refund if cancelled 7+ days before departure, minus a
                small processing fee. Partial refund within 7 days —
                specifics are shared at the time of booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}