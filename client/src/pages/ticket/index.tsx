import { useTickets } from "../../api/ticket";
import { Loader } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import Table from "../../components/Table";

export const Ticket = () => {
  const { data: tickets = [], isLoading, error } = useTickets();
  const navigate = useNavigate();

  const handleNavigateTicket = (ticketId: string) => {
    console.log(`Attempting to navigate to ticket: ${ticketId}`);
    navigate({ to: "/ticket/$ticketId", params: { ticketId } })
      .then(() => console.log("Navigation successful"))
      .catch((error) => console.error("Navigation failed:", error));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="animate-spin w-24 h-24" />
      </div>
    );

  return (
    <div className="w-11/12 max-w-6xl mx-auto my-4">
      <h2 className="font-bold text-2xl">Tickets</h2>
      <Table onNavigate={handleNavigateTicket} tickets={tickets} />
    </div>
  );
};
