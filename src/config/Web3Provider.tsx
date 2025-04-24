import { Config, WagmiProvider } from "wagmi";
import { darkTheme, defaultConfig, XellarKitProvider } from "@xellar/kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { liskSepolia } from "viem/chains";
const config = defaultConfig({
  appName: "idqrx",
  // Required for WalletConnect
  walletConnectProjectId: import.meta.env.WALLET_CONNECT_PROJECT_ID,

  // Required for Xellar Passport
  xellarAppId: import.meta.env.XELLAR_APP_ID,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
}) as Config;
const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
