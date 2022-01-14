import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "../spinner";
import { nFormatter } from "../../utils";
import { ethers } from "ethers";
import { request } from "graphql-request";

type Props = {
  index: number;
  SUBGRAPH: string;
  CONTRACT: string;
  MASTER: string;
  STAKING_SYMBOL: string;
  REWARDS_SYMBOL: string;
  POOL_IMAGE: string;
};

export const StakingCard: React.FC<Props> = ({ index, ...stake }) => {
  const [rewardForDuration, setRewardForDuration] = React.useState<
    ethers.BigNumber | undefined | null
  >(undefined);

  const [totalStaked, setTotalStaked] = React.useState<
    number | undefined | null
  >(undefined);

  React.useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const data = await request<{
          pool: { rewardForDuration: ethers.BigNumber; totalStaked: number };
        }>(stake.SUBGRAPH, "{ pool(id: 0) { totalStaked rewardForDuration } }");

        if (isMounted) setRewardForDuration(data.pool.rewardForDuration);
        if (isMounted) setTotalStaked(data.pool.totalStaked);
      } catch (err) {
        setRewardForDuration(null);
        setTotalStaked(null);
      }
    };
    init();

    return () => {
      isMounted = false;
    };
  }, [stake.SUBGRAPH]);

  const renderRewardForDuration = () => {
    if (typeof rewardForDuration === "undefined")
      return (
        <span className="me-1">
          <Spinner color="text-light" />
        </span>
      );
    if (rewardForDuration === null)
      return (
        <span className="text-light small me-1">
          <i className="fas fa-spinner"></i>
        </span>
      );

    return (
      <span className="me-1">
        {nFormatter(
          parseFloat(ethers.utils.formatUnits(rewardForDuration, 18)),
          3
        )}
      </span>
    );
  };
  const renderTotalStaked = () => {
    if (typeof totalStaked === "undefined")
      return (
        <span className="me-1">
          <Spinner color="text-light" />
        </span>
      );
    if (totalStaked === null)
      return (
        <span className="text-light small me-1">
          <i className="fas fa-spinner"></i>
        </span>
      );

    return <span className="me-1">{totalStaked}</span>;
  };

  return (
    <div className="card bg-dark text-light shadow">
      <Image
        src={stake.POOL_IMAGE}
        width={512}
        height={256}
        className="card-img-top"
        alt={`${stake.STAKING_SYMBOL}/${stake.REWARDS_SYMBOL}`}
      />
      <div className="card-body mb-0">
        <h5 className="text-truncate card-title fw-bold h6">
          {stake.STAKING_SYMBOL}
          <small>/{stake.REWARDS_SYMBOL}</small>
        </h5>
        <ul className="small mt-3 mb-0 list-unstyled">
          <li className="mb-2">
            <i className="fas fa-coins me-2"></i>
            {renderRewardForDuration()}
            <span style={{ fontSize: "0.7rem" }}>{stake.REWARDS_SYMBOL}</span>
          </li>
          <li className="text-truncate ">
            <i className="fas fa-lock me-2"></i>
            {renderTotalStaked()}
            <span style={{ fontSize: "0.7rem" }}>{stake.STAKING_SYMBOL}</span>
          </li>
        </ul>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        {(() => {
          if (stake.CONTRACT.length > 0)
            return (
              <Link href={`/stake/${index}`}>
                <a className="btn btn-warning btn-sm w-100">Stake</a>
              </Link>
            );
          return (
            <a className="btn btn-secondary btn-sm w-100 disabled">Soon...</a>
          );
        })()}
      </div>
    </div>
  );
};
