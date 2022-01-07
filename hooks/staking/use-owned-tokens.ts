import { useWeb3 } from "../use-web3";
import useSWR from "swr";
import { request } from "graphql-request";

interface Data {
  tokens: Array<{ id: number; title: string }>;
}

type UseOwnedTokens = {
  loading: boolean;
  tokens?: Data["tokens"];
  error?: Error;
  mutate: any; // eslint-disable-line
};

export const useOwnedTokens = (url: string): UseOwnedTokens => {
  const { address } = useWeb3();

  const query = `{
    tokens( first: 120, where: { owner: "${
      address ? address.toLowerCase() : ""
    }" }, orderBy: updatedAt, orderDirection: desc ) {
      id
      title
    }
  }`;

  const fetcher = (query: string) => request(url, query);
  const { data, error, mutate } = useSWR<Data, Error>(
    address ? query : null,
    fetcher
  );

  return {
    loading: !data && !error,
    tokens: data?.tokens,
    error,
    mutate,
  };
};
