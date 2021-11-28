import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";
import { Balance } from "../../../components/balance";

type Props = {
  masterContract: Contract | undefined | null;
  address: string | undefined | null;
};
export const Info: React.FC<Props> = ({ address, masterContract }) => {
  const [maxTokenPerTx, setMaxTokenPerTx] = React.useState<
    number | undefined
  >();
  const [maxTokenPerWallet, setMaxTokenPerWallet] = React.useState<
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
        const maxTokenPerWallet = (
          await masterContract.MAX_TOKEN_PER_WALLET()
        ).toNumber();

        if (isMounted) {
          setMaxTokenPerTx(maxTokenPerTx);
          setMaxTokenPerWallet(maxTokenPerWallet);
        }
      } catch {
        setMaxTokenPerTx(undefined);
        setMaxTokenPerWallet(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  return (
    <>
      <small className="d-block">
        * Maximum{" "}
        <strong>
          {maxTokenPerTx ? maxTokenPerTx : <Spinner color="text-light" />}
        </strong>{" "}
        zombies can mint, once.
      </small>
      <small className="d-block">
        ** Maximum{" "}
        <strong>
          {maxTokenPerWallet ? (
            <>
              <Balance {...{ masterContract, owner: address }} />/
              {maxTokenPerWallet}
            </>
          ) : (
            <Spinner color="text-light" />
          )}
        </strong>{" "}
        zombies can collect per wallet.
      </small>
    </>
  );
};
