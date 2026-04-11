import { Outlet } from "@tanstack/react-router";
import { AppHeader } from "./header/AppHeader";
import { GlyphErrorProvider } from "@/context/GlyphErrorContext";

export const App = () => {
  return (
    <GlyphErrorProvider>
      <AppHeader />
      <Outlet />
    </GlyphErrorProvider>
  );
};
