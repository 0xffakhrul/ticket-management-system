import { TicketCards } from "./TicketCards";

export const Dashboard = () => {
  return (
    <div className="bg-black py-4 px-8 ">
      <div className="w-11/12 max-w-6xl mx-auto">
        <h1 className="text-white font-bold text-2xl pb-4">Dashboard</h1>
        <TicketCards />
      </div>
    </div>
  );
};
