import useSWR from "swr";
import { APP } from "../utils/consts";

export const useProvenance = (): {
  loading: boolean;
  provenance: { final: string; hash: string };
  error: Error;
} => {
  const { data, error } = useSWR(APP.PROVENANCE_CID, (cid) =>
    fetch(`${APP.IPFS_GATEWAY}/ipfs/${cid}`).then((r) => r.json())
  );

  return {
    loading: !data && !error,
    provenance: data,
    error,
  };
};
