import { WorldMap } from "../components/world-map/WorldMap.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/world-map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WorldMap />
    </>
  );
}
