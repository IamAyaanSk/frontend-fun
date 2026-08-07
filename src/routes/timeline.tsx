import { createFileRoute } from "@tanstack/react-router";
import { SimpleTimeline } from "../components/timeline/simple-timeline";

export const Route = createFileRoute("/timeline")({
  component: RouteComponent,
});

const events = [
  {
    status: "Completed",
    colorHash: "#2563eb",
    timeString: "Aug 6, 2026",
    title: "Order Placed",
  },
  {
    status: "Completed",
    colorHash: "#0ea5e9",
    timeString: "Aug 6, 2026",
    title: "Confirmed",
  },
  {
    status: "Completed",
    colorHash: "#8b5cf6",
    timeString: "Aug 6, 2026",
    title: "Packed",
  },
  {
    status: "Completed",
    colorHash: "#f59e0b",
    timeString: "Aug 6, 2026",
    title: "Shipped",
  },
  {
    status: "Completed",
    colorHash: "#f97316",
    timeString: "Aug 7, 2026",
    title: "Out for Delivery",
  },
  {
    status: "Completed",
    colorHash: "#22c55e",
    timeString: "Aug 7, 2026",
    title: "Delivered",
  },
];

function RouteComponent() {
  return (
    <>
      <SimpleTimeline events={events} />
    </>
  );
}
