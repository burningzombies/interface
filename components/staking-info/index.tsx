import React from "react";
import { ethers } from "ethers";
import { nFormatter, errorHandler, parsePrice } from "../../utils";
import { Spinner } from "../spinner";
import { useAlert } from "react-alert";
import { APP } from "../../utils/consts";

type Props = {
  contract?: ethers.Contract | null;
  totalSupply?: number | null;
  earned?: ethers.BigNumber | null;
  balance?: number | null;
  rewardForDuration?: ethers.BigNumber | null;
  rewardPToken?: ethers.BigNumber | null;
  stakeId: number;
};

export const StakingInfo: React.FC<Props> = ({ ...props }) => {
  const alert = useAlert();

  const [loading, setLoading] = React.useState<boolean>(false);

  const getReward = async () => {
    if (!props.contract || loading) return;
    setLoading(true);

    try {
      const tx = await props.contract.getReward();
      await tx.wait();

      alert.success(<>Claimed.</>);
      setLoading(false);

      // eslint-disable-next-line
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
      setLoading(false);
    }
  };

  const renderEarned = () => {
    if (typeof props.earned === "undefined" || loading || props.earned === null)
      return <Spinner color="text-dark" />;

    return parsePrice(props.earned, 2);
  };

  const renderRewardForDuration = () => {
    if (
      typeof props.rewardForDuration === "undefined" ||
      props.rewardForDuration === null
    )
      return <Spinner color="text-light" />;

    return nFormatter(
      parseFloat(ethers.utils.formatUnits(props.rewardForDuration, 18)),
      3
    );
  };

  const renderRewardPToken = () => {
    if (
      typeof props.rewardPToken === "undefined" ||
      props.rewardPToken === null
    )
      return <Spinner color="text-light" />;

    return parsePrice(
      props.rewardPToken.div(ethers.BigNumber.from("1000000000000000000")),
      2
    );
  };

  const renderBalance = () => {
    if (typeof props.balance === "undefined")
      return <Spinner color="text-light" />;

    return props.balance;
  };

  return (
    <ul className="list-inline text-light text-shadow">
      <li className="mx-3 list-inline-item" title="Total Staked">
        <i className="fas fa-lock me-2"></i>
        {typeof props.totalSupply !== "undefined" ? (
          props.totalSupply
        ) : (
          <Spinner color="text-light" />
        )}
        <small className="ms-1">
          {APP.STAKING[props.stakeId].STAKING_SYMBOL}
        </small>
      </li>
      <li className="mx-3 list-inline-item" title="Your Stake">
        <i className="fas fa-user-lock me-2"></i>
        {renderBalance()}
        <small className="ms-1">
          {APP.STAKING[props.stakeId].STAKING_SYMBOL}
        </small>
      </li>
      <li
        className="mx-3 list-inline-item"
        title={`Pool Rate ${APP.STAKING[props.stakeId].REWARDS_SYMBOL}`}
      >
        <i className="fas fa-coins me-2"></i>
        {renderRewardForDuration()}
        <small className="ms-1">
          {APP.STAKING[props.stakeId].REWARDS_SYMBOL}
        </small>
      </li>
      <li
        className="mx-3 list-inline-item"
        title={`${APP.STAKING[props.stakeId].REWARDS_SYMBOL} per ${
          APP.STAKING[props.stakeId].STAKING_SYMBOL
        }`}
      >
        <i className="fas fa-donate me-2"></i>
        {renderRewardPToken()}
        <small className="ms-1">
          {APP.STAKING[props.stakeId].REWARDS_SYMBOL}
        </small>
      </li>
      <li className="mx-3 list-inline-item" title="Get Rewards">
        <button onClick={getReward} className="btn btn-warning btn-sm">
          {renderEarned()}
          <small className="ms-1">
            {APP.STAKING[props.stakeId].REWARDS_SYMBOL}
          </small>
        </button>
      </li>
    </ul>
  );
};
