import { CircleCheckBig, Clock, FolderOpen, Layers } from "lucide-react";
import { useTickets } from "../../api/ticket";

export const TicketCards = () => {
  const { data: tickets, isLoading, error } = useTickets();

  const openTickets =
    tickets?.filter((ticket) => ticket.status === "open").length || 0;

  const pendingTickets =
    tickets?.filter((ticket) => ticket.status === "pending").length || 0;

  const closedTickets =
    tickets?.filter((ticket) => ticket.status === "closed").length || 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5">
      <div className="text-white bg-zinc-800 rounded-md px-10 py-8 flex items-center gap-4">
        <div className="rounded-full bg-blue-300 p-3">
          <Layers className="w-8 h-8 text-gray-700" />
        </div>
        <div>
          <p className="text-2xl font-bold">{tickets?.length}</p>
          <span>Total Tickets</span>
        </div>
      </div>
      <div className="text-white bg-zinc-800 rounded-md px-10 py-8 flex items-center gap-4">
        <div className="rounded-full bg-green-300 p-3">
          <FolderOpen className="w-8 h-8 text-gray-700" />
        </div>
        <div>
          <p className="text-2xl font-bold">{openTickets}</p>
          <span>Open Tickets</span>
        </div>
      </div>
      <div className="text-white bg-zinc-800 rounded-md px-10 py-8 flex items-center gap-4">
        <div className="rounded-full bg-yellow-300 p-3">
          <Clock className="w-8 h-8 text-gray-700" />
        </div>
        <div>
          <p className="text-2xl font-bold">{pendingTickets}</p>
          <span>Pending Tickets</span>
        </div>
      </div>
      <div className="text-white bg-zinc-800 rounded-md px-10 py-8 flex items-center gap-4">
        <div className="rounded-full bg-purple-300 p-3">
          <CircleCheckBig className="w-8 h-8 text-gray-700" />
        </div>
        <div>
          <p className="text-2xl font-bold">{closedTickets}</p>
          <span>Closed Tickets</span>
        </div>
      </div>
    </div>
  );
};
