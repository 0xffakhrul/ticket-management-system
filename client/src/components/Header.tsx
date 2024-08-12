import { UserButton } from "@clerk/clerk-react";
import { Link, Outlet } from "@tanstack/react-router";

const Header = () => {
  return (
    <>
      <div className="bg-black py-4 border-b border-gray-800 px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <Link to="/" className="text-white">
              Home
            </Link>
          </div>
          <div className="space-x-8 flex items-center">
            <Link to="/dashboard" className="text-white font-bold">
              Dashboard
            </Link>
            <Link to="/tickets" className="text-white font-bold">
              Tickets
            </Link>
            <Link to="/create" className="text-white font-bold">
              <button className="rounded-full border border-white px-4 py-2">
                + New Ticket
              </button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
