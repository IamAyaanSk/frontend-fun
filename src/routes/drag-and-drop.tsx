import { DragAnywhere } from "../components/drag-and-drop/drag-anywhere.tsx";
import { Kanban } from "../components/drag-and-drop/kanban.tsx";
import { SimpleDrag } from "../components/drag-and-drop/simple-drag.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/drag-and-drop")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SimpleDrag />
      <DragAnywhere />
      <Kanban />
    </>
  );
}
