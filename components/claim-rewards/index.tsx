import React from "react";
import Image from "next/image";
import { BigNumber, Contract } from "ethers";
import avax from "../../assets/avax-logo.svg";
import { errorHandler, parsePrice } from "../../utils";
import { useAlert } from "react-alert";
import { Spinner } from "../spinner";

type Props = {
  contract?: Contract | null;
};

export const ClaimRewards: React.FC<Props> = ({ contract }) => {
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [rewards, setRewards] = React.useState<BigNumber | undefined>();

  const claimRewards = async () => {
    if (loading || !contract) return;
    setLoading(true);

    try {
      const tx = await contract.claimRewards();
      await tx.wait();

      alert.success(<>Rewards successfully claimed.</>);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!contract) return;
      try {
        const rewards = await contract.getReflectionBalances();
        if (isMounted) setRewards(rewards);
      } catch {
        isMounted = false;
        setRewards(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [contract, loading]);

  return (
    <button onClick={claimRewards} className="btn btn-warning d-inline-flex">
      {(() => {
        return (
          <>
            <Image src={avax} width={25} height={25} alt="$AVAX" />{" "}
            {loading || typeof rewards === "undefined" ? (
              <span className="ms-2">
                <Spinner />
              </span>
            ) : (
              <span className="ms-2">{parsePrice(rewards, 3)}</span>
            )}
          </>
        );
      })()}
    </button>
  );
};
