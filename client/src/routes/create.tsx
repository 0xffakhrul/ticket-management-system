import { createFileRoute } from "@tanstack/react-router";
import { CreateTicket } from "../pages/create";

export const Route = createFileRoute("/create")({
  component: CreateTicket,
});
