import { ethers } from "ethers";
import { ENV_CONSTANTS } from "./env";
import { CollectionConfig } from "./collectionConfig";
import contractAbi from "../abi/fryHeadsNft.json";

export const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ENV_CONSTANTS.alchemyApiKey}`);
export const providerTest = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ENV_CONSTANTS.alchemyApiKey}`);

export const colectionContract = new ethers.Contract(CollectionConfig.contractAddress, contractAbi, provider);
export const colectionContractTest = new ethers.Contract(CollectionConfig.contractAddressTest, contractAbi, providerTest);
