import { Outlet, ScrollRestoration } from "react-router-dom";

export default function EmptyLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
