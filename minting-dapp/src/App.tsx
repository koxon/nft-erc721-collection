import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wallet";
import "@rainbow-me/rainbowkit/styles.css";
import Router from "./routes";

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
          <ToastContainer className="fix-width-toast" newestOnTop={true} />
          <Router />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
