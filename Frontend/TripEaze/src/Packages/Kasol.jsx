import Navbar from "../Components/Navbar";
import KasolImage from "../assets/Kasol.png";
import { NavLink } from "react-router-dom";
export default function Kasol() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kasol-fade-1 { animation: fadeInUp 0.7s ease-out both; }
        .kasol-fade-2 { animation: fadeInUp 0.7s ease-out 0.12s both; }
        .kasol-fade-3 { animation: fadeInUp 0.7s ease-out 0.24s both; }
      `}</style>

      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-[#0B1330]">
        <img
          src={KasolImage}
          alt="Kasol river and pine forest"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1330] via-[#0B1330]/30 to-[#0B1330]/10" />

        <div className="absolute bottom-8 left-0 w-full px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <span className="kasol-fade-1 inline-block rounded-full bg-[#F5A83C] px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#0B1330]">
              Leisure · 3N/4D
            </span>
            <h1
              className="kasol-fade-2 mt-4 text-[38px] font-bold leading-tight text-white sm:text-[54px]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Kasol – Manali
            </h1>
            <p className="kasol-fade-3 mt-2 max-w-xl text-[15px] text-white/70">
              Pine forests, the Parvati river, snow-tunnel drives and cafe
              hopping — the Himachal loop that mixes adventure with a slow,
              scenic wind-down.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="bg-[#F7F7FB] py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-3">
          {/* ===================== LEFT: CONTENT ===================== */}
          <div className="space-y-14 lg:col-span-2">
            {/* Quick meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-[#0B1330]/[0.06] bg-white px-6 py-4 shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
              <div className="flex items-center gap-2 text-[14px] font-medium text-[#0B1330]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#F2894E"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="#F2894E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                3 Nights / 4 Days
              </div>
              <div className="hidden h-4 w-px bg-[#0B1330]/10 sm:block" />
              <a
                href="tel:+919929190452"
                className="flex items-center gap-2 text-[14px] font-medium text-[#0B1330] transition-colors hover:text-[#F2894E]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
                    stroke="#3FA8DE"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                +91 99291 90452
              </a>
              <div className="hidden h-4 w-px bg-[#0B1330]/10 sm:block" />
              <div className="flex items-center gap-2 text-[14px] font-medium text-[#0B1330]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#E8637A"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
                    stroke="#E8637A"
                    strokeWidth="1.8"
                  />
                </svg>
                tripeaze.in
              </div>
            </div>

            {/* Brief itinerary — snapshot timeline */}
            <div>
              <SectionHeading accent="#F2894E" title="Brief Itinerary" />
              <div className="relative mt-8 space-y-8 border-l-2 border-dashed border-[#0B1330]/15 pl-8">
                <TimelineItem
                  accent="#F2894E"
                  day="Day 0"
                  text="Departure from Delhi"
                />
                <TimelineItem
                  accent="#E8637A"
                  day="Day 1"
                  text="Manali Local"
                />
                <TimelineItem
                  accent="#3FA8DE"
                  day="Day 2"
                  text="Sissu – Atal Tunnel | Solang Valley"
                />
                <TimelineItem
                  accent="#F5A83C"
                  day="Day 3"
                  text="Kullu – Kasol Local"
                />
                <TimelineItem
                  accent="#22C55E"
                  day="Day 4"
                  text="Chalal Village | Manikaran | Local Market & Departure"
                />
                <TimelineItem
                  accent="#0B1330"
                  day="Day 5"
                  text="Reach back to Delhi by Early Morning"
                  last
                />
              </div>
            </div>

            {/* Detailed itinerary */}
            <div>
              <SectionHeading accent="#3FA8DE" title="Detailed Itinerary" />

              <div className="mt-8 space-y-5">
                <DayCard accent="#F2894E" day="0" title="Departure from Delhi">
                  <li>Departure in the Evening.</li>
                  <li>The group will assemble at Pickup Point.</li>
                  <li>
                    Afterward, you'll get a small briefing from the trip leader.
                  </li>
                  <li>Halt for Dinner in-between (at own cost).</li>
                </DayCard>

                <DayCard accent="#E8637A" day="1" title="Manali Local">
                  <li>
                    Reach Manali in the morning, check-in at hotel at Manali.
                  </li>
                  <li>
                    Relax a bit before starting your day out with nature: Jogini
                    Waterfalls and Vashisht Temple.
                  </li>
                  <li>
                    Later in the evening you are free to explore old Manali
                    cafes and Mall Road.
                  </li>
                  <li>
                    Return back to hotel and have dinner at night before a sound
                    sleep.
                  </li>
                </DayCard>

                <DayCard
                  accent="#3FA8DE"
                  day="2"
                  title="Sissu – Atal Tunnel | Solang Valley"
                >
                  <li>
                    Get up early and enjoy spectacular view of valley from
                    hotel.
                  </li>
                  <li>
                    Delicious breakfast before your day out for a scenic drive
                    into Atal Tunnel (8 km long), passing through a dramatic
                    change in landscapes.
                  </li>
                  <li>
                    Special tea break at Sissu village (Lahaul) — enjoy
                    activities & Sissu waterfall.
                  </li>
                  <li>
                    Return back to Solang valley for adventure activities like
                    paragliding, skiing, zorbing ball, etc.
                  </li>
                </DayCard>

                <DayCard accent="#F5A83C" day="3" title="Kullu – Kasol Local">
                  <li>
                    Wake up in the morning and enjoy scenic beauty from hotel.
                  </li>
                  <li>
                    After breakfast, check out from hotel and head to Kullu for
                    River Rafting (self-paid).
                  </li>
                  <li>Explore the local market in Kullu if time permits.</li>
                  <li>
                    Depart for our Kasol staysite and reach in the evening.
                  </li>
                  <li>Enjoy bonfire with music and dinner later on.</li>
                  <li>Overnight stay in Kasol.</li>
                </DayCard>

                <DayCard
                  accent="#22C55E"
                  day="4"
                  title="Chalal Village | Manikaran | Local Market & Departure"
                >
                  <li>
                    Wake up early to enjoy the stunning, scenic landscape.
                  </li>
                  <li>
                    Freshen up, have breakfast, and checkout from staysite.
                  </li>
                  <li>
                    Explore local Chalal village, then trek to Chalal bridge
                    along the Parvati river.
                  </li>
                  <li>
                    Reach Kasol market — try different cuisines at the Israeli
                    cafes.
                  </li>
                  <li>
                    Later in the afternoon, drive to Manikaran Sahib and spend
                    some time there.
                  </li>
                  <li>Begin the journey back to Delhi.</li>
                </DayCard>

                <DayCard
                  accent="#0B1330"
                  day="5"
                  title="Reach back to Delhi by Early Morning"
                >
                  <li>
                    Reach Delhi early in the morning with a bucketload of
                    memories and endless pictures.
                  </li>
                  <li>Bid goodbye to our fellow travelers.</li>
                </DayCard>
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#0B1330]/[0.06] bg-white p-6 shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
                <h3
                  className="text-[17px] font-bold text-[#0B1330]"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Inclusions
                </h3>
                <ul className="mt-4 space-y-3 text-[14px] text-[#0B1330]/70">
                  <CheckItem>2 Nights stay at Manali (Hotel)</CheckItem>
                  <CheckItem>1 Night stay at Kasol</CheckItem>
                  <CheckItem>6 Meals — 3 Breakfast, 3 Dinner</CheckItem>
                  <CheckItem>Transfer to/from in AC Deluxe Bus/TT</CheckItem>
                  <CheckItem>Sightseeing as per itinerary</CheckItem>
                  <CheckItem>
                    Experienced Trip Captain throughout the trip
                  </CheckItem>
                  <CheckItem>Bonfire (if weather permits)</CheckItem>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#0B1330]/[0.06] bg-white p-6 shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
                <h3
                  className="text-[17px] font-bold text-[#0B1330]"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Exclusions
                </h3>
                <ul className="mt-4 space-y-3 text-[14px] text-[#0B1330]/70">
                  <CrossItem>Any other food & beverages</CrossItem>
                  <CrossItem>River Rafting</CrossItem>
                  <CrossItem>Entry tickets at the viewpoints</CrossItem>
                  <CrossItem>Expenses not mentioned in inclusions</CrossItem>
                  <CrossItem>
                    Extra cost due to natural circumstances beyond control
                  </CrossItem>
                </ul>
              </div>
            </div>

            {/* Booking process */}
            <div className="rounded-2xl border border-[#0B1330]/[0.06] bg-white p-6 shadow-[0_2px_10px_rgba(11,19,48,0.04)]">
              <SectionHeading
                accent="#F5A83C"
                title="Booking Process"
                compact
              />
              <ul className="mt-5 space-y-3 text-[14px] text-[#0B1330]/70">
                <CheckItem>Booking Amount: ₹2,000 per person</CheckItem>
                <CheckItem>Balance amount to be paid while boarding</CheckItem>
              </ul>
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F7F7FB] px-4 py-3 text-[14px] font-semibold text-[#0B1330]">
                UPI:{" "}
                <span className="text-[#3FA8DE]">utkarshveeryadav@oksbi</span>
              </div>
            </div>

            {/* Things to carry */}
            <div>
              <SectionHeading accent="#E8637A" title="Things to Carry" />
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-[#0B1330]/[0.06] bg-white p-6 text-[14px] text-[#0B1330]/70 shadow-[0_2px_10px_rgba(11,19,48,0.04)] sm:grid-cols-3">
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
              </div>
              <p className="mt-3 text-[13px] italic text-[#0B1330]/45">
                If you wear spectacles, use Photochromic Glasses instead of
                contact lenses.
              </p>
            </div>

            {/* Cancellation policy */}
            <div>
              <SectionHeading accent="#0B1330" title="Cancellation Policy" />
              <div className="mt-6 space-y-3">
                <CancelRow color="#22C55E" window="60+ days before departure">
                  Free cancellation. Booking amount is non-refundable.
                </CancelRow>
                <CancelRow color="#F5A83C" window="59–45 days before departure">
                  10% of the total trip cost (after subtracting the booking
                  amount) plus the non-refundable booking amount is charged as a
                  cancellation fee; the remaining amount is refunded.
                </CancelRow>
                <CancelRow color="#F2894E" window="44–30 days before departure">
                  25% of the total trip cost (after subtracting the booking
                  amount) plus the non-refundable booking amount is charged as a
                  cancellation fee; the remaining amount is refunded.
                </CancelRow>
                <CancelRow color="#E8637A" window="29–15 days before departure">
                  50% of the total trip cost (after subtracting the booking
                  amount) plus the non-refundable booking amount is charged as a
                  cancellation fee; the remaining amount is refunded.
                </CancelRow>
                <CancelRow color="#D64550" window="15–8 days before departure">
                  75% of the total trip cost (after subtracting the booking
                  amount) plus the non-refundable booking amount is charged as a
                  cancellation fee; the remaining amount is refunded.
                </CancelRow>
                <CancelRow color="#0B1330" window="Within 7 days of departure">
                  100% of the total trip cost (after subtracting the booking
                  amount) plus the non-refundable booking amount is charged as a
                  cancellation fee. No refund.
                </CancelRow>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT: BOOKING CARD ===================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-[#0B1330]/[0.06] bg-white p-6 shadow-[0_10px_40px_-10px_rgba(11,19,48,0.15)]">
              <p className="text-[13px] text-[#0B1330]/50">Starting from</p>
              <p
                className="text-[34px] font-bold text-[#0B1330]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                ₹6,999
                <span className="text-[14px] font-medium text-[#0B1330]/45">
                  {" "}
                  /person
                </span>
              </p>

              <div className="mt-6 space-y-3">
                <PriceRow label="Double Sharing" price="₹7,999" />
                <PriceRow label="Triple Sharing" price="₹7,499" />
                <PriceRow label="Quad Sharing" price="₹6,999" best />
              </div>
              <p className="mt-2 text-[11.5px] text-[#0B1330]/40">
                + 5% GST on all plans
              </p>

              <NavLink
                to="/packages/kasol/enquiry"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#0B1330] px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#F5A83C] hover:text-[#0B1330] hover:shadow-lg"
              >
                Enquire Now
                <span aria-hidden>→</span>
              </NavLink>

              <a
                href="https://wa.me/919929190452?text=Hi!%20I'm%20interested%20in%20the%20Kasol%20%E2%80%93%20Manali%20package."
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#0B1330]/10 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1330] transition-all duration-300 hover:border-[#22C55E]/40 hover:bg-[#22C55E]/5"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#22C55E">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.4.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
                </svg>
                Enquire on WhatsApp
              </a>

              <p className="mt-4 text-center text-[12px] text-[#0B1330]/40">
                Booking amount ₹2,000/person · Balance while boarding
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- small presentational helpers ---------------- */

function SectionHeading({ accent, title, compact }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-8 w-1.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <h2
        className={`font-bold text-[#0B1330] ${compact ? "text-[19px]" : "text-[24px] sm:text-[28px]"}`}
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

function TimelineItem({ accent, day, text, last }) {
  return (
    <div className="relative">
      <span
        className="absolute -left-[38px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-[#F7F7FB]"
        style={{ backgroundColor: accent }}
      />
      <p
        className="text-[12.5px] font-bold uppercase tracking-wide"
        style={{ color: accent }}
      >
        {day}
      </p>
      <p className="mt-1 text-[15px] font-medium text-[#0B1330]">{text}</p>
    </div>
  );
}

function DayCard({ accent, day, title, children }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-[0_2px_10px_rgba(11,19,48,0.04)] transition-all duration-300 hover:shadow-[0_14px_30px_-10px_rgba(11,19,48,0.15)]">
      <div className="flex items-start gap-4 p-6">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[15px] font-extrabold text-white"
          style={{ backgroundColor: accent }}
        >
          {day}
        </span>
        <div className="w-full">
          <h3 className="text-[16px] font-bold text-[#0B1330]">{title}</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-[#0B1330]/65">
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="mt-0.5 shrink-0"
      >
        <circle cx="12" cy="12" r="10" fill="#22C55E1A" />
        <path
          d="M8 12.5l2.5 2.5L16 9.5"
          stroke="#22C55E"
          strokeWidth="2"
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
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="mt-0.5 shrink-0"
      >
        <circle cx="12" cy="12" r="10" fill="#E8637A1A" />
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
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5A83C]" />
      {children}
    </div>
  );
}

function CancelRow({ color, window, children }) {
  return (
    <div
      className="rounded-xl border-l-4 bg-white p-4 shadow-[0_2px_10px_rgba(11,19,48,0.04)] transition-transform duration-300 hover:-translate-y-0.5"
      style={{ borderColor: color }}
    >
      <p className="text-[14px] font-bold text-[#0B1330]">{window}</p>
      <p className="mt-1 text-[13.5px] text-[#0B1330]/60">{children}</p>
    </div>
  );
}

function PriceRow({ label, price, best }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 ${best ? "bg-[#F5A83C]/10" : "bg-[#F7F7FB]"}`}
    >
      <span className="flex items-center gap-2 text-[13.5px] font-medium text-[#0B1330]">
        {label}
        {best && (
          <span className="rounded-full bg-[#F5A83C] px-2 py-0.5 text-[10px] font-bold uppercase text-[#0B1330]">
            Best Value
          </span>
        )}
      </span>
      <span className="text-[15px] font-bold text-[#0B1330]">{price}</span>
    </div>
  );
}
