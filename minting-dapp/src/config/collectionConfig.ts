import { whitelistAddresses } from "./whitelist";

export interface NetworkConfigInterface {
  chainId: number;
  symbol: string;
  blockExplorer: {
    name: string;
    generateContractUrl: (contractAddress: string) => string;
  };
}

export interface MarketplaceConfigInterface {
  name: string;
  generateCollectionUrl: (marketplaceIdentifier: any, isMainnet: boolean) => string;
}

export const openSea: MarketplaceConfigInterface = {
  name: "OpenSea",
  generateCollectionUrl: (marketplaceIdentifier: string, isMainnet: boolean) =>
    "https://" + (isMainnet ? "www" : "testnets") + ".opensea.io/collection/" + marketplaceIdentifier,
};

export const sepolia: NetworkConfigInterface = {
  chainId: 11155111,
  symbol: "Sepolia",
  blockExplorer: {
    name: "Etherscan (Sepolia)",
    generateContractUrl: (contractAddress: string) => `https://sepolia.etherscan.io/address/${contractAddress}`,
  },
};

export const mainnet: NetworkConfigInterface = {
  chainId: 1,
  symbol: "ETH",
  blockExplorer: {
    name: "Etherscan",
    generateContractUrl: (contractAddress: string) => `https://etherscan.io/address/${contractAddress}`,
  },
};

export default interface CollectionConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;
  contractAddress: string;
  contractAddressTest: string;
  marketplaceIdentifier: string;
  marketplaceConfig: MarketplaceConfigInterface;
  whitelistAddresses: string[];
}

export const CollectionConfig: CollectionConfigInterface = {
  testnet: sepolia,
  mainnet: mainnet,
  contractAddressTest: "0xAA094947Cdc87788Bd6eC3cb75B2B13d275C9391", // DEV Address Sepolia - Testnet
  contractAddress: "0xAF5C905F70378e984346D49833f0EE244f1D3DE1",
  marketplaceIdentifier: "fryheads-token",
  marketplaceConfig: openSea,
  whitelistAddresses: whitelistAddresses,
};
