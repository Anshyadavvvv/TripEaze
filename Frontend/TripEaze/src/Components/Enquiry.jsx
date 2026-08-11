import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function EnquiryForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    package: "",
    phone: "",
    address: "",
    travellers: "1",
    query: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation Logic
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.travellers || Number(formData.travellers) < 1) {
      newErrors.travellers = "At least 1 traveller is required";
    }

    if (!formData.query.trim()) {
      newErrors.query = "Please let us know your requirements or query";
    }

    return newErrors;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // const controller = new AbortController();
    } else {
      setErrors({});
      const response = await axios.post(
        "http://localhost:5001/packages/:packageName/enquiry",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          packages: formData.package,
          address: formData.address,
          numoftraveller: formData.travellers,
          phonenumber: formData.phone,
          query: formData.query,
        },
      );
      setIsSubmitted(true);
      console.log("Form Submitted Successfully:", formData);
      console.log(response);
    }
  };

  // --- Presentation-only additions below (no effect on the logic above) ---

  const confettiColors = ["#F5A83C", "#2DD4BF", "#EEF2FF", "#FDE68A", "#7DD3C0"];
  const confettiPieces = Array.from({ length: 26 });

  const fieldIconClass =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A85B3]";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080D24] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes te-drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(24px, -18px) scale(1.06); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes te-dash {
          to { stroke-dashoffset: -200; }
        }
        @keyframes te-plane-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes te-fall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(220px) rotate(340deg); opacity: 0; }
        }
        @keyframes te-pop-in {
          0%   { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes te-takeoff {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(120px, -70px) rotate(18deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .te-motion, .te-motion * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Ambient background: soft gradient glows + a faint route/grid texture */}
      <div className="te-motion pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "#F5A83C", animation: "te-drift 11s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "#2DD4BF", animation: "te-drift 14s ease-in-out infinite reverse" }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="te-grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#C9D1E8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#te-grid)" />
        </svg>
      </div>

      {/* Card */}
      <div className="te-motion relative w-full max-w-2xl rounded-[28px] p-[1px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* Gradient border glow */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-70"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,168,60,0.55), rgba(45,212,191,0.35), rgba(245,168,60,0.15))",
          }}
        />

        <div className="relative rounded-[27px] bg-[#0B1330]/95 backdrop-blur-xl overflow-hidden border border-white/5">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-[#0B1330] via-[#101A42] to-[#0B1330] p-8 text-center text-white overflow-hidden">
            {/* Flight path signature */}
            <svg
              className="te-motion absolute inset-x-0 top-3 h-10 w-full opacity-70"
              viewBox="0 0 400 40"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M10 30 C 120 -10, 280 55, 390 12"
                stroke="#F5A83C"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                style={{ animation: "te-dash 6s linear infinite" }}
              />
              <circle cx="10" cy="30" r="3" fill="#2DD4BF" />
              <circle cx="390" cy="12" r="3" fill="#F5A83C" />
              <g style={{ animation: "te-plane-bob 2.4s ease-in-out infinite" }}>
                <text x="185" y="8" fontSize="14" fill="#F5A83C">✈</text>
              </g>
            </svg>

            <span className="te-display relative text-[#F5A83C] text-sm font-semibold tracking-wider uppercase">
              Start Your Journey
            </span>
            <h2 className="te-display relative text-2xl sm:text-3xl font-bold mt-1">
              Package Enquiry
            </h2>
            <p className="te-body relative text-slate-300 text-sm mt-2 max-w-md mx-auto">
              Fill in your details below and our team will get back to you with a
              custom plan.
            </p>
          </div>

          {/* Success Banner */}
          {isSubmitted ? (
            <div className="te-body relative p-8 text-center overflow-hidden">
              {/* Confetti burst */}
              <div className="te-motion pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden">
                {confettiPieces.map((_, i) => (
                  <span
                    key={i}
                    className="absolute block h-2 w-2 rounded-sm"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: "-10px",
                      background: confettiColors[i % confettiColors.length],
                      animation: `te-fall ${1.6 + (i % 5) * 0.25}s ease-in ${
                        (i % 7) * 0.12
                      }s infinite`,
                    }}
                  />
                ))}
              </div>

              <div
                className="te-motion relative w-16 h-16 bg-emerald-400/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4 border border-emerald-400/30"
                style={{ animation: "te-pop-in 420ms ease-out" }}
              >
                <span style={{ animation: "te-takeoff 1.8s ease-in 500ms infinite" }}>
                  ✈
                </span>
                <span className="absolute">✓</span>
              </div>
              <h3 className="te-display text-2xl font-bold text-white">Thank You!</h3>
              <p className="text-slate-300 mt-2">
                Your enquiry has been received. We'll contact you soon.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                    travellers: "1",
                    query: "",
                  });
                }}
                className="te-display mt-6 rounded-full bg-[#F5A83C] px-6 py-2.5 text-sm font-semibold text-[#0B1330] transition-all duration-300 hover:bg-[#ffbf5e] hover:shadow-[0_0_24px_rgba(245,168,60,0.45)] active:scale-[0.98]"
              >
                Send Another Enquiry
              </button>
              <br />
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="te-display mt-3 rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10"
              >
                Home
              </button>
            </div>
          ) : (
            /* Form Content */
            <form
              onSubmit={handleSubmit}
              className="te-body relative p-6 sm:p-8 space-y-5"
              noValidate
            >
              {/* Grid layout for responsive inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21a8 8 0 1 0-16 0" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.name
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                    </svg>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.email
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.password
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Package */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Package
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    <input
                      required
                      type="text"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      placeholder="Enter package"
                      className="w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 border-white/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2Z" />
                    </svg>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.phone
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Address & Number of Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Address
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, City, Country"
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.address
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Number of Travellers */}
                <div>
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                    Travellers
                  </label>
                  <div className="relative">
                    <svg className={fieldIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <input
                      required
                      type="number"
                      min="1"
                      name="travellers"
                      value={formData.travellers}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 ${
                        errors.travellers
                          ? "border-red-400/70 bg-red-500/5"
                          : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.travellers && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.travellers}
                    </p>
                  )}
                </div>
              </div>

              {/* Query / Message */}
              <div>
                <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#8D96C4] mb-1.5">
                  Any Special Query or Requirements?
                </label>
                <textarea
                  name="query"
                  rows="3"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Tell us about your preferred travel dates, special requests, etc."
                  className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder-[#5A6394] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20 resize-none ${
                    errors.query
                      ? "border-red-400/70 bg-red-500/5"
                      : "border-white/10"
                  }`}
                ></textarea>
                {errors.query && (
                  <p className="mt-1 text-xs text-red-400 font-medium">
                    {errors.query}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="te-display mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] px-6 py-3.5 text-[15px] font-semibold text-[#0B1330] transition-all duration-300 hover:shadow-[0_0_28px_rgba(245,168,60,0.5)] active:scale-[0.99]"
              >
                Submit Enquiry
                <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}