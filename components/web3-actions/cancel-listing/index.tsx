import React from "react";
import { Contract } from "ethers";
import { Spinner } from "../../spinner";
import { errorHandler } from "../../../utils";
import { useAlert } from "react-alert";

type Props = {
  size: string;
  tokenId: string;
  marketContract: Contract | undefined | null;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const CancelListing: React.FC<Props> = ({
  tokenId,
  size,
  marketContract,
  mutate,
}) => {
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);

  const cancelListing = async () => {
    if (loading || !marketContract) return;
    setLoading(true);

    try {
      const tx = await marketContract.cancelListing(tokenId);
      await tx.wait();

      alert.success(<>The listing is successfully cancelled.</>);

      mutate();
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      alert.error(<>{errorHandler(err)}</>);
    }
  };

  return (
    <>
      <button onClick={cancelListing} className={`btn btn-secondary ${size}`}>
        {loading ? <Spinner color="text-light" /> : <>Cancel</>}
      </button>
    </>
  );
};
