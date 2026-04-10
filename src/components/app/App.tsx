import { Outlet } from "@tanstack/react-router";
import { AppHeader } from "./header/AppHeader";

export const App = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
