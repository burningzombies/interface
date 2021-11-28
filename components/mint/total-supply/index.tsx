import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const TotalSupply: React.FC<Props> = ({ masterContract }) => {
  const [totalSupply, setTotalSupply] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const totalSupply = (await masterContract.totalSupply()).toNumber();

        if (isMounted) setTotalSupply(totalSupply);
      } catch {
        setTotalSupply(undefined);
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
    <div className="d-inline" title="Total Supply">
      <i className="fas fa-biohazard me-2"></i>
      {(() => {
        if (typeof totalSupply === "undefined") {
          return <Spinner color="text-light" />;
        }
        return <>{totalSupply}</>;
      })()}
    </div>
  );
};
