import type { NextPage, GetServerSideProps } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useTokens } from "../../../hooks/staking/use-tokens";
import { useAlert } from "react-alert";
import { sleep, errorHandler } from "../../../utils";
import { ethers } from "ethers";
import ErrorPage from "../../404";

const Main: NextPage<{ isAvailable: boolean; stakeId: number }> = ({
  isAvailable,
  stakeId,
}) => {
  const alert = useAlert();
  const stakeContract = useStake(stakeId);

  const [lastId, setLastId] = useState<number | undefined>();
  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  const { signer, isReady, provider, address, chainId } = useWeb3();

  const tokens = useTokens(isAvailable ? APP.STAKING[stakeId].SUBGRAPH : "");

  useEffect(() => {
    const init = async () => {
      await sleep(1000);
      setLastId(stakeId);
    };
    init();
  });

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
      const isRequireSingleApproval = () => {
        if (func !== 0) return false;

        const req = ["AVAXAPE"];
        const res = false;

        for (let x = 0; req.length > x; x++) {
          if (APP.STAKING[stakeId].STAKING_SYMBOL === req[x]) return true;
        }

        return res;
      };

      try {
        const masterABI = await fetch(
          `${APP.IPFS_GATEWAY}/ipfs/${APP.MASTER_CONTRACT_CID}`
        );

        const masterContract = new ethers.Contract(
          APP.STAKING[stakeId].MASTER,
          await masterABI.json(),
          signer
        );

        if (isRequireSingleApproval()) {
          for (let i = 0; tokenIds.length > i; i++) {
            const approval = await masterContract.getApproved(tokenIds[i]);

            if (approval.toLowerCase() !== contract.address.toLowerCase()) {
              const approve = await masterContract.approve(
                contract.address,
                tokenIds[i]
              );
              await approve.wait();
            }
            const stake = await contract.stake([tokenIds[i]]);
            await stake.wait();
            alert.info(<>Waiting confirmation for the next token.</>);
          }
        } else {
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
            alert.info(<>Waiting confirmation for the next 24 tokens.</>);
          }
        }

        await sleep(5000);
        await tokens.mutate();

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
        <PageTitle
          title="Stake"
          desc={`Stake ${APP.STAKING[stakeId].STAKING_SYMBOL} to earn ${APP.STAKING[stakeId].REWARDS_SYMBOL}.`}
        />
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
                  if (tokens.loading || typeof lastId === "undefined")
                    return (
                      <div className="text-center mt-5">
                        <Spinner color="text-light" />
                      </div>
                    );

                  if (tokens.error)
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
                      options={tokens.ownedTokens ? tokens.ownedTokens : []}
                      onSubmit={staking}
                      buttonVal="Stake"
                      loading={stakeLoading}
                    />
                  );
                })()}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                {(() => {
                  if (tokens.loading || typeof lastId === "undefined")
                    return (
                      <div className="text-center mt-5">
                        <Spinner color="text-light" />
                      </div>
                    );

                  if (tokens.error)
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
                      options={tokens.stakedTokens ? tokens.stakedTokens : []}
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
                1000 for the lists. The rest of them will be visible after
                staked and withdrawn.{" "}
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
  const stakeId = params ? parseInt(params.stakeId as string) : "";

  if (!Object.prototype.hasOwnProperty.call(APP.STAKING, stakeId))
    return {
      props: {
        isAvailable: false,
        stakeId: stakeId,
      },
    };

  return {
    props: {
      isAvailable: true,
      stakeId,
    },
  };
};
