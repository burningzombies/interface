import useSWR from "swr";
import { fetcher } from "../utils";
import { Zombie } from "../types";

type Data = {
  honoraryZombies: Array<Zombie>;
};

const query = () => {
  return `{
    honoraryZombies(orderBy: id, orderDirection: asc) {
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
    isEmpty: !data || !(data.honoraryZombies.length > 0),
    data,
    error,
  };
};
