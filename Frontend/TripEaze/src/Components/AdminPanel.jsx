import React, { useEffect, useMemo, useState } from "react";
import tripeazeLogo from "../assets/tripeaze_logo.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const statusStyles = {
  Pending: "bg-[#F5A83C]/10 text-[#B9720C] border-[#F5A83C]/30",
  Contacted: "bg-[#2DD4BF]/10 text-[#0F8F86] border-[#2DD4BF]/30",
};

function daysAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return Math.floor(diff);
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
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          "http://localhost:5001/utkarshadmin/enquiries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

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

    await axios.delete(`http://localhost:5001/utkarshadmin/enquiries/${id}`, {
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
        @keyframes te-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .te-slide-in { animation: te-slide-in 320ms cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[#0B1330]/[0.06] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={tripeazeLogo}
              alt="TripEaze logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <div>
              <p className="te-display text-sm font-bold leading-tight text-[#0B1330]">
                TripEaze Admin
              </p>
              <p className="text-xs text-[#8A93A8]">Enquiry management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="te-display rounded-full border border-[#0B1330]/10 px-4 py-2 text-xs font-semibold text-[#0B1330] transition-colors hover:bg-[#0B1330]/[0.04]"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="te-fade-up mb-8">
          <h1 className="te-display text-2xl font-bold text-[#0B1330] sm:text-3xl">
            Enquiries
          </h1>
          <p className="mt-1 text-sm text-[#6B7488]">
            View, search, and manage every package enquiry submitted on the
            site.
          </p>
        </div>

        {/* Stats */}
        <div className="te-fade-up mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Enquiries"
            value={stats.total}
            accent="#0B1330"
          />
          <StatCard label="Pending" value={stats.pending} accent="#F5A83C" />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            accent="#2DD4BF"
          />
          <StatCard label="This Week" value={stats.thisWeek} accent="#0B1330" />
        </div>

        {/* Toolbar */}
        <div className="te-fade-up mb-5 flex flex-col gap-3 rounded-2xl border border-[#0B1330]/[0.06] bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3BC]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or package..."
              className="w-full rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] py-2.5 pl-10 pr-4 text-sm text-[#0B1330] placeholder-[#9AA3BC] outline-none transition-all focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] px-3.5 py-2.5 text-sm text-[#0B1330] outline-none focus:border-[#F5A83C]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
          </select>

          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] px-3.5 py-2.5 text-sm text-[#0B1330] outline-none focus:border-[#F5A83C]"
          >
            {packages.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Packages" : p}
              </option>
            ))}
          </select>
        </div>

        {/* Table (desktop) */}
        <div className="te-fade-up hidden overflow-hidden rounded-2xl border border-[#0B1330]/[0.06] bg-white lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#0B1330]/[0.06] bg-[#0B1330]/[0.02] text-xs uppercase tracking-wider text-[#8A93A8]">
                <th className="px-5 py-3.5 font-semibold">Traveller</th>
                <th className="px-5 py-3.5 font-semibold">Package</th>
                <th className="px-5 py-3.5 font-semibold">Travellers</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-[#0B1330]/[0.05] last:border-0 hover:bg-[#F5A83C]/[0.04] transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0B1330]">{e.name}</p>
                    <p className="text-xs text-[#8A93A8]">{e.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[#3F4B63]">{e.package}</td>
                  <td className="px-5 py-4 text-[#3F4B63]">{e.travellers}</td>
                  <td className="px-5 py-4 text-[#8A93A8]">{e.date}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggleStatus(e.id)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${statusStyles[e.status]}`}
                    >
                      {e.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconButton label="View" onClick={() => setSelected(e)}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                        <circle cx="12" cy="12" r="3" />
                      </IconButton>
                      <IconButton
                        label="Delete"
                        danger
                        onClick={() => handleDelete(e.id)}
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <EmptyState />}
        </div>

        {/* Cards (mobile / tablet) */}
        <div className="te-fade-up space-y-3 lg:hidden">
          {filtered.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-[#0B1330]/[0.06] bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#0B1330]">{e.name}</p>
                  <p className="text-xs text-[#8A93A8]">{e.email}</p>
                </div>
                <button
                  onClick={() => handleToggleStatus(e.id)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[e.status]}`}
                >
                  {e.status}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#6B7488]">
                <span>
                  {e.package} · {e.travellers} traveller
                  {e.travellers > 1 ? "s" : ""}
                </span>
                <span>{e.date}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-[#0B1330]/[0.06] pt-3">
                <button
                  onClick={() => setSelected(e)}
                  className="te-display flex-1 rounded-full border border-[#0B1330]/10 py-2 text-xs font-semibold text-[#0B1330]"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="te-display flex-1 rounded-full border border-red-200 py-2 text-xs font-semibold text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <EmptyState />}
        </div>
      </main>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-[#0B1330]/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="te-slide-in relative h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <span
                  className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selected.status]}`}
                >
                  {selected.status}
                </span>
                <h2 className="te-display mt-3 text-xl font-bold text-[#0B1330]">
                  {selected.name}
                </h2>
                <p className="text-sm text-[#8A93A8]">{selected.date}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-[#8A93A8] hover:bg-[#0B1330]/[0.05]"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <DetailRow
                label="Email"
                value={selected.email}
                href={`mailto:${selected.email}`}
              />
              <DetailRow
                label="Phone"
                value={selected.phone}
                href={`tel:${selected.phone}`}
              />
              <DetailRow label="Address" value={selected.address} />
              <DetailRow label="Package" value={selected.package} />
              <DetailRow
                label="Travellers"
                value={String(selected.travellers)}
              />
              <div>
                <p className="te-display text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
                  Query
                </p>
                <p className="mt-1 leading-relaxed text-[#3F4B63]">
                  {selected.query}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => handleToggleStatus(selected.id)}
                className="te-display flex-1 rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] py-3 text-sm font-semibold text-[#0B1330]"
              >
                Mark as{" "}
                {selected.status === "Pending" ? "Contacted" : "Pending"}
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
                className="te-display rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-500"
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

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-[#0B1330]/[0.06] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
        {label}
      </p>
      <p
        className="te-display mt-2 text-3xl font-bold"
        style={{ color: accent }}
      >
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
      className={`rounded-full border p-2 transition-colors ${
        danger
          ? "border-red-200 text-red-400 hover:bg-red-50"
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
      >
        {children}
      </svg>
    </button>
  );
}

function DetailRow({ label, value, href }) {
  return (
    <div>
      <p className="te-display text-xs font-semibold uppercase tracking-wider text-[#8A93A8]">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-1 block font-medium text-[#0B1330] hover:text-[#F5A83C]"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 font-medium text-[#0B1330]">{value}</p>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9D1E8"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <p className="te-display mt-3 text-sm font-semibold text-[#0B1330]">
        No enquiries found
      </p>
      <p className="mt-1 text-xs text-[#8A93A8]">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}
