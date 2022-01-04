import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { StakingInfo } from "../../components/staking-info";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { Spinner } from "../../components/spinner";
import { MultipleSelectForm } from "../../components/multiple-select-form";
import { useWeb3 } from "../../hooks/use-web3";
import { useAlert } from "react-alert";
import { fetcher } from "../../utils";
import useSWR from "swr";

interface Data {
  zombies: Array<{ id: number; title: string }>;
}

const useOwnedTokens = () => {
  const { address } = useWeb3();

  const query = `{
    zombies ( first: 250, where: { owner: "${address}" }, orderBy: mintedAt, orderDirection: desc ) {
      id
      title: name
    }
  }`;

  const { data, error, mutate } = useSWR<Data, Error>(
    address ? query : null,
    fetcher
  );

  return {
    loading: !data && !error,
    tokens: data?.zombies,
    error,
    mutate,
  };
};

const Main: NextPage = () => {
  const alert = useAlert();

  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  const { isReady, provider, address, chainId } = useWeb3();
  const owned = useOwnedTokens();
  const staked = useOwnedTokens();

  const staking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (stakeLoading || unstakeLoading) {
      alert.info(<>Please wait.</>);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const tokenIds = formData.getAll("tokenIds") as Array<FormDataEntryValue>;

    switch (e.currentTarget.name) {
      case "formStake": {
        setStakeLoading(true);
        await _stake(tokenIds);
        break;
      }
      case "formUnstake": {
        setStakeLoading(false);
        await _unstake(tokenIds);
        break;
      }
      default: {
        break;
      }
    }

    return;
  };

  const _stake = async (tokenIds: Array<FormDataEntryValue>) => {
    for (let i = 0; Math.ceil(tokenIds.length / 24) > i; i++) {
      const batch = tokenIds.slice(i * 24, i * 24 + 24);
      console.log(batch);
    }

    setStakeLoading(false);
  };

  const _unstake = async (tokenIds: Array<FormDataEntryValue>) => {
    setUnstakeLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Stake Zombies</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Stake" desc="Stake zombies to earn $BURN." />
      </div>

      <section className="inner-shadow zombie-bg py-5">
        <Web3Wrapper {...{ isReady, provider, address, chainId }}>
          <div className="container">
            <div className="text-center col-lg-12 col-md-12 col-sm-12">
              <StakingInfo />
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
                          <i className="fas fa-lock-open me-2"></i>Stakeable
                          Zombies
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
                          <i className="fas fa-lock me-2"></i>Staked Zombies
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
          </div>
        </Web3Wrapper>
      </section>
    </Layout>
  );
};

export default Main;
