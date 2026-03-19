import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks";
import { certifications } from "@/shared/constants/data";

const About: React.FC = () => {
  const { t } = useTranslation();
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";

  const card = {
    background: dark ? "rgba(14,14,22,0.6)" : "rgba(255,255,255,0.8)",
    border: dark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.07)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  };

  const experiencePoints = Array.isArray(
    t("about.experience.points", { returnObjects: true })
  )
    ? (t("about.experience.points", { returnObjects: true }) as string[])
    : [];

  const languageList = Array.isArray(
    t("about.languages.list", { returnObjects: true })
  )
    ? (t("about.languages.list", { returnObjects: true }) as string[])
    : [];

  return (
    <section id="about" style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px" }}>
          <p
            style={{
              
              fontSize: "12px",
              color: "#00d4ff",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {t("about.label")}
          </p>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 900,
              color: dark ? "#f8fafc" : "#0f172a",
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            {t("about.title")}
          </h2>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
          className="about-grid"
        >
          {/* Bio */}
          <div
            style={{ ...card, padding: "36px", gridColumn: "span 2" }}
            className="bio-card"
          >
            <div
              style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
              className="bio-inner"
            >
              <div
                style={{
                  width: 80, height: 80, flexShrink: 0, borderRadius: "20px",
                  background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                  border: "1px solid rgba(0,212,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "36px",
                }}
              >
                👨‍💻
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "22px",
                    color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 12px", letterSpacing: "-0.5px",
                  }}
                >
                  {t("about.bio.name")}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: dark ? "rgba(241,245,249,0.55)" : "rgba(15,23,42,0.55)",
                    lineHeight: 1.85, margin: "0 0 20px", maxWidth: "680px",
                  }}
                  dangerouslySetInnerHTML={{ __html: t("about.bio.description") }}
                />
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {[
                    { icon: "📍", key: "about.bio.location" },
                    { icon: "📧", key: "about.bio.email" },
                    { icon: "🎓", key: "about.bio.education_badge" },
                  ].map((item) => (
                    <span
                      key={item.key}
                      style={{
                        fontSize: "12px", padding: "6px 12px", borderRadius: "8px",
                        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        color: dark ? "rgba(241,245,249,0.55)" : "rgba(15,23,42,0.55)",
                        fontWeight: 500,
                      }}
                    >
                      {item.icon} {t(item.key)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ ...card, padding: "32px" }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "16px",
                color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 24px",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              <span style={{ color: "#00d4ff" }}>💼</span> {t("about.experience.title")}
            </h3>
            <div>
              <div
                style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "6px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 800, fontSize: "16px",
                      color: dark ? "#f1f5f9" : "#0f172a",
                      margin: 0, fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {t("about.experience.role")}
                  </p>
                  <p style={{ fontSize: "14px", color: "#00d4ff", fontWeight: 700, margin: "4px 0 0" }}>
                    {t("about.experience.company")}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "11px", padding: "4px 12px", borderRadius: "20px", fontWeight: 700,
                    background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00d4ff",  whiteSpace: "nowrap",
                  }}
                >
                  {t("about.experience.period")}
                </span>
              </div>
              {experiencePoints.map((point) => (
                <div
                  key={point}
                  style={{
                    display: "flex", gap: "10px", fontSize: "13px",
                    color: dark ? "rgba(241,245,249,0.55)" : "rgba(15,23,42,0.55)",
                    marginBottom: "8px", lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#00d4ff", flexShrink: 0 }}>▸</span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Education + Certs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ ...card, padding: "28px" }}>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "16px",
                  color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 18px",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                <span>🎓</span> {t("about.education.title")}
              </h3>
              <p style={{ fontWeight: 800, fontSize: "15px", color: dark ? "#f1f5f9" : "#0f172a", margin: 0 }}>
                {t("about.education.degree")}
              </p>
              <p style={{ fontSize: "13px", color: "#a78bfa", fontWeight: 700, margin: "4px 0 2px" }}>
                {t("about.education.university")}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: dark ? "rgba(241,245,249,0.4)" : "rgba(15,23,42,0.4)",
                  margin: "0 0 14px",
                }}
              >
                {t("about.education.period")}
              </p>
              <div
                style={{
                  height: "1px",
                  background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  margin: "14px 0",
                }}
              />
              <p style={{ fontWeight: 700, fontSize: "14px", color: dark ? "#f1f5f9" : "#0f172a", margin: 0 }}>
                {t("about.education.secondary")}
              </p>
              <p style={{ fontSize: "13px", color: "#a78bfa", fontWeight: 700, margin: "4px 0 0" }}>
                {t("about.education.school")}
              </p>
            </div>

            <div style={{ ...card, padding: "28px" }}>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "16px",
                  color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 18px",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                <span>🏆</span> {t("about.certifications.title")}
              </h3>
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: "9px", flexShrink: 0, fontSize: "16px",
                      background: `${cert.color}14`, border: `1px solid ${cert.color}28`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px", color: dark ? "#e2e8f0" : "#0f172a", margin: 0 }}>
                      {cert.name}
                    </p>
                    <p style={{ fontSize: "11px", color: cert.color, fontWeight: 700, margin: 0 }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages spoken */}
          <div style={{ ...card, padding: "28px", gridColumn: "span 2" }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "16px",
                color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 16px",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <span>🌐</span> {t("about.languages.title")}
            </h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {languageList.map((lang, i) => {
                const colors = ["#00d4ff", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];
                return (
                  <div
                    key={lang}
                    style={{
                      padding: "9px 20px", borderRadius: "100px",
                      background: `${colors[i]}10`, border: `1px solid ${colors[i]}30`,
                      color: colors[i], fontSize: "14px", fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {lang}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .bio-card { grid-column: span 1 !important; }
          .bio-inner { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default About;
export { About };