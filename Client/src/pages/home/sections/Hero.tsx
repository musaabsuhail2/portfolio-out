import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/hooks";

const Hero: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(false);
  const roles = [
    "Frontend Developer",
    "React Specialist",
    "Redux Engineer",
    "UI/UX Enthusiast",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(
        () => setTyped(current.slice(0, typed.length + 1)),
        75,
      );
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx]); // eslint-disable-line

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated mesh background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            left: "-200px",
            top: "-200px",
            background: dark
              ? "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,150,200,0.09) 0%, transparent 70%)",
            animation: "blob1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            right: "-100px",
            top: "100px",
            background: dark
              ? "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(100,40,200,0.08) 0%, transparent 70%)",
            animation: "blob2 15s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            left: "40%",
            bottom: "-100px",
            background: dark
              ? "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
            animation: "blob3 10s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: dark
              ? "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)"
              : "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 32px 80px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "80px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(32px)",
              transition: "all 0.9s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: dark
                  ? "rgba(52,211,153,0.08)"
                  : "rgba(16,185,129,0.08)",
                border: "1px solid rgba(52,211,153,0.25)",
                borderRadius: "100px",
                padding: "6px 14px",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                  animation: "ping 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#34d399",
                  
                }}
              >
                Available for opportunities
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(44px, 6.5vw, 88px)",
                fontWeight: 900,
                letterSpacing: "-3px",
                lineHeight: 0.95,
                color: dark ? "#f8fafc" : "#0f172a",
                margin: "0 0 16px",
              }}
            >
              Musaab
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #00d4ff 0%, #818cf8 50%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Suhail
              </span>
            </h1>

            <div
              style={{
                
                fontSize: "18px",
                marginBottom: "24px",
                color: dark ? "rgba(241,245,249,0.5)" : "rgba(15,23,42,0.5)",
                minHeight: "28px",
              }}
            >
              <span style={{ color: "#00d4ff" }}>&gt;&nbsp;</span>
              <span style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                {typed}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "18px",
                  background: "#00d4ff",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                maxWidth: "520px",
                color: dark ? "rgba(241,245,249,0.5)" : "rgba(15,23,42,0.5)",
                marginBottom: "24px",
              }}
            >
              Frontend Developer with{" "}
              <strong
                style={{ color: dark ? "#e2e8f0" : "#0f172a", fontWeight: 700 }}
              >
                1 year of production experience
              </strong>{" "}
              at Core Cognitics, Doha. Skilled in React, Redux, real-time
              WebSockets, and API-driven interfaces.
            </p>

            {/* TTS Button */}
            {/* <div style={{ marginBottom: "24px" }}>
              <TTSButton
                label="hero"
                text="Hi, I'm Musaab Suhail, a Frontend Developer with 1 year of production experience at Core Cognitics, Doha, Qatar. Skilled in React, Redux, real-time WebSockets, and API-driven interfaces. Currently available for new opportunities."
              />
            </div> */}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 800,
                  fontSize: "15px",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.3px",
                  boxShadow: "0 4px 28px rgba(0,212,255,0.25)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 36px rgba(0,212,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 4px 28px rgba(0,212,255,0.25)";
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  background: "none",
                  color: dark ? "#f1f5f9" : "#0f172a",
                  border: dark
                    ? "1.5px solid rgba(255,255,255,0.12)"
                    : "1.5px solid rgba(0,0,0,0.12)",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00d4ff";
                  e.currentTarget.style.color = "#00d4ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = dark
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.12)";
                  e.currentTarget.style.color = dark ? "#f1f5f9" : "#0f172a";
                }}
              >
                Get in touch
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "36px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: dark
                    ? "rgba(241,245,249,0.3)"
                    : "rgba(15,23,42,0.3)",
                  
                }}
              >
                find me on
              </span>
              {[
                {
                  label: "GitHub",
                  url: "https://github.com/musaabsuhail",
                  icon: "⌥",
                },
                {
                  label: "LinkedIn",
                  url: "https://linkedin.com/in/musaabsuhail",
                  icon: "◈",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    background: dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    border: dark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.08)",
                    color: dark
                      ? "rgba(241,245,249,0.65)"
                      : "rgba(15,23,42,0.65)",
                    fontSize: "13px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4ff";
                    e.currentTarget.style.borderColor =
                      "rgba(0,212,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = dark
                      ? "rgba(241,245,249,0.65)"
                      : "rgba(15,23,42,0.65)";
                    e.currentTarget.style.borderColor = dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.08)";
                  }}
                >
                  <span>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Code card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(32px)",
              transition: "all 0.9s ease 0.2s",
            }}
            className="hero-card"
          >
            <div
              style={{
                background: dark
                  ? "rgba(14,14,22,0.9)"
                  : "rgba(255,255,255,0.9)",
                border: dark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.09)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: dark
                  ? "0 32px 80px rgba(0,0,0,0.4)"
                  : "0 32px 80px rgba(0,0,0,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "14px 18px",
                  background: dark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                  borderBottom: dark
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: dark
                      ? "rgba(241,245,249,0.25)"
                      : "rgba(15,23,42,0.3)",
                    
                  }}
                >
                  musaab.ts
                </span>
              </div>
              <div
                style={{
                  padding: "24px",
                  
                  fontSize: "13px",
                  lineHeight: 2,
                }}
              >
                <div>
                  <span style={{ color: "#7c3aed" }}>const</span>{" "}
                  <span style={{ color: "#00d4ff" }}>musaab</span>{" "}
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>=</span>{" "}
                  <span style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                    {"{"}
                  </span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#a78bfa" }}>name</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>:</span>{" "}
                  <span style={{ color: "#34d399" }}>"Musaab Suhail"</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#a78bfa" }}>role</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>:</span>{" "}
                  <span style={{ color: "#34d399" }}>"Frontend Dev"</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#a78bfa" }}>stack</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>:</span>{" "}
                  <span style={{ color: dark ? "#e2e8f0" : "#334155" }}>[</span>
                  <span style={{ color: "#34d399" }}>"React"</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>, </span>
                  <span style={{ color: "#34d399" }}>"Redux"</span>
                  <span style={{ color: dark ? "#e2e8f0" : "#334155" }}>]</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#a78bfa" }}>location</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>:</span>{" "}
                  <span style={{ color: "#34d399" }}>"Doha, Qatar"</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#a78bfa" }}>available</span>
                  <span style={{ color: dark ? "#94a3b8" : "#64748b" }}>:</span>{" "}
                  <span style={{ color: "#fb923c" }}>true</span>
                </div>
                <div>
                  <span style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                    {"}"};
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "14px",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "1+", label: "Years Exp", color: "#00d4ff" },
                { value: "3", label: "Projects", color: "#a78bfa" },
                { value: "5", label: "Languages", color: "#34d399" },
                { value: "4", label: "Certs", color: "#fb923c" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    minWidth: "70px",
                    background: dark
                      ? "rgba(14,14,22,0.7)"
                      : "rgba(255,255,255,0.8)",
                    border: `1px solid ${s.color}22`,
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: "22px",
                      color: s.color,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: dark
                        ? "rgba(241,245,249,0.4)"
                        : "rgba(15,23,42,0.4)",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: dark ? "rgba(241,245,249,0.25)" : "rgba(15,23,42,0.25)",
            
            letterSpacing: "2px",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: `linear-gradient(to bottom, ${dark ? "rgba(0,212,255,0.4)" : "rgba(0,150,200,0.4)"}, transparent)`,
          }}
        />
      </div>

      <style>{`
        @keyframes blob1 { from{transform:translate(0,0) scale(1)} to{transform:translate(40px,30px) scale(1.05)} }
        @keyframes blob2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-30px,40px) scale(1.08)} }
        @keyframes blob3 { from{transform:translate(0,0)} to{transform:translate(20px,-25px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ping { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-card { max-width: 420px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
export { Hero };
