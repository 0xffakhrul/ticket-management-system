import { createFileRoute } from "@tanstack/react-router";
import { Details } from "../pages/ticket/Details";

export const Route = createFileRoute("/ticket/$ticketId")({
  component: Details,
});
