import Charts from "../../components/Charts";
import Table from "../../components/Table";
import { TicketCards } from "./TicketCards";

export const Dashboard = () => {
  return (
    <div>
      <div className="bg-black">
        <div className="w-11/12 max-w-6xl mx-auto">
          <h1 className="text-white font-bold text-2xl pb-4">Dashboard</h1>
          <TicketCards />
        </div>
      </div>
      <div className="w-11/12 max-w-6xl mx-auto">
        <Table />
        {/* <Charts /> */}
      </div>
    </div>
  );
};
