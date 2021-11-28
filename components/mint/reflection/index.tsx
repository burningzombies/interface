import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const Reflection: React.FC<Props> = ({ masterContract }) => {
  const [reflection, setReflection] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const reflection = (
          await masterContract.calculateReflectionShare()
        ).toNumber();

        if (isMounted) setReflection(reflection);
      } catch {
        setReflection(undefined);
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
    <div className="d-inline" title="Current Reflection Share">
      <i className="fas fa-piggy-bank me-2"></i>
      {(() => {
        if (typeof reflection === "undefined") {
          return <Spinner color="text-light" />;
        }
        return <>{reflection}%</>;
      })()}
    </div>
  );
};
