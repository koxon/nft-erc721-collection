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
  tokenName: 'Fry Heads NFT',
  tokenSymbol: 'FRH',
  hiddenMetadataUri: 'ipfs://QmUSeZpsQHVV5gBj5q4rAQ3viDFSakTVXcuc3dq6X9Z8cH/hidden.json',
  maxSupply: 10000,
  whitelistSale: {
    price: 0.0040, // DEV Price
    maxMintAmountPerTx: 50,
  },
  preSale: {
    price: 0.0040, // DEV Price
    maxMintAmountPerTx: 50,
  },
  publicSale: {
    price: 0.0040, // DEV Price - ~$5
    maxMintAmountPerTx: 100,
  },
  contractAddress: "0x7e472cC0029AaadE00C3E19aa6C03B2Db69FFc3C",
  marketplaceIdentifier: 'fryheads-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
