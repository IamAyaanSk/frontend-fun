import { Sidebar } from "#src/components/sidebar.js";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex h-screen overflow-clip bg-muted">
        <Sidebar />
        <main className="w-full p-4">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
