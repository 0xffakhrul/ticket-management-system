import { format } from "date-fns";
import { useCreateMessage, useTicket, useUpdateTicket } from "../../api/ticket";
import { Route } from "../../routes/ticket.$ticketId";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { useUser } from "@clerk/clerk-react";

export const Details = () => {
  const { ticketId } = Route.useParams();
  const { data: ticket, isLoading } = useTicket(ticketId);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState(ticket?.status ?? "");
  const [priority, setPriority] = useState(ticket?.priority ?? "");

  const { user } = useUser();

  const createMessage = useCreateMessage();
  const updateTicket = useUpdateTicket();

  const handleCreateMessage = async () => {
    if (newMessage.trim() && ticket) {
      createMessage.mutate(
        {
          ticketId: ticket._id,
          userId: ticket.userId,
          message: newMessage,
          senderName: user?.fullName ?? "",
          senderImageUrl: user?.imageUrl ?? "",
        },
        {
          onSuccess: () => {
            setNewMessage("");
          },
        }
      );
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (ticket) {
      updateTicket.mutate(
        { ...ticket, status: newStatus },
        {
          onSuccess: () => {
            console.log("Status updated successfully");
          },
          onError: (error) => {
            console.error("Error updating status:", error);
            setStatus(ticket.status);
          },
        }
      );
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setPriority(newPriority);
    if (ticket) {
      updateTicket.mutate(
        { ...ticket, priority: newPriority },
        {
          onSuccess: () => {
            console.log("Priority updated successfully");
          },
          onError: (error) => {
            console.error("Error updating priority:", error);
            setPriority(ticket.priority);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
    }
  }, [ticket]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && ticket) {
      setIsVisible(true);
    }
  }, [isLoading, ticket]);

  const formattedDate = (date: string): string => {
    return format(new Date(date), "cccc, dd/MM/yyyy");
  };

  const getTime = (time: string): string => {
    return format(new Date(time), "h:mm a");
  };

  return (
    <div
      className={cn(
        "w-11/12 max-w-6xl mx-auto my-4 transition-opacity duration-200 ease-in ",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-2xl pb-4">Ticket Details</h1>
        <div className="flex flex-col text-sm space-y-5">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="shadow rounded-lg px-6 py-3 bg-white font-semibold text-base">
              <select
                name="status"
                id="status"
                className="block w-full"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="shadow rounded-lg px-6 py-3 bg-white font-semibold text-base">
              <select
                name="priority"
                id="priority"
                className="block w-full"
                value={priority}
                onChange={handlePriorityChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-5 space-y-3.5">
            <div className="flex">
              <p className="font-semibold min-w-28">Ticket ID</p>
              <p>{ticket?._id}</p>
            </div>
            <div className="flex">
              <p className="font-semibold min-w-28">Subject</p>
              <p> {ticket?.subject}</p>
            </div>
            <div className="flex">
              <p className="font-semibold min-w-28">Created by</p>
              <p>{ticket?.user.name}</p>
            </div>
            <div className="flex">
              <p className="font-semibold min-w-28">Created at</p>
              <p>{ticket?.createdAt ? formattedDate(ticket.createdAt) : ""}</p>
            </div>
            <div className="flex">
              <p className="font-semibold min-w-28">Description</p>
              <p>{ticket?.description}</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-5 space-y-3.5">
            <h3 className="font-semibold">Messages</h3>
            {ticket?.messages && ticket.messages.length > 0 ? (
              ticket.messages.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 border-b pb-4"
                >
                  <img
                    src={message.sender.imageUrl}
                    alt="profile picture"
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="flex">
                      <p className="font-semibold pr-1">
                        {message.sender.name}{" "}
                      </p>
                      <p className="text-sm text-gray-500">
                        • {getTime(message.date.toString())}
                      </p>
                    </div>
                    <div>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )}
            <div className="flex items-center gap-2">
              <input
                className="text-sm border rounded-full h-8 w-full px-3 py-2 col-span-11"
                type="text"
                name=""
                id=""
                placeholder="Placeholder"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="rounded-full h-8 bg-black px-5 text-white font-bold"
                onClick={handleCreateMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
