import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout, EmptyLayout } from "./layouts/Layout";
import { checkAuth } from "./loaders/requiresAuth";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";
import StudentsPage from "./pages/student/StudentsPage";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    loader: checkAuth,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/students",
        element: <StudentsPage />,
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
