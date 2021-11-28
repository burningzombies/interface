import React from "react";
import { Spinner } from "../spinner";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
  owner: string | undefined | null;
};

export const Balance: React.FC<Props> = ({ masterContract, owner }) => {
  const [balance, setBalance] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract || !owner) return;
      try {
        const balance = (await masterContract.balanceOf(owner)).toNumber();

        if (isMounted) setBalance(balance);
      } catch {
        setBalance(undefined);
      }
    };
    init();
    const iID = setInterval(() => init(), 1000);
    return () => {
      isMounted = false;
      clearInterval(iID);
    };
  }, [masterContract, owner]);

  if (typeof balance === "undefined") {
    return <Spinner color="text-light" />;
  }
  return <>{balance}</>;
};
