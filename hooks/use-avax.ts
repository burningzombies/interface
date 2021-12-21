import useSWR from "swr";

export const useAvax = (): {
  loading: boolean;
  price: { "avalanche-2": { usd: number } };
  error: Error;
  mutate: any; // eslint-disable-line
} => {
  const { data, mutate, error } = useSWR(
    "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    (url) => fetch(url).then((r) => r.json())
  );

  return {
    loading: !data && !error,
    price: data,
    error,
    mutate
  };
};
