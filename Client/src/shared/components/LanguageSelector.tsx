import { useTranslation } from "node_modules/react-i18next";
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValueText,
  createListCollection,
} from "@chakra-ui/react";
import { useAppSelector } from "@/shared/hooks";

const languages = createListCollection({
  items: [
    { value: "en", label: "🇺🇸 English" },
    { value: "ar", label: "🇸🇦 العربية" },
  ],
});

function LanguageSelector() {
  const { i18n } = useTranslation();
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === "dark";

  const handleChange = (details: { value: string[] }) => {
    const selectedLang = details.value[0];
    if (selectedLang) i18n.changeLanguage(selectedLang);
  };

  return (
    <SelectRoot
      collection={languages}
      value={[i18n.language]}
      onValueChange={handleChange}
      width="160px"
      size="sm"
    >
      <SelectTrigger
        bg={dark ? "rgba(14,14,22,0.6)" : "white"}
        border="1px solid"
        borderColor={dark ? "rgba(255,255,255,0.06)" : "gray.200"}
        borderRadius="lg"
        px={3}
        py={2}
        color={dark ? "rgba(241,245,249,0.85)" : "gray.700"}
        backdropFilter="blur(10px)"
        _hover={{
          borderColor: dark ? "rgba(0,212,255,0.4)" : "blue.400",
          boxShadow: dark ? "0 0 0 1px rgba(0,212,255,0.3)" : "sm",
        }}
        _focus={{
          borderColor: dark ? "#00d4ff" : "blue.500",
          boxShadow: dark
            ? "0 0 0 2px rgba(0,212,255,0.25)"
            : "0 0 0 2px rgba(66,153,225,0.3)",
        }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <SelectValueText fontSize="sm" fontWeight="500" placeholder="Language" />
      </SelectTrigger>

      <SelectContent
        bg={dark ? "rgba(14,14,22,0.95)" : "white"}
        border="1px solid"
        borderColor={dark ? "rgba(255,255,255,0.06)" : "gray.100"}
        borderRadius="lg"
        boxShadow={dark ? "0 8px 32px rgba(0,0,0,0.5)" : "lg"}
        backdropFilter="blur(10px)"
        overflow="hidden"
        mt={1}
        p={1}
      >
        {languages.items.map((lang) => (
          <SelectItem
            key={lang.value}
            item={lang}
            borderRadius="md"
            px={3}
            py={2}
            fontSize="sm"
            fontWeight="500"
            color={dark ? "rgba(241,245,249,0.75)" : "gray.700"}
            cursor="pointer"
            _hover={{
              bg: dark ? "rgba(0,212,255,0.08)" : "blue.50",
              color: dark ? "#00d4ff" : "blue.600",
            }}
            _selected={{
              bg: dark ? "rgba(0,212,255,0.08)" : "blue.50",
              color: dark ? "#00d4ff" : "blue.600",
              fontWeight: "600",
            }}
            transition="all 0.15s"
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default LanguageSelector;
