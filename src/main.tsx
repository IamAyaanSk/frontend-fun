import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

import "./index.css";
import { createRoot } from "react-dom/client";

import { routeTree } from "#src/routeTree.gen.js";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
