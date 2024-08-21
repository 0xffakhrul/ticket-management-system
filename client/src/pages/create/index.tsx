import { useState } from "react";
import { useCreateTicket } from "../../api/ticket";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const CreateTicket = () => {
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("open");
  const [priority, setPriority] = useState<string>("low");
  const { user } = useUser();

  const createTicketMutation = useCreateTicket();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error("Please provide a subject for the ticket");
      return;
    }

    const newTicket = {
      userId: user?.id || "",
      subject,
      description,
      status: status as "open",
      priority: priority as "low" | "medium" | "high",
      messages: [],
      user: {
        name: user?.fullName || user?.username || "",
        imageUrl: user?.imageUrl || "",
      },
    };

    try {
      await createTicketMutation.mutateAsync(newTicket);
      setSubject("");
      setDescription("");
      setStatus("open");
      setPriority("low");
      console.log(newTicket);
      toast.success("Ticket created successfully!");
    } catch (error) {
      toast.error("Error creating ticket");
    }
  };

  return (
    <div className="py-4 px-4 sm:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="font-bold text-xl sm:text-2xl pb-4">Create Ticket</h1>
        <form className="flex flex-col text-sm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="shadow rounded-lg px-4 sm:px-6 py-3 bg-white font-semibold text-base">
              <p>Open</p>
            </div>
            <div className="shadow rounded-lg px-4 sm:px-6 py-3 bg-white font-semibold text-base">
              <select
                name="priority"
                id="priority"
                className="block w-full"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg px-4 sm:px-6 py-5 space-y-5">
            <div className="grid sm:grid-cols-[120px_1fr] gap-2 sm:gap-4 items-center">
              <label htmlFor="subject" className="font-semibold ">
                Subject
              </label>
              <input
                className="text-sm border rounded-full h-8 w-full px-3 py-2 "
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter ticket subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] gap-2 sm:gap-4 ">
              <label htmlFor="description" className="font-semibold ">
                Description
              </label>
              <textarea
                className="text-sm border rounded-xl w-full px-3 py-2 "
                rows={4}
                name="description"
                id="description"
                placeholder="Enter ticket description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button className="rounded-full bg-black py-2 px-5 text-white font-bold">
                Create Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
