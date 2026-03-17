import { useEffect } from "react";
import { useAppSelector } from "@/shared/hooks";
import { useColorMode } from "@/shared/components/ui/color-mode";

export function useChakraThemeSync() {
  const { setColorMode } = useColorMode();
  const mode = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    setColorMode(mode);
  }, [mode, setColorMode]);
}
