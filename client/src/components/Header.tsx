import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, Outlet } from "@tanstack/react-router";
import { TicketPercent, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="bg-black py-4 border-b border-gray-800 px-4">
        <div className="flex justify-between items-center w-full sm:w-11/12 max-w-6xl mx-auto">
          <div>
            <Link to="/" className="text-accent font-bold">
              <div className="flex gap-2 items-center">
                <TicketPercent />
                <span>Ticky</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <SignedIn>
              <Link to="/dashboard" className="text-white font-bold">
                Dashboard
              </Link>
              <Link to="/tickets" className="text-white font-bold">
                Tickets
              </Link>
              <Link to="/create" className="text-white font-bold">
                <button className="rounded-full border border-accent px-4 py-2 text-accent">
                  + New Ticket
                </button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="rounded-full border border-accent px-4 py-2 text-accent">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <>
                  <SignedIn>
                    <Menu className="w-6 h-6" />
                  </SignedIn>
                  <SignedOut>
                    <div className="rounded-full border border-accent px-4 py-2 text-accent">
                      <SignInButton />
                    </div>
                  </SignedOut>
                </>
              )}
            </button>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/dashboard"
              className="text-white font-bold"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/tickets"
              className="text-white font-bold"
              onClick={toggleMenu}
            >
              Tickets
            </Link>
            <Link
              to="/create"
              className="text-white font-bold"
              onClick={toggleMenu}
            >
              <button className="rounded-full border border-accent px-4 py-2 text-accent w-full">
                + New Ticket
              </button>
            </Link>
            <div className="flex justify-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
