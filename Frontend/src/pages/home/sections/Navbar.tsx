import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { toggleTheme } from "@/features/theme/store/themeSlice";
import LanguageSelector from "@/shared/components/LanguageSelector";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About", "Projects", "Skills", "Contact"];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        dir="ltr"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          background: scrolled
            ? dark
              ? "rgba(8,8,14,0.88)"
              : "rgba(255,255,255,0.88)"
            : "transparent",
          borderBottom: scrolled
            ? dark
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: 0,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
              fontWeight: 700,
              fontSize: "13px",
              color: "white",
            }}
          >
            MS
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              color: dark ? "#f1f5f9" : "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            musaab<span style={{ color: "#00d4ff" }}>.</span>
          </span>
        </button>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          className="nav-desktop"
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "7px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: dark ? "rgba(241,245,249,0.6)" : "rgba(15,23,42,0.6)",
                transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00d4ff";
                e.currentTarget.style.background = "rgba(0,212,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = dark
                  ? "rgba(241,245,249,0.6)"
                  : "rgba(15,23,42,0.6)";
                e.currentTarget.style.background = "none";
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LanguageSelector />
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              background: dark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              display: "none",
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: dark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.06)",
              fontSize: "18px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          dir="ltr"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 999,
            background: dark
              ? "rgba(8,8,14,0.97)"
              : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            padding: "16px 24px 24px",
            borderBottom: dark
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(0,0,0,0.07)",
          }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                display: "block",
                width: "100%",
                padding: "14px 16px",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 700,
                color: dark ? "#f1f5f9" : "#0f172a",
                borderRadius: "10px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
export { Navbar };
