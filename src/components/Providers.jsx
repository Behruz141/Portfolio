"use client";

import { ThemeProvider } from "@/components/theme/theme-settings/ThemeProvider";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

// Barcha "context"larni bitta joyga yig'dik (oldin main.jsx'da edi)
export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
