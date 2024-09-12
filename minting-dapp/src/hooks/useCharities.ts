import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { colectionContract, colectionContractTest } from "../config/constants";

async function getCharitiesCount(isTestnet: boolean) {
  const chairities = await (isTestnet ? colectionContractTest : colectionContract).getCharitiesCount().toNumber();
  return (Array.from({ length: chairities }, (_, i) => i) as number[]) || [];
}

async function getContractDetails(charityId: number, isTestnet: boolean) {
  return await (isTestnet ? colectionContractTest : colectionContract).charities(charityId);
}

export function useCharities({ isTestnet }: { isTestnet: boolean }) {
  const { data: charitiesCount = [] } = useQuery({
    queryKey: ["charitiesCount", isTestnet],
    queryFn: async () => await getCharitiesCount(isTestnet),
  });

  const charities = useQueries({
    queries: charitiesCount.map((j) => ({
      queryKey: [j, isTestnet],
      queryFn: () => getContractDetails(j, isTestnet),
    })),
  });

  return useMemo(() => {
    return {
      charities: charities.map((j) => j?.data),
      isLoading: charities.some((j) => j.isLoading),
      isSuccess: charities.every((j) => j.isSuccess && j.data),
      isError: charities.some((j) => j.isError),
    };
  }, [charities]);
}
