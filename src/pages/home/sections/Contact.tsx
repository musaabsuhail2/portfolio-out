import React, { useState } from "react";
import { useAppSelector } from "@/shared/hooks";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText("musaabsuhail1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    color: dark ? "#f1f5f9" : "#0f172a",
    fontSize: "14px",
    fontFamily: "'Syne', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: dark ? "rgba(241,245,249,0.5)" : "rgba(15,23,42,0.5)",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
  };

  const links = [
    { label: "GitHub", desc: "github.com/musaabsuhail", icon: "⌥", url: "https://github.com/musaabsuhail", color: "#e2e8f0" },
    { label: "LinkedIn", desc: "linkedin.com/in/musaabsuhail", icon: "◈", url: "https://linkedin.com/in/musaabsuhail", color: "#60a5fa" },
    { label: "Email", desc: "musaabsuhail1@gmail.com", icon: "◎", url: "mailto:musaabsuhail1@gmail.com", color: "#34d399" },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "120px 32px 80px",
        background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute", width: 600, height: 600,
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          background: dark
            ? "radial-gradient(circle, rgba(0,212,255,0.04), transparent 70%)"
            : "radial-gradient(circle, rgba(0,150,200,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00d4ff", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
            04 — Contact
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: dark ? "#f8fafc" : "#0f172a", letterSpacing: "-1.5px", margin: "0 0 16px" }}>
            Let's connect
          </h2>
          <p style={{ fontSize: "16px", color: dark ? "rgba(241,245,249,0.5)" : "rgba(15,23,42,0.5)", lineHeight: 1.75, maxWidth: "520px" }}>
            Whether you have a role in mind, a project to discuss, or just want to say hi — my inbox is always open.
          </p>
        </div>

        {/* Contact form */}
        <div
          style={{
            background: dark ? "rgba(14,14,22,0.7)" : "rgba(255,255,255,0.85)",
            border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
            borderRadius: "20px",
            padding: "36px",
            backdropFilter: "blur(10px)",
            marginBottom: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="form-grid">
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00d4ff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00d4ff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"; }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#00d4ff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"; }}
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div style={{ marginBottom: "16px", padding: "12px 16px", borderRadius: "10px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399", fontSize: "14px", fontWeight: 600 }}>
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div style={{ marginBottom: "16px", padding: "12px 16px", borderRadius: "10px", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.25)", color: "#fb923c", fontSize: "14px", fontWeight: 600 }}>
                ✕ Something went wrong. Please try again.
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background: status === "loading" ? "rgba(0,212,255,0.4)" : "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  color: "white",
                  border: "none",
                  padding: "13px 28px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: status === "loading" ? "wait" : "pointer",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.2)",
                  transition: "all 0.2s",
                  letterSpacing: "0.3px",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>

              {/* Copy email shortcut */}
              <button
                type="button"
                onClick={copyEmail}
                style={{
                  background: copied ? "rgba(52,211,153,0.1)" : "rgba(0,212,255,0.08)",
                  border: copied ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(0,212,255,0.2)",
                  color: copied ? "#34d399" : "#00d4ff",
                  padding: "11px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "13px",
                  transition: "all 0.2s",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {copied ? "✓ Copied!" : "⎘ Copy Email"}
              </button>
            </div>
          </form>
        </div>

        {/* Social links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }} className="contact-grid">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                background: dark ? "rgba(14,14,22,0.6)" : "rgba(255,255,255,0.8)",
                border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)",
                borderRadius: "14px",
                padding: "20px",
                display: "block",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${link.color}44`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontSize: "22px", marginBottom: "10px", color: link.color }}>{link.icon}</div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px", color: dark ? "#f1f5f9" : "#0f172a", margin: "0 0 4px" }}>{link.label}</p>
              <p style={{ fontSize: "11px", color: dark ? "rgba(241,245,249,0.35)" : "rgba(15,23,42,0.4)", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{link.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
export { Contact };
