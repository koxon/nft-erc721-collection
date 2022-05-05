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
    price: 0.025,
    maxMintAmountPerTx: 5,
  },
  preSale: {
    price: 0.030,
    maxMintAmountPerTx: 5,
  },
  publicSale: {
    price: 0.035,
    maxMintAmountPerTx: 10,
  },
  contractAddress: "0xd7b7C266964675EBab80F8F5DbD94F7bcF7EC2eF",
  marketplaceIdentifier: 'fry-heads-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
