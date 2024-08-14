import { useUser } from "@clerk/clerk-react";
import { useTickets } from "../../api/ticket";
import { format } from "date-fns";
import { cn } from "../../utils/cn";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const Ticket = () => {
  const { data: tickets, isLoading, error } = useTickets();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigateTicket = (ticketId: string) => {
    console.log(`Attempting to navigate to ticket: ${ticketId}`);
    navigate({ to: "/ticket/$ticketId", params: { ticketId } })
      .then(() => console.log("Navigation successful"))
      .catch((error) => console.error("Navigation failed:", error));
  };

  const getUserName = (userId: string) => {
    if (user && user.id === userId) {
      return { name: user.fullName, image: user.imageUrl };
    }
  };

  const formatDate = (dateString: string): string => {
    return format(dateString, "dd/MM/yyyy");
  };

  const badgeColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-400";
      default:
        break;
    }
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-300";
      case "medium":
        return "bg-yellow-300";
      case "low":
        return "bg-blue-300";
      default:
        break;
    }
  };

  return (
    <div className="w-11/12 max-w-6xl mx-auto my-4">
      <h2 className="font-bold text-2xl pb-4">Tickets</h2>
      <div className="bg-white shadow-lg rounded-lg px-4 py-3">
        {/* <h3 className="font-bold">All Tickets</h3> */}
        <div className="relative overflow-x-auto">
          <table className="w-full overflow-x-auto overflow-y-hidden text-sm ">
            <thead className="border-b">
              <tr className="text-left space-x-3">
                <th className="px-6 py-2">Id</th>
                <th className="px-6 py-2">Name</th>
                <th className="px-6 py-2">Subject</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Priority</th>
                <th className="px-6 py-2">Created at</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((ticket) => (
                <tr className="text-left border-b">
                  <td className="px-4 py-4 text-xs w-52 align-middle">
                    <div>
                      <span className="bg-gray-100 inline-flex items-center rounded-full border px-1.5 py-1 text-xs font-medium">
                        {ticket._id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-2 font-semibold">
                    <div className="flex items-center gap-2">
                      <img
                        src={ticket.user?.imageUrl ?? ""}
                        alt="profile picture"
                        className="rounded-full h-6 w-6"
                      />
                      {/* <p>{getUserName(ticket.userId)?.name}</p> */}
                      <p>{ticket.user?.name ?? ""}</p>
                    </div>
                  </td>
                  <td className="px-6 py-2 max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-2 w-11">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-3.5 py-0.5 rounded-full border w-20 text-center",
                        badgeColor(ticket.status)
                      )}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-2 w-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          priorityColor(ticket.priority)
                        )}
                      ></div>
                      <span className="capitalize">{ticket.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-2 w-4">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="px-6 py-2">
                    <ArrowRight
                      className="h-5 w-5 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateTicket(ticket._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
