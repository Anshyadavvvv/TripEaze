import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FIELD_ORDER = [
  "name",
  "email",
  "password",
  "package",
  "phone",
  "address",
  "travellers",
  "query",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  package: "",
  phone: "",
  address: "",
  travellers: "1",
  query: "",
};

export default function EnquiryForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // NEW: tracks the in-flight request so the button can be disabled and the
  // form can't be double/triple-submitted by repeated clicking.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW: only true once the user has tried to submit at least once — used to
  // surface a visible "check the highlighted fields" banner instead of
  // relying on small red text under a field the user may not have scrolled to.
  const [attempted, setAttempted] = useState(false);

  const fieldRefs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Full name is required";

    if (!data.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // FIX: "package" is required (it's used to build the API URL — an empty
    // value silently produced a broken request, e.g. /packages//enquiry)
    // but was never actually checked here before.
    if (!data.package.trim()) newErrors.package = "Please enter a package";

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(data.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!data.address.trim()) newErrors.address = "Address is required";

    if (!data.travellers || Number(data.travellers) < 1) {
      newErrors.travellers = "At least 1 traveller is required";
    }

    if (!data.query.trim())
      newErrors.query = "Please let us know your requirements or query";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIX (the "needs 5-9 clicks" bug): there was nothing stopping the form
    // from firing a new request on every single click while a previous one
    // was still pending — so a slow request plus impatient re-clicking
    // queued up several submissions at once, and only "resolved" once one
    // of them finally landed. This guard makes every click after the first
    // a no-op until the current request finishes.
    if (isSubmitting) return;

    setAttempted(true);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // FIX: previously a validation failure only changed a tiny line of
      // red text — easy to miss, so it looked like the button "did
      // nothing" and people kept clicking. Now we jump focus straight to
      // the first invalid field so the failure is impossible to miss.
      const firstInvalid = FIELD_ORDER.find((f) => validationErrors[f]);
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/packages/${formData.package}/enquiry`,
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
      console.log("Form submitted successfully:", response.data);
    } catch (err) {
      console.error("Enquiry submit failed:", err.response?.data || err.message);
      setErrors({
        form: "Something went wrong while submitting. Please try again.",
      });
    } finally {
      // Always release the lock, success or failure, so the button is
      // usable again immediately instead of staying stuck.
      setIsSubmitting(false);
    }
  };

  const inputClass = (name) =>
    `peer w-full border-b bg-transparent pb-2 pt-1 text-[15px] text-[#0B1330] outline-none transition-colors duration-200 placeholder:text-[#0B1330]/30 ${
      errors[name]
        ? "border-[#E8637A]"
        : "border-[#0B1330]/15 focus:border-[#F5A83C]"
    }`;

  const labelClass =
    "te-display block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7488]";

  return (
    <div className="te-body relative min-h-screen overflow-hidden bg-[#0B1330] px-4 py-10 sm:px-6 md:py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        .te-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .te-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .te-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .te-fade-in { animation: te-fade-in 500ms ease both; }
        @keyframes te-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .te-stamp { animation: te-stamp 420ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes te-stamp { from { opacity: 0; transform: scale(1.4) rotate(-8deg); } to { opacity: 1; transform: scale(1) rotate(-8deg); } }
        @media (prefers-reduced-motion: reduce) {
          .te-fade-in, .te-stamp { animation: none !important; }
        }
      `}</style>

      {/* quiet ambient glow, nothing scattered */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[110px]"
        style={{ background: "#F5A83C" }}
      />

      <div className="te-fade-in relative mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <p className="te-display text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F5A83C]">
            TripEaze
          </p>
          <h1 className="te-display mt-2 text-[26px] font-bold text-white sm:text-[32px]">
            Reserve your enquiry pass
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Fill this out and our team calls you within a day.
          </p>
        </div>

        {/* ---- The pass ---- */}
        <div className="overflow-hidden rounded-[22px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:flex sm:rounded-[26px]">
          {/* Main coupon */}
          <div className="relative bg-[#FAF6EF] p-6 sm:flex-1 sm:p-9">
            {isSubmitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">
                <div className="te-stamp flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#0F8F86] text-[#0F8F86]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="te-display mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0F8F86]">
                  Enquiry confirmed
                </p>
                <h2 className="te-display mt-2 text-2xl font-bold text-[#0B1330]">
                  Thank you, {formData.name.split(" ")[0] || "traveller"}.
                </h2>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#6B7488]">
                  We've received your enquiry for{" "}
                  <span className="font-semibold text-[#0B1330]">
                    {formData.package || "your trip"}
                  </span>
                  . Our team will call you soon.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setAttempted(false);
                      setFormData(EMPTY_FORM);
                    }}
                    className="te-display rounded-full bg-[#0B1330] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#F5A83C] hover:text-[#0B1330]"
                  >
                    Send another enquiry
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="te-display rounded-full border border-[#0B1330]/15 px-6 py-2.5 text-sm font-semibold text-[#0B1330] transition-colors hover:bg-[#0B1330]/[0.04]"
                  >
                    Back home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between border-b border-dashed border-[#0B1330]/15 pb-4">
                  <div>
                    <p className="te-display text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B9720C]">
                      Passenger details
                    </p>
                    <p className="mt-0.5 text-xs text-[#8A93A8]">
                      All fields required
                    </p>
                  </div>
                  <span className="te-mono hidden text-xs text-[#B9B2A0] sm:block">
                    TE-{new Date().getFullYear()}
                  </span>
                </div>

                {attempted && Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    className="rounded-xl border border-[#E8637A]/30 bg-[#E8637A]/[0.06] px-4 py-3 text-[13px] font-medium text-[#B23A52]"
                  >
                    {errors.form ||
                      "A few fields need your attention — check the highlighted ones below."}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.name = el)}
                  />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.email = el)}
                  />
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.password = el)}
                  />
                  <Field
                    label="Package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    error={errors.package}
                    placeholder="e.g. Kasol, Triund"
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.package = el)}
                  />
                  <Field
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.phone = el)}
                  />
                  <Field
                    label="Travellers"
                    name="travellers"
                    type="number"
                    min="1"
                    value={formData.travellers}
                    onChange={handleChange}
                    error={errors.travellers}
                    inputClass={inputClass}
                    labelClass={labelClass}
                    fieldRef={(el) => (fieldRefs.current.travellers = el)}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      placeholder="Street, city, state"
                      inputClass={inputClass}
                      labelClass={labelClass}
                      fieldRef={(el) => (fieldRefs.current.address = el)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="query" className={labelClass}>
                    Special requirements
                  </label>
                  <textarea
                    id="query"
                    ref={(el) => (fieldRefs.current.query = el)}
                    name="query"
                    rows="2"
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Preferred dates, dietary needs, anything else we should know..."
                    className={`${inputClass("query")} resize-none`}
                  />
                  {errors.query && (
                    <p className="mt-1.5 text-xs font-medium text-[#E8637A]">
                      {errors.query}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Perforated stub */}
          {!isSubmitted && (
            <div className="relative flex flex-row items-center justify-between gap-4 bg-[#0B1330] px-6 py-5 sm:w-[190px] sm:flex-col sm:justify-center sm:gap-6 sm:py-9">
              {/* perforation: dashed seam with cut-out notches */}
              <div className="pointer-events-none absolute -left-2.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-[#0B1330] sm:block" />
              <div className="pointer-events-none absolute left-0 top-0 hidden h-full border-l border-dashed border-white/15 sm:block" />
              <div className="pointer-events-none absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[#0B1330] sm:hidden" />
              <div className="pointer-events-none absolute top-0 left-0 block w-full border-t border-dashed border-white/15 sm:hidden" />

              <div className="flex items-center gap-2 sm:flex-col sm:gap-3 sm:text-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A83C" strokeWidth="1.8" className="shrink-0">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <div>
                  <p className="te-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    Enquiry
                  </p>
                  <p className="te-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Pass
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="te-display flex w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5A83C] to-[#ffbf5e] px-6 py-3 text-[14px] font-semibold text-[#0B1330] transition-all duration-200 hover:shadow-[0_0_24px_rgba(245,168,60,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0B1330]/30 border-t-[#0B1330]" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit
                    <span aria-hidden>→</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  min,
  inputClass,
  labelClass,
  fieldRef,
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        ref={fieldRef}
        type={type}
        name={name}
        min={min}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={inputClass(name)}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#E8637A]">{error}</p>
      )}
    </div>
  );
}