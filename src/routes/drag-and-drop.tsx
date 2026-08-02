import { DragAnywhere } from "#src/components/drag-and-drop/drag-anywhere.tsx";
import { SimpleDrag } from "#src/components/drag-and-drop/simple-drag.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/drag-and-drop")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SimpleDrag />
      <DragAnywhere />
    </>
  );
}
