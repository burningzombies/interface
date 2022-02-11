import React from "react";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const Input: React.FC<Props> = ({ masterContract }) => {
  const [maxTokenPerTx, setMaxTokenPerTx] = React.useState<
    number | undefined
  >();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        if (isMounted) setMaxTokenPerTx(50);
      } catch {
        setMaxTokenPerTx(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  if (!maxTokenPerTx)
    return (
      <div
        className="mb-2 bg-dark w-100 rounded shadow"
        style={{ height: "2.3rem" }}
      ></div>
    );

  return (
    <div className="mb-2 input-group" title="Number of the tokens to burn">
      <span className="input-group-text bg-dark text-light border-dark">
        <i className="fas fa-biohazard"></i>
      </span>
      <input
        name="numberOfTokens"
        type="number"
        min={1}
        max={maxTokenPerTx}
        className="form-control shadow"
        defaultValue={1}
      />
    </div>
  );
};
