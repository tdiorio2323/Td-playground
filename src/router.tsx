import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

// Example pages – replace with your real components
import CreatorLandingPage from "./components/CreatorLandingPage";
import NotFound from "./components/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
      children: [
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "creator",
          element: (
            <CreatorLandingPage
              socialLink="https://www.instagram.com/rubirose/"
              creatorName="Rubi Rose"
            />
          ),
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}