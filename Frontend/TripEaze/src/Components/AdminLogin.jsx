import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import splitImage from "../assets/split.png";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: wire this up to your auth/login endpoint

    try {
      const response = await axios.post("http://localhost:5001/utkarshadmin", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("adminToken", response.data.token);
      console.log("Login successful:", response.data);

      navigate("/utkarshadmin/adminpanel");
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="te-body min-h-screen w-full bg-[#F1F2F5] flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Unified card: image + form share one box, same height, no gap */}
      <div className="w-full max-w-4xl overflow-hidden rounded-[28px] shadow-[0_30px_70px_-20px_rgba(11,19,48,0.25)] flex flex-col lg:flex-row lg:h-[620px]">
        {/* Left: image */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img
            src={splitImage}
            alt="TripEaze — Explore. Experience. Memories."
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: login form */}
        <div className="w-full lg:w-1/2 h-full bg-white flex items-center justify-center overflow-y-auto p-6 sm:p-10">
          <div className="w-full max-w-md">
            {/* Heading */}
            <span className="te-display text-xs font-semibold uppercase tracking-[0.2em] text-[#B9720C]">
              TripEaze Admin
            </span>
            <h1 className="te-display mt-2 text-3xl font-bold text-[#0B1330]">
              Welcome back
            </h1>
            <p className="te-body mt-2 text-sm text-[#6B7488]">
              Sign in to manage enquiries and travel packages.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#6B7488] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA3BC]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@tripeaze.com"
                    className="w-full rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] pl-11 pr-4 py-3 text-sm text-[#0B1330] placeholder-[#9AA3BC] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="te-display block text-xs font-semibold uppercase tracking-wider text-[#6B7488]">
                    Password
                  </label>
                  <NavLink
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#F5A83C] hover:text-[#B9720C] transition-colors"
                  >
                    Forgot password?
                  </NavLink>
                </div>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AA3BC]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#0B1330]/10 bg-[#F8F8FA] pl-11 pr-11 py-3 text-sm text-[#0B1330] placeholder-[#9AA3BC] outline-none transition-all duration-200 focus:border-[#F5A83C] focus:ring-2 focus:ring-[#F5A83C]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA3BC] hover:text-[#0B1330] transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <path d="M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="te-display w-full rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] px-6 py-3.5 text-[15px] font-semibold text-[#0B1330] transition-all duration-300 hover:shadow-[0_0_24px_rgba(245,168,60,0.4)] active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            <p className="te-body mt-8 text-center text-xs text-[#9AA3BC]">
              <NavLink
                to="/"
                className="font-semibold text-[#0B1330] hover:text-[#F5A83C] transition-colors"
              >
                ← Back to TripEaze
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
