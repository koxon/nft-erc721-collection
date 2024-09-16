import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import Dapp from "./components/Dapp";
import { wagmiConfig } from "./config/wallet";
import "@rainbow-me/rainbowkit/styles.css";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "Fry Heads NFT",
            learnMoreUrl: "https://fryheads.com/",
          }}
          theme={darkTheme({
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <BrowserRouter>
            <Dapp />
          </BrowserRouter>
        </RainbowKitProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
