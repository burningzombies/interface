import React from "react";

export const StakingInfo: React.FC = () => {
  return (
    <ul className="list-inline text-light text-shadow">
      <li className="mx-3 list-inline-item" title="Total Staked">
        <i className="fas fa-lock me-2"></i>30
        <small className="ms-1">$ZOMBIE</small>
      </li>
      <li className="mx-3 list-inline-item" title="Your Stake">
        <i className="fas fa-user-lock me-2"></i>3
        <small className="ms-1">$ZOMBIE</small>
      </li>
      <li className="mx-3 list-inline-item" title="Pool Rate $BURN/week">
        <i className="fas fa-percentage me-2"></i>30,999
        <small className="ms-1">$BURN</small>
      </li>
      <li className="mx-3 list-inline-item" title="$BURN per $ZOMBIE">
        <i className="fas fa-donate me-2"></i>2,999
        <small className="ms-1">$BURN</small>
      </li>
      <li className="mx-3 list-inline-item" title="Get Rewards">
        <button className="btn btn-warning btn-sm">
          12,000<small className="ms-1">$BURN</small>
        </button>
      </li>
    </ul>
  );
};
