import React from "react";
import Image from "next/image";
import avax from "../../../assets/avax-logo.svg";
import { parsePrice } from "../../../utils";
import { Spinner } from "../../../components/spinner";
import { Contract, BigNumber } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const Rewards: React.FC<Props> = ({ masterContract }) => {
  const [totalDividend, setTotalDividend] = React.useState<
    BigNumber | undefined
  >();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const totalDividend = await masterContract.totalDividend();
        if (isMounted) setTotalDividend(totalDividend);
      } catch {
        setTotalDividend(undefined);
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
    <div title="Rewards Per Token" className="d-inline-flex">
      <i className="fas fa-award me-2 mt-1"></i>
      <Image src={avax} width={25} height={25} alt="$AVAX" />
      <span className="ms-2">
        {(() => {
          if (!totalDividend) {
            return <Spinner color="text-light" />;
          }
          return parsePrice(totalDividend, 3);
        })()}
      </span>
    </div>
  );
};
