import { ConnectButton } from "@xellar/kit";
import React from "react";

function CustomWallet() {
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, disconnect }) => {
        return (
          <div className="flex flex-col items-center gap-4">
            {!account ? (
              <button
                onClick={openConnectModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600">
                  Connected Wallet: {account.address.slice(0, 6)}...
                  {account.address.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default CustomWallet;
