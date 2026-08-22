import React, { useEffect, useMemo, useState } from "react";
import tripeazeLogo from "../assets/tripeaze_logo.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const statusStyles = {
  Pending: "bg-[#F5A83C]/10 text-[#B9720C] border-[#F5A83C]/30",
  Contacted: "bg-[#2DD4BF]/10 text-[#0F8F86] border-[#2DD4BF]/30",
};

const statusDot = {
  Pending: "#F5A83C",
  Contacted: "#2DD4BF",
};

function daysAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return Math.floor(diff);
}

/* ------------------------------------------------------------------ */
/* Presentational-only helpers — pure functions, no state, no side     */
/* effects, no change to any value used by the app's data/handlers.    */
/* ------------------------------------------------------------------ */

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function relativeLabel(dateStr) {
  const n = daysAgo(dateStr);
  if (n <= 0) return "Today";
  if (n === 1) return "Yesterday";
  return `${n} days ago`;
}

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_PALETTE = [
  { bg: "#0B1330", text: "#FAF6EF" },
  { bg: "#F5A83C", text: "#0B1330" },
  { bg: "#2DD4BF", text: "#0B1330" },
  { bg: "#E2574C", text: "#FFF7F5" },
];

function avatarColor(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

/* ------------------------------------------------------------------ */
/* Small inline icon set (hand-rolled, same convention as the original */
/* file's search/close icons) — purely visual, no external deps.       */
/* ------------------------------------------------------------------ */

function IconSearch({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconChevronDown({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconUsers({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconClock({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconCheckCircle({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function IconCalendar({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconMail({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconPhone({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMapPin({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconTag({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function IconLogOut({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconSend({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* Path fragments reused inside IconButton (kept identical to the       */
/* original file's eye / trash icon paths).                            */
function EyePaths() {
  return (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  );
}
function TrashPaths() {
  return (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/utkarshadmin");
  };
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${API_URL}/utkarshadmin/enquiries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.enquiries.map((e) => ({
          id: e._id,
          name: e.name,
          email: e.email,
          phone: e.phonenumber,
          address: e.address,
          package: e.packages,
          travellers: e.numoftraveller,
          query: e.query,
          date: e.createdAt,
          status: "Pending",
        }));

        setEnquiries(data);
      } catch (error) {
        console.log("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const packages = useMemo(
    () => ["All", ...new Set(enquiries.map((e) => e.package))],
    [enquiries],
  );

  const filtered = useMemo(() => {
    return enquiries
      .filter((e) =>
        statusFilter === "All" ? true : e.status === statusFilter,
      )
      .filter((e) =>
        packageFilter === "All" ? true : e.package === packageFilter,
      )
      .filter((e) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.toLowerCase().includes(q) ||
          e.package.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [enquiries, search, statusFilter, packageFilter]);

  const stats = useMemo(
    () => ({
      total: enquiries.length,
      pending: enquiries.filter((e) => e.status === "Pending").length,
      contacted: enquiries.filter((e) => e.status === "Contacted").length,
      thisWeek: enquiries.filter((e) => daysAgo(e.date) <= 7).length,
    }),
    [enquiries],
  );

  // TODO: replace with a DELETE /api/admin/enquiries/:id call
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry? This can't be undone.")) return;

    if (selected?.id === id) setSelected(null);

    const token = localStorage.getItem("adminToken");
    const API_URL = import.meta.env.VITE_API_URL;
    await axios.delete(`${API_URL}/utkarshadmin/enquiries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // TODO: replace with a PATCH /api/admin/enquiries/:id call
  const handleToggleStatus = (id) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Pending" ? "Contacted" : "Pending" }
          : e,
      ),
    );
  };

  return (
    <div className="te-body min-h-screen w-full bg-[#FAF6EF]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes te-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .te-fade-up { animation: te-fade-up 400ms ease both; }
        .te-row { animation: te-fade-up 380ms ease both; }

        @keyframes te-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .te-slide-in { animation: te-slide-in 320ms cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes te-drift { 0% { transform: translateX(-6px); } 50% { transform: translateX(6px); } 100% { transform: translateX(-6px); } }
        .te-drift { animation: te-drift 5s ease-in-out infinite; }

        .te-focus:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(245,168,60,0.35);
        }

        .te-perforation { position: relative; border-top: 1.5px dashed rgba(11,19,48,0.18); }
        .te-perforation::before, .te-perforation::after {
          content: "";
          position: absolute;
          top: -9px;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #FFFFFF;
        }
        .te-perforation::before { left: -9px; }
        .te-perforation::after { right: -9px; }

        .te-scrollbar::-webkit-scrollbar { width: 6px; }
        .te-scrollbar::-webkit-scrollbar-thumb { background: rgba(11,19,48,0.15); border-radius: 9999px; }
      `}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[#0B1330]/[0.06] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={tripeazeLogo}
              alt="TripEaze logo"
              className="h-10 w-10 rounded-full border border-[#0B1330]/10 object-contain p-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="te-display text-sm font-bold leading-tight text-[#0B1330]">
                  TripEaze
                </p>
                <span className="te-display rounded-full bg-[#0B1330]/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0B1330]/70">
                  Admin
                </span>
              </div>
              <p className="text-xs text-[#8A93A8]">Enquiry management console</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="te-display te-focus group flex items-center gap-2 rounded-full border border-[#0B1330]/10 px-4 py-2 text-xs font-semibold text-[#0B1330] transition-colors hover:bg-[#0B1330]/[0.04]"
          >
            <IconLogOut className="h-3.5 w-3.5 text-[#8A93A8] transition-colors group-hover:text-[#0B1330]" />
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="te-fade-up relative mb-8">
          <p className="te-display text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A83C]">
            Dashboard
          </p>
          <h1 className="te-display mt-1 text-2xl font-bold text-[#0B1330] sm:text-3xl">
            Enquiries
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[#6B7488]">
            Every package enquiry submitted on the site — search it, filter it, follow up on it.
          </p>
          <div className="pointer-events-none absolute right-0 top-2 hidden items-center gap-2 sm:flex">
            <span className="h-px w-14 border-t border-dashed border-[#0B1330]/15" />
            <IconSend className="te-drift h-4 w-4 text-[#F5A83C]/60" />
          </div>
        </div>

        {/* Stats */}
        <div className="te-fade-up mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Enquiries"
            value={stats.total}
            accent="#0B1330"
            icon={<IconUsers className="h-3.5 w-3.5" />}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            accent="#F5A83C"
            icon={<IconClock className="h-3.5 w-3.5" />}
          />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            accent="#2DD4BF"
            icon={<IconCheckCircle className="h-3.5 w-3.5" />}
          />
          <StatCard
            label="This Week"
            value={stats.thisWeek}
            accent="#0B1330"
            icon={<IconCalendar className="h-3.5 w-3.5" />}
          />
        </div>

        {/* Toolbar */}
        <div className="te-fade-up mb-5 flex flex-col gap-3 rounded-2xl border border-[#0B1330]/[0.06] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3BC]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or package..."
              className="te-focus w-full rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] py-2.5 pl-10 pr-4 text-sm text-[#0B1330] placeholder-[#9AA3BC] outline-none transition-all focus:border-[#F5A83C]"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-[#F8F8FA] p-1">
            {["All", "Pending", "Contacted"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`te-display te-focus rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                  statusFilter === s
                    ? "bg-white text-[#0B1330] shadow-sm"
                    : "text-[#8A93A8] hover:text-[#0B1330]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative">
            <IconTag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3BC]" />
            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="te-focus appearance-none rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] py-2.5 pl-10 pr-9 text-sm text-[#0B1330] outline-none focus:border-[#F5A83C]"
            >
              {packages.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All Packages" : p}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9AA3BC]" />
          </div>
        </div>

        {/* Table (desktop) */}
        <div className="te-fade-up hidden overflow-hidden rounded-2xl border border-[#0B1330]/[0.06] bg-white shadow-sm lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#0B1330]/[0.06] bg-[#0B1330]/[0.02] text-xs uppercase tracking-wider text-[#8A93A8]">
                <th className="px-5 py-3.5 font-semibold">Traveller</th>
                <th className="px-5 py-3.5 font-semibold">Package</th>
                <th className="px-5 py-3.5 font-semibold">Travellers</th>
                <th className="px-5 py-3.5 font-semibold">Submitted</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, idx) => {
                const avatar = avatarColor(e.name || e.email);
                return (
                  <tr
                    key={e.id}
                    style={{ animationDelay: `${Math.min(idx, 8) * 40}ms` }}
                    className="te-row group border-b border-[#0B1330]/[0.05] last:border-0 hover:bg-[#F5A83C]/[0.05] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="te-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{ background: avatar.bg, color: avatar.text }}
                        >
                          {initials(e.name)}
                        </span>
                        <div>
                          <p className="font-semibold text-[#0B1330]">{e.name}</p>
                          <p className="text-xs text-[#8A93A8]">{e.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-full bg-[#0B1330]/[0.05] px-2.5 py-1 text-xs font-medium text-[#3F4B63]">
                        {e.package}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#3F4B63]">
                      <span className="inline-flex items-center gap-1.5">
                        <IconUsers className="h-3.5 w-3.5 text-[#9AA3BC]" />
                        {e.travellers}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#3F4B63]">{formatDate(e.date)}</p>
                      <p className="text-xs text-[#9AA3BC]">{relativeLabel(e.date)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(e.id)}
                        className={`te-focus inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${statusStyles[e.status]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusDot[e.status] }} />
                        {e.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                        <IconButton label="View details" onClick={() => setSelected(e)}>
                          <EyePaths />
                        </IconButton>
                        <IconButton label="Delete" danger onClick={() => handleDelete(e.id)}>
                          <TrashPaths />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && <EmptyState />}
        </div>

        {/* Cards (mobile / tablet) */}
        <div className="te-fade-up space-y-3 lg:hidden">
          {filtered.map((e, idx) => {
            const avatar = avatarColor(e.name || e.email);
            return (
              <div
                key={e.id}
                style={{ animationDelay: `${Math.min(idx, 8) * 40}ms` }}
                className="te-row relative overflow-hidden rounded-2xl border border-[#0B1330]/[0.06] bg-white p-4"
              >
                <span
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ background: statusDot[e.status] }}
                />
                <div className="flex items-start justify-between pl-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="te-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: avatar.bg, color: avatar.text }}
                    >
                      {initials(e.name)}
                    </span>
                    <div>
                      <p className="font-semibold text-[#0B1330]">{e.name}</p>
                      <p className="text-xs text-[#8A93A8]">{e.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(e.id)}
                    className={`te-focus inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[e.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusDot[e.status] }} />
                    {e.status}
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between pl-2 text-xs text-[#6B7488]">
                  <span className="inline-flex items-center gap-1.5">
                    <IconTag className="h-3 w-3 text-[#9AA3BC]" />
                    {e.package} · {e.travellers} traveller
                    {e.travellers > 1 ? "s" : ""}
                  </span>
                  <span className="text-[#9AA3BC]">{formatDate(e.date)}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-[#0B1330]/[0.06] pt-3 pl-2">
                  <button
                    onClick={() => setSelected(e)}
                    className="te-display te-focus flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#0B1330]/10 py-2 text-xs font-semibold text-[#0B1330]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <EyePaths />
                    </svg>
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="te-display te-focus flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E2574C]/25 py-2 text-xs font-semibold text-[#E2574C]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <TrashPaths />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <EmptyState />}
        </div>
      </main>

      {/* Detail drawer — styled like a boarding pass / ticket stub */}
      {selected && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-[#0B1330]/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="te-slide-in te-scrollbar relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
            {/* Header stub */}
            <div className="relative bg-gradient-to-br from-[#0B1330] to-[#182352] px-6 pb-7 pt-6 text-white sm:px-8">
              <div className="flex items-start justify-between">
                <p className="te-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5A83C]">
                  Enquiry
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="te-focus rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="te-display mt-2 text-xl font-bold">{selected.name}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusDot[selected.status] }} />
                  {selected.status}
                </span>
                <span className="text-xs text-white/60">
                  Submitted {formatDate(selected.date)} · {relativeLabel(selected.date)}
                </span>
              </div>
            </div>

            {/* Perforated tear line */}
            <div className="te-perforation mx-6 sm:mx-8" />

            {/* Body */}
            <div className="flex-1 space-y-5 px-6 pb-6 pt-7 sm:px-8">
              <DetailRow
                icon={<IconMail className="h-4 w-4" />}
                label="Email"
                value={selected.email}
                href={`mailto:${selected.email}`}
              />
              <DetailRow
                icon={<IconPhone className="h-4 w-4" />}
                label="Phone"
                value={selected.phone}
                href={`tel:${selected.phone}`}
              />
              <DetailRow
                icon={<IconMapPin className="h-4 w-4" />}
                label="Address"
                value={selected.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <DetailRow
                  icon={<IconTag className="h-4 w-4" />}
                  label="Package"
                  value={selected.package}
                />
                <DetailRow
                  icon={<IconUsers className="h-4 w-4" />}
                  label="Travellers"
                  value={String(selected.travellers)}
                />
              </div>

              <div>
                <p className="te-display text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
                  Query
                </p>
                <p className="mt-2 rounded-xl border-l-2 border-[#F5A83C] bg-[#FAF6EF] px-4 py-3 text-sm leading-relaxed text-[#3F4B63]">
                  {selected.query}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="sticky bottom-0 flex gap-3 border-t border-[#0B1330]/[0.06] bg-white px-6 py-4 sm:px-8">
              <button
                onClick={() => handleToggleStatus(selected.id)}
                className="te-display te-focus flex-1 rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] py-3 text-sm font-semibold text-[#0B1330] transition-transform hover:scale-[1.01]"
              >
                Mark as{" "}
                {selected.status === "Pending" ? "Contacted" : "Pending"}
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
                className="te-display te-focus rounded-full border border-[#E2574C]/25 px-5 py-3 text-sm font-semibold text-[#E2574C] hover:bg-[#E2574C]/5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent, icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#0B1330]/[0.06] bg-white p-5 transition-shadow hover:shadow-md">
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
          {label}
        </p>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: `${accent}1A`, color: accent }}
        >
          {icon}
        </span>
      </div>
      <p className="te-display mt-3 text-3xl font-bold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function IconButton({ children, onClick, label, danger }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`te-focus rounded-full border p-2 transition-colors ${
        danger
          ? "border-[#E2574C]/25 text-[#E2574C] hover:bg-[#E2574C]/10"
          : "border-[#0B1330]/10 text-[#6B7488] hover:bg-[#0B1330]/[0.05]"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}

function DetailRow({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1330]/[0.05] text-[#0B1330]/70">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="te-display text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block truncate font-medium text-[#0B1330] hover:text-[#F5A83C]"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 break-words font-medium text-[#0B1330]">{value}</p>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1330]/[0.05]">
        <IconSearch className="h-6 w-6 text-[#C9D1E8]" />
      </span>
      <p className="te-display mt-4 text-sm font-semibold text-[#0B1330]">
        No enquiries found
      </p>
      <p className="mt-1 max-w-xs text-xs text-[#8A93A8]">
        Try a different search term, or switch the status and package filters above.
      </p>
    </div>
  );
}