import { ConnectButton } from "@xellar/kit";
import { NavLink, useNavigate } from "react-router-dom";
import { ConnectedButton } from "./ConnectedButton";
import { Address } from "viem";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Pastikan kamu sudah install lucide-react

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <h1
          className="text-2xl md:text-3xl font-bold text-orange-600 cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          KaryaTip
        </h1>
        <div className="flex items-center space-x-3">
          <ConnectButton.Custom>
            {({ openConnectModal, account, isConnected, openProfileModal }) => {
              if (!isConnected) {
                return (
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                    onClick={openConnectModal}
                  >
                    Connect
                  </button>
                );
              }
              return (
                <ConnectedButton
                  address={account?.address as Address}
                  onClick={openProfileModal}
                />
              );
            }}
          </ConnectButton.Custom>
          <button
            className="md:hidden text-orange-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation menu (responsive) */}
      <nav
        className={`bg-orange-100 border-t border-orange-300 md:block ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8 py-3">
          {(["writers", "writing", "tipWriters"] as const).map((tab) => (
            <li key={tab}>
              <NavLink
                to={`/${tab}`}
                className={({ isActive }) =>
                  `text-base md:text-lg font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "hover:text-orange-600 text-gray-500"
                  }`
                }
                onClick={() => setMenuOpen(false)} // close on mobile
              >
                {tab === "writers" && "Discover Writers"}
                {tab === "writing" && "Write Story"}
                {tab === "tipWriters" && "Tip Writer"}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
