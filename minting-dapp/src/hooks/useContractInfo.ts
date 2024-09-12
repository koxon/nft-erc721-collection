import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { colectionContract, colectionContractTest } from "../config/constants";
import { BigNumber } from "ethers";

const contractDetails = ["maxSupply", "totalSupply", "maxMintAmountPerTx", "cost", "paused", "whitelistMintEnabled"];

type ContractDetailsOutput = {
  maxSupply: number;
  totalSupply: number;
  maxMintAmountPerTx: number;
  tokenPrice: BigNumber;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

async function getContractDetails(detail: string, isTestnet: boolean) {
  return await (isTestnet ? colectionContractTest : colectionContract)[detail]();
}

export function useContractDetails({ isTestnet }: { isTestnet: boolean }): ContractDetailsOutput {
  const details = useQueries({
    queries: contractDetails.map((detail) => ({
      queryKey: [detail, isTestnet],
      queryFn: () => getContractDetails(detail, isTestnet),
    })),
  });

  return useMemo(() => {
    const [maxSupply, totalSupply, maxMintAmountPerTx, cost, paused, whitelistMintEnabled] = details;

    return {
      maxSupply: maxSupply.data?.toNumber(),
      totalSupply: totalSupply.data?.toNumber(),
      maxMintAmountPerTx: maxMintAmountPerTx.data?.toNumber(),
      tokenPrice: cost.data || BigNumber.from(0),
      isPaused: paused.data,
      isWhitelistMintEnabled: whitelistMintEnabled.data,

      isLoading: details.some((detail) => detail.isLoading),
      isSuccess: details.every((detail) => detail.isSuccess && detail.data),
      isError: details.some((detail) => detail.isError),
      refetch: () => details.forEach((detail) => detail.refetch()),
    };
  }, [details]);
}
