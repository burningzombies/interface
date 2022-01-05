import type { NextPage } from "next";
import { useEffect, useState } from "react";
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
import { sleep, errorHandler, fetcher } from "../../utils";
import useSWR from "swr";
import { ethers } from "ethers";

interface Data {
  zombies: Array<{ id: number; title: string }>;
}

interface StakedData {
  stake: {
    tokens: Array<{ id: number; title: string }>;
  };
}

const useStake = () => {
  const { signer, address } = useWeb3();

  type StakeContract = ethers.Contract | null | undefined;
  type TotalSupply = number | undefined | null;
  type Earned = ethers.BigNumber | undefined | null;
  type Balance = number | undefined | null;
  type RewardRate = ethers.BigNumber | undefined | null;
  type RewardPToken = ethers.BigNumber | undefined | null;

  const [contract, setContract] = useState<StakeContract>(undefined);
  const [totalSupply, setTotalSupply] = useState<TotalSupply>(undefined);
  const [earned, setEarned] = useState<Earned>(undefined);
  const [balance, setBalance] = useState<Balance>(undefined);
  const [rewardRate, setRewardRate] = useState<RewardRate>(undefined);
  const [rewardPToken, setRewardPToken] = useState<RewardPToken>(undefined);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!signer || !address) return;

      try {
        const abi = await fetch(
          `${APP.IPFS_GATEWAY}/ipfs/${APP.STAKING_CONTRACT_CID}`
        );

        const contract = new ethers.Contract(
          APP.STAKING_CONTRACT,
          await abi.json(),
          signer
        );

        if (isMounted) setContract(contract);

        const totalSupply = await contract.totalSupply();
        if (isMounted) setTotalSupply(totalSupply.toNumber());

        const earned = await contract.earned(address);
        if (isMounted) setEarned(earned);

        const balance = await contract.balanceOf(address);
        if (isMounted) setBalance(balance.toNumber());

        const rewardRate = await contract.getRewardForDuration();
        if (isMounted) setRewardRate(rewardRate);

        const rewardPToken = await contract.rewardPerToken();
        if (isMounted) setRewardPToken(rewardPToken);
      } catch {
        setContract(null);
      }
    };

    init();
    const interval = setInterval(() => init(), 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [signer, address]);

  return {
    contract,
    totalSupply,
    earned,
    balance,
    rewardRate,
    rewardPToken,
  };
};

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

const useStakedTokens = () => {
  const { address } = useWeb3();

  const query = `{
    stake(id:"${address && address.toLowerCase()}") {
      tokens (first: 100) {
        id
        title: name
      }
    }
  }`;

  const { data, error, mutate } = useSWR<StakedData, Error>(
    address ? query : null,
    fetcher
  );

  return {
    loading: !data && !error,
    tokens: data?.stake?.tokens,
    error,
    mutate,
  };
};

const Main: NextPage = () => {
  const alert = useAlert();
  const stakeContract = useStake();

  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  const { masterContract, isReady, provider, address, chainId } = useWeb3();
  const owned = useOwnedTokens();
  const staked = useStakedTokens();

  const staking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { contract } = stakeContract;

    if (!masterContract || !contract || stakeLoading || unstakeLoading) {
      alert.info(<>Please wait.</>);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const tokenIds = formData.getAll("tokenIds") as Array<FormDataEntryValue>;

    const _stake = async (tokenIds: Array<FormDataEntryValue>) => {
      try {
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
          const stake = await contract.stake(batch);
          await stake.wait();
        }

        await sleep(5000);
        await Promise.all([owned.mutate(), staked.mutate()]);

        alert.success(<>Staked.</>);
        setStakeLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        alert.error(<>{errorHandler(err)}</>);
      }

      setStakeLoading(false);
    };

    const _unstake = async (tokenIds: Array<FormDataEntryValue>) => {
      try {
        for (let i = 0; Math.ceil(tokenIds.length / 24) > i; i++) {
          const batch = tokenIds.slice(i * 24, i * 24 + 24);
          const withdraw = await contract.withdraw(batch);
          await withdraw.wait();
        }

        await sleep(5000);
        await Promise.all([owned.mutate(), staked.mutate()]);

        alert.success(<>Withdrawn.</>);
        setUnstakeLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        alert.error(<>{errorHandler(err)}</>);
      }

      setUnstakeLoading(false);
    };

    switch (e.currentTarget.name) {
      case "formStake": {
        setStakeLoading(true);
        await _stake(tokenIds);
        break;
      }
      case "formUnstake": {
        setUnstakeLoading(true);
        await _unstake(tokenIds);
        break;
      }
      default: {
        break;
      }
    }

    return;
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
