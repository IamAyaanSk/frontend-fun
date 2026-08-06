import { InteractiveWorldMap } from "../components/world-map/interactive-world-map.tsx";
import { WorldMap } from "../components/world-map/world-map.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { WORLD_MAP_DATA } from "../data/world-map-data.ts";

export const Route = createFileRoute("/world-map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WorldMap />
      <InteractiveWorldMap mapData={WORLD_MAP_DATA} />
    </>
  );
}
