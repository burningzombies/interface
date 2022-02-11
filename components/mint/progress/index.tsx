import React from "react";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const ProgressBar: React.FC<Props> = ({ masterContract }) => {
  const [fraction, setFraction] = React.useState<number>(0);
  const [isSaleActive, setIsSaleActive] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const total = await masterContract.totalSupply();
        const max = 3024;
        const stat = await masterContract.status();
        const isSaleActive = stat == 1 ? true : false;

        if (isMounted) setIsSaleActive(isSaleActive);

        if (isMounted)
          setFraction(parseFloat(((total / max) * 100).toFixed(1)));
      } catch (err) {
        console.log(err);
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
      >
        {isSaleActive === true ? (
          `${fraction}%`
        ) : (
          <i className="fas fa-check-circle"></i>
        )}
      </div>
      {typeof isSaleActive !== "undefined" && !isSaleActive && (
        <div
          className="progress-bar bg-danger text-light fw-bold"
          role="progressbar"
          style={{
            width: `${100 - fraction}%`,
          }}
          aria-valuenow={100 - fraction}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <i className="fas fa-fire"></i>
        </div>
      )}
    </div>
  );
};
