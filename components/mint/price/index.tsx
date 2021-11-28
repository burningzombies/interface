import React from "react";
import Image from "next/image";
import avax from "../../../assets/avax-logo.svg";
import { parsePrice } from "../../../utils";
import { Spinner } from "../../../components/spinner";
import { Contract, BigNumber } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const TokenPrice: React.FC<Props> = ({ masterContract }) => {
  const [tokenPrice, setTokenPrice] = React.useState<BigNumber | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const price = await masterContract.currentTokenPrice();
        if (isMounted) setTokenPrice(price);
      } catch {
        setTokenPrice(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  return (
    <div title="Token Price" className="d-inline-flex">
      <i className="fas fa-coins me-2 mt-1"></i>
      <Image src={avax} width={25} height={25} alt="$AVAX" />
      <span className="ms-2">
        {(() => {
          if (!tokenPrice) {
            return <Spinner color="text-light" />;
          }
          return parsePrice(tokenPrice);
        })()}
      </span>
    </div>
  );
};
