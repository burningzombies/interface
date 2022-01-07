import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../use-web3";
import { APP } from "../../utils/consts";

type StakeContract = ethers.Contract | null | undefined;
type TotalSupply = number | undefined | null;
type Earned = ethers.BigNumber | undefined | null;
type Balance = number | undefined | null;
type RewardRate = ethers.BigNumber | undefined | null;
type RewardPToken = ethers.BigNumber | undefined | null;

type UseStakeType = {
  contract: StakeContract;
  totalSupply: TotalSupply;
  earned: Earned;
  balance: Balance;
  rewardRate: RewardRate;
  rewardPToken: RewardPToken;
  pair: string;
};

export const useStake = (pair: string): UseStakeType => {
  const { signer, address } = useWeb3();

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
          `${APP.IPFS_GATEWAY}/ipfs/${APP.STAKE_CONTRACT_CID}`
        );

        const contract = new ethers.Contract(
          APP.STAKING[pair].CONTRACT,
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
    const interval = setInterval(() => init(), 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [signer, address, pair]);

  return {
    contract,
    totalSupply,
    earned,
    balance,
    rewardRate,
    rewardPToken,
    pair,
  };
};
