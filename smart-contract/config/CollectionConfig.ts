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
  contractName: 'FryHeadsNft',
  tokenName: 'FryHeads NFT',
  tokenSymbol: 'FRH',
  hiddenMetadataUri: 'ipfs://QmUSeZpsQHVV5gBj5q4rAQ3viDFSakTVXcuc3dq6X9Z8cH/hidden.json',
  maxSupply: 10000,
  whitelistSale: {
    price: 0.0034, // DEV Price
    //price: 3, // PROD Price
    maxMintAmountPerTx: 5,
  },
  preSale: {
    price: 0.0044, // DEV Price
    //price: 4, // PROD Price
    maxMintAmountPerTx: 5,
  },
  publicSale: {
    price: 0.0054, // DEV Price
    //price: 5, // PROD Price
    maxMintAmountPerTx: 10,
  },
  contractAddress: "0x050F0E5C96ED83dd11989461517BB9F86CA06a79",
  marketplaceIdentifier: 'fryheads-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
