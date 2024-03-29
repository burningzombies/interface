import React from "react";
import { Spinner } from "../../spinner";
import { ethers } from "ethers";

type Props = {
  loading: boolean;
  masterContract: ethers.Contract | undefined | null;
};

export const MintButton: React.FC<Props> = ({ loading, masterContract }) => {
  const [isSaleActive, setIsSaleActive] = React.useState<boolean | undefined>();
  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const stat = await masterContract.status();
        const isSaleActive = stat == 1 ? true : false;

        if (isMounted) setIsSaleActive(isSaleActive);
      } catch {
        setIsSaleActive(undefined);
      }
    };
    init();
    const iID = setInterval(() => init(), 1000);
    return () => {
      isMounted = false;
      clearInterval(iID);
    };
  }, [masterContract]);
  return (
    <button
      role="submit"
      className={`${
        !isSaleActive && "disabled"
      } btn shadow btn-lg btn-danger w-100`}
    >
      {loading || !masterContract ? (
        <Spinner color="text-light" />
      ) : isSaleActive ? (
        <>Mint</>
      ) : (
        <>Not Mintable!</>
      )}
    </button>
  );
};
