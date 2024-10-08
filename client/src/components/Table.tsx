import React from "react";
import { format } from "date-fns";
import { cn } from "../utils/cn";
import { ArrowRight } from "lucide-react";
import empty from "../assets/empty.svg";
import { Ticket } from "../api/request";

interface TableProps {
  tickets: Ticket[];
  onNavigate: (ticketId: string) => void;
}

const Table: React.FC<TableProps> = ({ tickets, onNavigate }) => {
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
        return "";
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
        return "";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-3 mt-4">
      {tickets.length > 0 ? (
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
                <th className="px-6 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket: any) => (
                <tr key={ticket._id} className="text-left border-b">
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
                        onNavigate(ticket._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img src={empty} alt="" className="w-52 h-52" />
          <p className="pt-5 font-bold text-2xl">
            No tickets have been created yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;
