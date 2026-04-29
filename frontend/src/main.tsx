import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
