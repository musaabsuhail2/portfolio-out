import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = "en" | "ar";

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
];

// 🌍 Dynamic flag generator
const getFlag = (code: string) => {
  const map: Record<string, string> = {
    en: "🇺🇸",
    ar: "🇸🇦",
  };
  return map[code] || "🌐";
};

function LanguageSelector() {
  const { i18n } = useTranslation();
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";

  const currentLang = i18n.language.split("-")[0] as Language;

  const handleChange = (value: any) => {
    i18n.changeLanguage(value);
  };

  // 🌍 RTL support
  useEffect(() => {
    document.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [currentLang]);

  return (
    <Select value={currentLang} onValueChange={handleChange}>
      {/* 🔥 Tailwind Styled Trigger */}
      <SelectTrigger
        className={cn(
          "w-40 backdrop-blur-md transition-all",
          dark
            ? "bg-[#0e0e16]/60 border border-white/10 text-slate-200 hover:bg-[#0e0e16]/80"
            : "bg-white/90 border border-gray-200 text-gray-700 hover:bg-white"
        )}
      >
        <SelectValue placeholder="Language">
          <span className="flex items-center gap-2">
            {getFlag(currentLang)}
            {languages.find((l) => l.value === currentLang)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>

      {/* 🎬 Animated Dropdown */}
      <SelectContent
        className={cn(
          "overflow-hidden backdrop-blur-md",
          dark
            ? "bg-[#0e0e16]/95 border border-white/10"
            : "bg-white/95 border border-gray-200"
        )}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                <span className="flex items-center gap-2">
                  {getFlag(lang.value)}
                  {lang.label}
                </span>
              </SelectItem>
            ))}
          </motion.div>
        </AnimatePresence>
      </SelectContent>
    </Select>
  );
}

export default LanguageSelector;