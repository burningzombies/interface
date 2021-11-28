import React from "react";
import { Spinner } from "../spinner";
import useSWR from "swr";
import { fetcher } from "../../utils";

type Props = {
  score: number;
};

type Data = {
  top: Array<{ score: number }>;
};

export const OverallRarity: React.FC<Props> = ({ score }) => {
  const { data, error } = useSWR<Data, Error>(
    `{
		top: zombies(first: 1, orderBy: score, orderDirection: desc) {
			score
		}
	}`,
    fetcher
  );

  if (!data && !error) {
    return <Spinner color="text-light" />;
  }
  if (error) {
    return <i className="fas text-light fa-times"></i>;
  }
  if (!data || !(data.top.length > 0)) {
    return <i className="fas text-light fa-times"></i>;
  }

  const fraction = (score / data.top[0].score) * 100;

  return (
    <>
      <div className="mt-2 text-light small">Overall Rarity Score</div>
      <div className="progress shadow mt-2 mb-3 bg-secondary">
        <div
          className="progress-bar bg-warning text-dark text-shadow fw-bold"
          role="progressbar"
          style={{ width: `${fraction}%` }}
          aria-valuenow={fraction}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {fraction.toFixed(2)}%
        </div>
      </div>
    </>
  );
};
