import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { value: "en", label: "🇺🇸 English" },
  { value: "ar", label: "🇸🇦 العربية" },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";

  return (
    <Select
      value={i18n.language}
      onValueChange={(value: any) => i18n.changeLanguage(value)}
    >
      <SelectTrigger
        className="w-40"
        style={{
          background: dark ? "rgba(14,14,22,0.6)" : "rgba(255,255,255,0.9)",
          border: dark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid #e5e7eb",
          color: dark ? "#e2e8f0" : "#374151",
          backdropFilter: "blur(10px)",
        }}
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent
        style={{
          background: dark ? "rgba(14,14,22,0.95)" : "rgba(255,255,255,0.95)",
          border: dark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid #e5e7eb",
          backdropFilter: "blur(10px)",
        }}
      >
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSelector;
