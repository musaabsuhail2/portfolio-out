import React, { useState } from "react";
import { useAppSelector } from "@/shared/hooks";
import { projects } from "@/shared/constants/data";
// import { TTSButton } from "@/features/tts";

const Projects: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="projects"
      style={{
        padding: "120px 32px",
        background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
      }}
    >
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
            02 — Projects
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
            Things I've built
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project) => {
            const isHovered = hovered === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: dark
                    ? "rgba(14,14,22,0.7)"
                    : "rgba(255,255,255,0.85)",
                  border: isHovered
                    ? `1px solid ${project.color}44`
                    : dark
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "20px",
                  padding: "32px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  transform: isHovered ? "translateY(-6px)" : "none",
                  boxShadow: isHovered
                    ? `0 24px 60px ${project.color}14`
                    : "none",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${project.color}10, transparent 70%)`,
                    top: -80,
                    right: -80,
                    pointerEvents: "none",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      flexShrink: 0,
                      fontSize: "24px",
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s",
                      transform: isHovered ? "scale(1.08)" : "none",
                    }}
                  >
                    {project.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: "17px",
                        color: dark ? "#f8fafc" : "#0f172a",
                        margin: "0 0 8px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {project.title}
                    </h3>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "5px",
                            background: `${project.color}12`,
                            color: project.color,
                            letterSpacing: "0.3px",
                            
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color: dark
                      ? "rgba(241,245,249,0.5)"
                      : "rgba(15,23,42,0.5)",
                    lineHeight: 1.75,
                    marginBottom: "16px",
                  }}
                >
                  {project.description}
                </p>

                {/* TTS Button per project */}
                <div style={{ marginBottom: "16px" }}>
                  {/* <TTSButton
                    label={project.title}
                    text={`${project.title}. ${project.description} ${project.points.join(". ")}`}
                  /> */}
                </div>

                <div
                  style={{
                    borderTop: dark
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.05)",
                    paddingTop: "18px",
                  }}
                >
                  {project.points.map((p) => (
                    <div
                      key={p}
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontSize: "13px",
                        color: dark
                          ? "rgba(241,245,249,0.6)"
                          : "rgba(15,23,42,0.6)",
                        marginBottom: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: project.color,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        ▸
                      </span>
                      {p}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: project.color,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      color: dark
                        ? "rgba(241,245,249,0.3)"
                        : "rgba(15,23,42,0.35)",
                      
                    }}
                  >
                    Core Cognitics · Production
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
export { Projects };
