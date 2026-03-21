import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/features/theme/store";
import { useAppSelector } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { HomePage } from "@/pages/home";

const Portfolio: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(160deg, #08080e 0%, #0c0c16 50%, #070710 100%)"
          : "linear-gradient(160deg, #f0f9ff 0%, #f8fafc 50%, #f1f5f9 100%)",
        color: dark ? "#f1f5f9" : "#0f172a",
        transition: "background 0.4s ease, color 0.3s ease",
      }}
    >
      <HomePage />
    </div>
  );
};

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <Portfolio />
  </ReduxProvider>
);

export default App;