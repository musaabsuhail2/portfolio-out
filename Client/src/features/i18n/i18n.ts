import i18n from "i18next";
import { initReactI18next } from "node_modules/react-i18next";
import en from "@/assets/locales/en/translation.json";
import ar from "@/assets/locales/ar/translation.json";

i18n.use(initReactI18next).init({
  debug: false,
  lng: "en",
  fallbackLng: "en",
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
});

export default i18n;
