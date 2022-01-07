import type { NextPage, GetServerSideProps } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { Layout } from "../../../components/layout";
import { PageTitle } from "../../../components/page-title";
import Head from "next/head";
import { APP } from "../../../utils/consts";
import { StakingInfo } from "../../../components/staking-info";
import { Web3Wrapper } from "../../../components/web3-wrapper";
import { Spinner } from "../../../components/spinner";
import { MultipleSelectForm } from "../../../components/multiple-select-form";
import { useWeb3 } from "../../../hooks/use-web3";
import { useStake } from "../../../hooks/staking/use-stake";
import { useOwnedTokens } from "../../../hooks/staking/use-owned-tokens";
import { useStakedTokens } from "../../../hooks/staking/use-staked-tokens";
import { useAlert } from "react-alert";
import { sleep, errorHandler } from "../../../utils";
import { ethers } from "ethers";
import ErrorPage from "../../404";

const Main: NextPage<{ isAvailable: boolean; pair: string }> = ({
  isAvailable,
  pair,
}) => {
  const alert = useAlert();
  const stakeContract = useStake(pair);

  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  const { signer, isReady, provider, address, chainId } = useWeb3();

  const owned = useOwnedTokens(isAvailable ? APP.STAKING[pair].SUBGRAPH : "");
  const staked = useStakedTokens(isAvailable ? APP.STAKING[pair].SUBGRAPH : "");

  const staking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { contract } = stakeContract;

    if (!signer || !contract || stakeLoading || unstakeLoading) {
      alert.info(<>Please wait.</>);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const tokenIds = formData.getAll("tokenIds") as Array<FormDataEntryValue>;

    const common = async (
      tokenIds: Array<FormDataEntryValue>,
      func: number,
      setLoading: Dispatch<SetStateAction<boolean>>
    ) => {
      try {
        const masterABI = await fetch(
          `${APP.IPFS_GATEWAY}/ipfs/${APP.MASTER_CONTRACT_CID}`
        );

        const masterContract = new ethers.Contract(
          APP.STAKING[pair].MASTER,
          await masterABI.json(),
          signer
        );

        const isApproved = await masterContract.isApprovedForAll(
          address,
          contract.address
        );

        if (!isApproved) {
          const approval = await masterContract.setApprovalForAll(
            contract.address,
            true
          );
          await approval.wait();
        }

        for (let i = 0; Math.ceil(tokenIds.length / 24) > i; i++) {
          const batch = tokenIds.slice(i * 24, i * 24 + 24);
          const stake =
            func === 0
              ? await contract.stake(batch)
              : await contract.withdraw(batch);
          await stake.wait();
        }

        await sleep(5000);
        await Promise.all([owned.mutate(), staked.mutate()]);

        await new Promise(() => {
          setLoading(false);
          alert.success(<>{func === 0 ? "Staked." : "Withdrawn."}</>);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        alert.error(<>{errorHandler(err)}</>);
      }

      setLoading(false);
    };

    switch (e.currentTarget.name) {
      case "formStake": {
        setStakeLoading(true);
        await common(tokenIds, 0, setStakeLoading);
        break;
      }
      case "formUnstake": {
        setUnstakeLoading(true);
        await common(tokenIds, 1, setUnstakeLoading);
        break;
      }
      default: {
        break;
      }
    }

    return;
  };

  if (isAvailable === false) return <ErrorPage />;

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Stake</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Stake" desc={`Stake ${pair} to earn BURN.`} />
      </div>

      <section className="inner-shadow zombie-bg py-5">
        <Web3Wrapper {...{ isReady, provider, address, chainId }}>
          <div className="container">
            <div className="text-center col-lg-12 col-md-12 col-sm-12">
              <StakingInfo {...stakeContract} />
            </div>

            <div className="row mt-5">
              <div className="col-lg-6 col-md-6 col-sm-12">
                {(() => {
                  if (owned.loading)
                    return (
                      <div className="text-center mt-5">
                        <Spinner color="text-light" />
                      </div>
                    );

                  if (owned.error)
                    return (
                      <div className="text-center mt-5 text-light">
                        Something went wrong.
                      </div>
                    );

                  return (
                    <MultipleSelectForm
                      name="formStake"
                      controlId="tokenIds"
                      label={
                        <>
                          <i className="fas fa-lock-open me-2"></i>Owned Tokens
                        </>
                      }
                      options={owned.tokens ? owned.tokens : []}
                      onSubmit={staking}
                      buttonVal="Stake"
                      loading={stakeLoading}
                    />
                  );
                })()}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                {(() => {
                  if (staked.loading)
                    return (
                      <div className="text-center mt-5">
                        <Spinner color="text-light" />
                      </div>
                    );

                  if (staked.error)
                    return (
                      <div className="text-center mt-5 text-light">
                        Something went wrong.
                      </div>
                    );

                  return (
                    <MultipleSelectForm
                      name="formUnstake"
                      controlId="tokenIds"
                      label={
                        <>
                          <i className="fas fa-lock me-2"></i>Staked Tokens
                        </>
                      }
                      options={staked.tokens ? staked.tokens : []}
                      onSubmit={staking}
                      buttonVal="Unstake"
                      loading={unstakeLoading}
                    />
                  );
                })()}
              </div>
            </div>
            <div className="mt-3">
              <span className="fst-italic text-light small">
                * Due to third-party apps&apos; rules, the lists show the first
                120 tokens for the owned and 1000 for the staked tokens list.
                The rest of them will be visible after staked and withdrawn.{" "}
              </span>
            </div>
          </div>
        </Web3Wrapper>
      </section>
    </Layout>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pair = params ? (params.pair as string) : "";

  if (!Object.prototype.hasOwnProperty.call(APP.STAKING, pair))
    return {
      props: {
        isAvailable: false,
        pair: pair,
      },
    };

  return {
    props: {
      isAvailable: true,
      pair,
    },
  };
};
