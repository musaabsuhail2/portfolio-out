"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import type { PropsWithChildren } from "react";

export function Provider({
  children,
  ...props
}: PropsWithChildren<ColorModeProviderProps>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props}>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
