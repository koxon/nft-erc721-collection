import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  // Fry Heads NFT,FRH,400000,10000,100,ipfs://QmbAqyta5jQyZdZLxMme5PCLCca4qK5nQyBuesJ9Ydcvqy/hidden.json
  contractName: 'FryHeadsNft',
  tokenName: 'Fry Heads NFT',
  tokenSymbol: 'FRH',
  hiddenMetadataUri:
    'ipfs://QmQRsoxahgqDS99mFQpCRDSPwMg3NAoPddmTJ1WfY9MPc1/hidden.json',
  maxSupply: 10000,
  whitelistSale: {
    price: 0.0045, // DEV Price
    maxMintAmountPerTx: 50,
  },
  preSale: {
    price: 0.0045, // DEV Price
    maxMintAmountPerTx: 50,
  },
  publicSale: {
    price: 0.0045, // DEV Price - ~$5
    maxMintAmountPerTx: 100,
  },
  // contractAddress: '0xAA094947Cdc87788Bd6eC3cb75B2B13d275C9391', // DEV Address Sepolia - Testnet // it is also necessary to update and in /minting-dapp/src/config/collectionConfig.ts
  contractAddress: '0xAF5C905F70378e984346D49833f0EE244f1D3DE1', // it is also necessary to update and in /minting-dapp/src/config/collectionConfig.ts
  marketplaceIdentifier: 'fryheads-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
