import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import logo from "../assets/Safiri.jpeg";
import axios from "axios";

/**
 * Safiri phone-number modal
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *
 *   <button onClick={() => setOpen(true)}>Start Planning</button>
 *   <Modal
 *     isOpen={open}
 *     onClose={() => setOpen(false)}
 *     onSubmit={(phone) => console.log(phone)}   // e.g. "+919876543210" -> send to your API
 *   />
 */

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  // Every time the modal opens: reset the form, focus the input, lock page scroll
  useEffect(() => {
    if (!isOpen) return undefined;

    setPhone("");
    setError("");
    setDone(false);
    setSaving(false);
    inputRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    // keep digits only, max 10
    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Indian mobile numbers: 10 digits, starting with 6-9
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      inputRef.current?.focus();
      return;
    }

    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/packages/phone`, { phone });
      if (!response.data?.success) throw new Error("Unable to save phone number");
      if (onSubmit) await onSubmit(`+91${phone}`);
      setDone(true);
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "We couldn't save your number. Please try again.",
      );
      inputRef.current?.focus();
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    // Backdrop — clicking the dark area closes the modal
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-[#001F1C]/70 p-4 backdrop-blur-sm"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>{`
        @keyframes sf-modal-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
        .sf-modal-in { animation: sf-modal-in 300ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .sf-modal-in { animation: none; } }
      `}</style>

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sf-modal-title"
        className="sf-modal-in relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FBF7EA] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]"
      >
        {/* Logo header (the logo image has the brand green built in) */}
        <div className="relative bg-[#004741]">
          <img
            src={logo}
            alt="Safiri"
            className="h-36 w-full scale-90 object-cover object-center"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F4E7C7] transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6400]"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-7 pt-7 sm:px-8 sm:pb-8">
          {done ? (
            /* ---------- Success ---------- */
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#004741] text-[#F4E7C7]">
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
              </span>
              <h2
                id="sf-modal-title"
                className="mt-5 text-[24px] font-bold text-[#004741]"
                style={{
                  fontFamily: "'Poppins', 'Bricolage Grotesque', sans-serif",
                }}
              >
                Thank you<span className="text-[#FF6400]">.</span>
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#004741]/70">
                Your number is saved. You can download the PDF.
                
              </p>
              <a
                href="/documents/Bir-Billing-Itinerary.pdf"
                download="Bir"
                onClick={onClose}
                className="mt-7 block w-full rounded-full bg-[#004741] px-6 py-3.5 text-center text-[15px] font-semibold text-[#F4E7C7] transition-colors hover:bg-[#00332F]"
              >
                Download
              </a>
              {/* <button
                type="button"
                onClick={onClose}
                className="mt-7 w-full rounded-full bg-[#004741] px-6 py-3.5 text-[15px] font-semibold text-[#F4E7C7] transition-colors hover:bg-[#00332F]"
              >
                Download
              </button> */}
            </div>
          ) : (
            /* ---------- Form ---------- */
            <form onSubmit={handleSubmit} noValidate>
              <h2
                id="sf-modal-title"
                className="text-[26px] font-bold leading-tight tracking-tight text-[#004741]"
                style={{
                  fontFamily: "'Poppins', 'Bricolage Grotesque', sans-serif",
                }}
              >
                Let&apos;s plan your trip
                <span className="text-[#FF6400]">.</span>
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#004741]/70">
                Share your number and get the pdf.
              </p>

              <label
                htmlFor="sf-phone"
                className="mt-6 block text-[13px] font-semibold text-[#004741]"
              >
                Mobile number
              </label>

              <div
                className={`mt-2 flex items-center overflow-hidden rounded-xl border-2 bg-white transition-colors focus-within:border-[#004741] ${
                  error ? "border-red-600" : "border-[#004741]/15"
                }`}
              >
                <span className="select-none border-r border-[#004741]/15 px-4 py-3.5 text-[16px] font-semibold text-[#004741]">
                  +91
                </span>
                <input
                  ref={inputRef}
                  id="sf-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby="sf-phone-hint"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[17px] font-medium tracking-wide text-[#004741] outline-none placeholder:text-[#004741]/35"
                />
              </div>

              <p
                id="sf-phone-hint"
                role={error ? "alert" : undefined}
                className={`mt-2 text-[13px] ${error ? "text-red-700" : "text-[#004741]/55"}`}
              >
                {error || "Enter your 10-digit mobile number."}
              </p>

              <button
                type="submit"
                disabled={saving}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#004741] px-6 py-3.5 text-[15px] font-semibold text-[#F4E7C7] transition-colors hover:bg-[#00332F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6400]"
              >
                {saving ? "Saving…" : "Submit"}
                {!saving && <span
                  aria-hidden="true"
                  className="text-[#FF6400] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
