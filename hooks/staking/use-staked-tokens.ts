import { useWeb3 } from "../use-web3";
import useSWR from "swr";
import { request } from "graphql-request";

interface Data {
  stake: {
    tokens: Array<{ id: number; title: string }>;
  };
}

type UseStakedTokens = {
  loading: boolean;
  tokens?: Data["stake"]["tokens"];
  error?: Error;
  mutate: any; // eslint-disable-line
};
export const useStakedTokens = (url: string): UseStakedTokens => {
  const { address } = useWeb3();

  const query = `{
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
    tokens: data?.stake?.tokens,
    error,
    mutate,
  };
};
