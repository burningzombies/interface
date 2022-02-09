import React from "react";
import { MintCountdown } from "./countdown";
import { TokenPrice } from "./price";
import { Rewards } from "./rewards";
import { Reflection } from "./reflection";
import { ProgressBar } from "./progress";
import { Info } from "./info";
import { TotalSupply } from "./total-supply";
import { MintButton } from "./button";
import { useWeb3 } from "../../hooks/use-web3";
import { useRouter } from "next/router";
import { Spinner } from "../spinner";
import { useAlert } from "react-alert";
import { sleep } from "../../utils";
import { Web3Wrapper } from "../web3-wrapper";
import { errorHandler } from "../../utils";

export const Mint: React.FC = () => {
  const router = useRouter();
  const alert = useAlert();

  const { isReady, masterContract, address, provider, chainId } = useWeb3();

  const [loading, setLoading] = React.useState<boolean>(false);

  const mintToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address || loading || !masterContract || !isReady) return;
    setLoading(true);

    try {
      const tx = await masterContract.mint({
        value: await masterContract.currentTokenPrice(),
      });
      await tx.wait();

      alert.success(
        <>
          Token successfully minted. Redirecting <Spinner color="text-light" />
        </>
      );
      await sleep(3000);
      router.replace(`/congrats?minter=${address.toLowerCase()}&tokens=1`);
      return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
      setLoading(false);
    }
  };

  const renderTitle = () => {
    return (
      <div>
        <div className="d-sm-block d-xs-block d-md-none d-lg-none">
          <h2 className="hero-text fw-bold">
            Mint{" "}
            <i
              className="ms-1 fas fa-exclamation"
              style={{ transform: "rotate(15deg)" }}
            ></i>
          </h2>
        </div>
        <div className="d-none d-lg-block d-md-block">
          <h2 className="hero-text fw-bold">
            Mint a Zombie{" "}
            <i
              className="ms-1 fas fa-exclamation"
              style={{ transform: "rotate(15deg)" }}
            ></i>
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderTitle()}
      <Web3Wrapper {...{ isReady, provider, address, chainId }}>
        <div className="text-light">
          <ul className="list-inline mt-3 mb-2">
            <li className="list-inline-item me-3">
              <MintCountdown />
            </li>
          </ul>
          <ul className="list-inline">
            <li className="list-inline-item me-3">
              <TokenPrice {...{ masterContract }} />
            </li>
            <li className="list-inline-item me-3">
              <Rewards {...{ masterContract }} />
            </li>
            <li className="list-inline-item me-3">
              <Reflection {...{ masterContract }} />
            </li>
            <li className="list-inline-item me-3">
              <TotalSupply {...{ masterContract }} />
            </li>
          </ul>

          <form className="row" onSubmit={mintToken}>
            <div className="col-lg-8 col-md-8 col-sm-12 mt-2">
              <ProgressBar {...{ masterContract }} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
              <MintButton {...{ masterContract, loading }} />
            </div>
            <div className="mt-3">
              <Info {...{ masterContract, address }} />
            </div>
          </form>
        </div>
      </Web3Wrapper>
    </div>
  );
};
