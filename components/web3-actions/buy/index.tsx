import React from "react";
import { Contract } from "ethers";
import { Spinner } from "../../spinner";
import { toTitleCase } from "../../../utils";
import { useAlert } from "react-alert";
import { BigNumber } from "ethers";

type Props = {
  disabled?: boolean;
  size: string;
  tokenId: string;
  price: BigNumber;
  marketContract: Contract | undefined | null;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const Buy: React.FC<Props> = ({
  tokenId,
  size,
  price,
  marketContract,
  disabled = false,
  mutate,
}) => {
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);

  const buy = async () => {
    if (loading || !marketContract) return;
    setLoading(true);

    try {
      const tx = await marketContract.buy(tokenId, {
        value: price,
      });
      await tx.wait();

      alert.success(<>The transfer successfully completed.</>);

      mutate();
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      alert.error(
        <>{toTitleCase(err.data ? err.data.message : err.message)}</>
      );
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={buy}
      className={`btn btn-warning ${size}`}
    >
      {loading ? <Spinner color="text-dark" /> : <>Buy</>}
    </button>
  );
};
