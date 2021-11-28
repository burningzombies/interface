import React from "react";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const ProgressBar: React.FC<Props> = ({ masterContract }) => {
  const [fraction, setFraction] = React.useState<number>(0);

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const total = await masterContract.totalSupply();
        const max = await masterContract.MAX_SUPPLY();

        if (isMounted)
          setFraction(parseFloat(((total / max) * 100).toFixed(0)));
      } catch {
        setFraction(0);
      }
    };
    init();
    const interval = setInterval(() => init(), 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [masterContract]);

  return (
    <div
      title={`${fraction}% Minted`}
      className="progress bg-dark shadow"
      style={{ height: "3rem" }}
    >
      <div
        className="progress-bar bg-warning text-dark fw-bold"
        role="progressbar"
        style={{
          width: `${fraction}%`,
        }}
        aria-valuenow={fraction}
        aria-valuemin={0}
        aria-valuemax={100}
      >{`${fraction}%`}</div>
    </div>
  );
};
