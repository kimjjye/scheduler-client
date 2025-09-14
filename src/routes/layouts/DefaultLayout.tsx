import { Outlet, ScrollRestoration } from "react-router-dom";
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default function DefaultLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
      <TheFooter />
      <ScrollRestoration />
    </>
  );
}
