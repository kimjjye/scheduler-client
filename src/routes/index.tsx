import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import { checkAuth } from "./loaders/requiresAuth";
import EmptyLayout from "./layouts/EmptyLayout";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    loader: checkAuth,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
    ],
  },
  {
    element: <EmptyLayout />,
    loader: checkAuth,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    element: <EmptyLayout />,
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
