import { Outlet, ScrollRestoration } from "react-router";
import TheHeader from "@/components/TheHeader";

export default function DefaultLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
