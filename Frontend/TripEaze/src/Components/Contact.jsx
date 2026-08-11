import React from "react";
import Navbar from '../Components/Navbar'
const contactDetails = [
  {
    label: "Name",
    value: "Utkarsh Yadav",
    icon: <path d="M20 21a8 8 0 1 0-16 0" />,
    icon2: <circle cx="12" cy="7" r="4" />,
  },
  {
    label: "Phone Number",
    value: "9929190452",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2Z" />
    ),
  },
  {
    label: "Address",
    value: "Etawah/Gorakhpur",
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EF] py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>
      <Navbar/>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
        {/* ---- Text + contact details ---- */}
        <div className="relative flex min-w-0 flex-col items-center overflow-hidden text-center">
          {/* decorative shapes */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute -left-10 top-8 grid grid-cols-4 gap-2.5 opacity-70">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
              ))}
            </div>
            <div className="absolute right-[8%] top-2 h-16 w-16 overflow-hidden rounded-t-full bg-[#F5A83C]" />
            <svg className="absolute left-[10%] top-24" width="90" height="30" viewBox="0 0 90 30" fill="none" stroke="#2DD4BF" strokeWidth="2.2">
              <path d="M2 15c5-8 10 8 15 0s10-8 15 0 10-8 15 0 10-8 15 0" />
            </svg>
            <div className="absolute -right-10 bottom-[10%] grid grid-cols-4 gap-2.5 opacity-70">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#F5A83C]" />
              ))}
            </div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#F5A83C]/80" />
          </div>

          <div className="relative">
            <h1 className="te-display text-4xl font-extrabold leading-[1.05] text-[#0B1330] sm:text-5xl lg:text-6xl">
              LET'S
              <br />
              <span className="text-[#0F8F86]">TRAVEL</span>
              <br />
              TOGETHER
            </h1>
            <span className="mx-auto mt-5 block h-1.5 w-24 rounded-full bg-[#F5A83C]" />

            <p className="te-body mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-[#3F4B63]">
              Have questions or want to plan your next adventure? We're here
              to help!
            </p>

            <div className="mx-auto mt-8 max-w-sm text-left divide-y divide-[#0B1330]/[0.08]">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-3.5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#0F8F86] text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {item.icon}
                      {item.icon2}
                    </svg>
                  </span>
                  <div>
                    <p className="te-display text-[15px] font-bold text-[#0B1330]">{item.value}</p>
                    <p className="text-xs text-[#8A93A8]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="te-body mx-auto mt-8 flex items-center justify-center gap-2 text-[15px] font-medium text-[#0F8F86]">
              We'd love to hear from you!
              <span className="text-[#F5A83C]">♥</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}