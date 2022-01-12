import { useWeb3 } from "../use-web3";
import useSWR from "swr";
import { request } from "graphql-request";

interface Data {
  tokens: Array<{ id: number; title: string }>;
  stake: {
    tokens: Array<{ id: number; title: string }>;
  };
}

type UseTokens = {
  loading: boolean;
  ownedTokens?: Data["tokens"];
  stakedTokens?: Data["stake"]["tokens"];
  error?: Error;
  mutate: any; // eslint-disable-line
};

export const useTokens = (url: string): UseTokens => {
  const { address } = useWeb3();

  const query = `{
    tokens( first: 1000, where: { owner: "${
      address ? address.toLowerCase() : ""
    }" }, orderBy: updatedAt, orderDirection: desc ) {
      id
      title
    }
    stake(id:"${address && address.toLowerCase()}") {
      tokens (first: 1000, orderBy: updatedAt, orderDirection: desc) {
        id
        title
      }
    }
  }`;

  const fetcher = (query: string) => request(url, query);
  const { data, error, mutate } = useSWR<Data, Error>(
    address ? query : null,
    fetcher
  );

  return {
    loading: !data && !error,
    ownedTokens: data?.tokens,
    stakedTokens: data?.stake?.tokens,
    error,
    mutate,
  };
};
