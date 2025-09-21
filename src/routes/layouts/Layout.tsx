import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TheFooter from "@/components/TheFooter";

const DefaultLayout = () => {
  return (
    <div className="size-full bg-green-900 flex dark:text-white ">
      <Navigation />
      <div className="flex flex-col px-10 py-5 gap-5 flex-1 w-full p-6 overflow-auto">
        <Outlet />
        <TheFooter />
        <ScrollRestoration />
      </div>
    </div>
  );
};

const EmptyLayout = () => {
  return (
    <main className="text-green-950 dark:text-white size-full">
      <Outlet />
      <ScrollRestoration />
    </main>
  );
};

export { EmptyLayout, DefaultLayout };
