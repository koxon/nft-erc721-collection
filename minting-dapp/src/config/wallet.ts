import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

import {
  magicEdenWallet,
  trustWallet,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  ledgerWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { ENV_CONSTANTS } from "./env";

export const wagmiConfig = getDefaultConfig({
  appName: "Fry Heads NFT",
  projectId: ENV_CONSTANTS.walletConnectProjectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${ENV_CONSTANTS.alchemyApiKey}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ENV_CONSTANTS.alchemyApiKey}`),
  },
  wallets: [
    {
      groupName: "More Wallets",
      wallets: [walletConnectWallet, magicEdenWallet, trustWallet, metaMaskWallet, coinbaseWallet, rainbowWallet, ledgerWallet],
    },
  ],
});
