import React from "react";
import { ConnectButton } from "@xellar/kit";
import Web3Connect from "../config/Web3Connect";
import { NavLink, useNavigate } from "react-router-dom";

type HeaderProps = {
  activeTab: "writers" | "writing" | "tipWriters";
  setActiveTab: (tab: "writers" | "writing" | "tipWriters") => void;
};

function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1
          className="text-3xl font-bold text-orange-600 cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          KaryaTip
        </h1>
        <div className="flex items-center space-x-4">
          <ConnectButton />
          {/* <Web3Connect /> */}
        </div>
      </div>
      <nav className="bg-orange-100 border-t border-orange-300">
        <ul className="flex justify-center space-x-8 py-3">
          {(["writers", "writing", "tipWriters"] as const).map((tab) => (
            <li key={tab}>
              <NavLink
                to={`/${tab}`} // Update the path based on your route setup
                className={({ isActive }) =>
                  `text-lg font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "hover:text-orange-600 text-gray-400"
                  }`
                }
              >
                {tab === "writers" && "Discover Writers"}
                {tab === "writing" && "Write Story"}
                {tab === "tipWriters" && "Tip & Claim"}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
