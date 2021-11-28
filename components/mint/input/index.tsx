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
        const maxTokenPerTx = (
          await masterContract.MAX_TOKEN_PER_TX()
        ).toNumber();
        if (isMounted) setMaxTokenPerTx(maxTokenPerTx);
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
        className="bg-dark w-100 rounded shadow"
        style={{ height: "3rem" }}
      ></div>
    );

  return (
    <input
      name="numberOfTokens"
      type="number"
      min={1}
      max={maxTokenPerTx}
      className="form-control form-control-lg shadow"
      defaultValue={1}
    />
  );
};
