import React from "react";
import { Web3Wrapper } from "../web3-wrapper";
import { useWeb3 } from "../../hooks/use-web3";
import { BurnNext } from "./next";
import { Progress } from "./progress";
import { Input } from "./input";
import { useAlert } from "react-alert";
import { errorHandler } from "../../utils";

export const BurnToken: React.FC = () => {
  const { isReady, provider, address, chainId, masterContract } = useWeb3();
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);

  const burnToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || !masterContract) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const numberOfTokens = formData.get("numberOfTokens") as string;

    try {
      const tx = await masterContract.divideUnclaimedTokensReflection(
        numberOfTokens
      );
      await tx.wait();

      setLoading(false);
      alert.success(<>Burned! You&apos;ll be eligible for burner rewards.</>);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
      setLoading(false);
    }
  };
  return (
    <Web3Wrapper {...{ isReady, provider, address, chainId }}>
      <div>
        <Progress {...{ masterContract }} />
        <form className="row mb-4" onSubmit={burnToken}>
          <div className="col-lg-4">
            <Input {...{ masterContract }} />
          </div>
          <div className="col-lg-8">
            <BurnNext {...{ loading }} />
          </div>
        </form>
      </div>
    </Web3Wrapper>
  );
};
