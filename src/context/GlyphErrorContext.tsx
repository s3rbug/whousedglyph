import { createContext, useContext, useState } from "react";
import { AlertType } from "@/hooks/useGlyphs";

type GlyphErrorContextType = {
  fetchError: AlertType | null;
  setFetchError: (error: AlertType | null) => void;
};

const GlyphErrorContext = createContext<GlyphErrorContextType | null>(null);

export const GlyphErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [fetchError, setFetchError] = useState<AlertType | null>(null);
  return (
    <GlyphErrorContext.Provider value={{ fetchError, setFetchError }}>
      {children}
    </GlyphErrorContext.Provider>
  );
};

export const useGlyphError = (): GlyphErrorContextType => {
  const ctx = useContext(GlyphErrorContext);
  if (ctx === null) {
    throw new Error("useGlyphError must be used within GlyphErrorProvider");
  }
  return ctx;
};
