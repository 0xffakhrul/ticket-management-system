import Table from "../../components/Table";
import { TicketCards } from "./TicketCards";
import { useTickets } from "../../api/ticket";
import { useNavigate } from "@tanstack/react-router";

export const Dashboard = () => {
  const { data: tickets = [], isLoading } = useTickets();
  const navigate = useNavigate();

  const recentTickets = tickets
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const handleNavigateTicket = (ticketId: string) => {
    navigate({ to: "/ticket/$ticketId", params: { ticketId } });
  };

  return (
    <div>
      <div className="bg-black">
        <div className="w-11/12 max-w-6xl mx-auto">
          <h1 className="text-white font-bold text-2xl py-4">Dashboard</h1>
          {isLoading ? <p className="text-white pb-4">Loading tickets...</p> : <TicketCards />}
        </div>
      </div>
      <div className="w-11/12 max-w-6xl mx-auto my-4">
        <h2 className="font-bold text-xl mt-6 mb-4">Recent Tickets</h2>
        {isLoading ? (
          <p>Loading tickets...</p>
        ) : (
          <Table tickets={recentTickets} onNavigate={handleNavigateTicket} />
        )}
        {/* <Charts /> */}
      </div>
    </div>
  );
};
