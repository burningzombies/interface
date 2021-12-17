import useSWR from "swr";
import { fetcher } from "../utils";
import { Zombie } from "../types";

type Data = {
  zombies: Array<Zombie>;
};

const query = () => {
  return `{
    honoraryZombies(first: 5, orderBy: id, orderDirection: asc) {
      id
      name
      imageURI
    }
  }`;
};

export const useHonorary = (): {
  loading: boolean;
  error: Error | undefined;
  isEmpty: boolean;
  data: Data | undefined;
} => {
  const { data, error } = useSWR<Data, Error>(query(), fetcher);

  return {
    loading: !data && !error,
    isEmpty: !data || !(data.zombies.length > 0),
    data,
    error,
  };
};
