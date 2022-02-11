import React from "react";
import { Spinner } from "../spinner";
import useSWR from "swr";
import { fetcher } from "../../utils";

type Props = {
  score: number;
};

type Data = {
  min: Array<{ score: number }>;
  max: Array<{ score: number }>;
};

export const OverallRarity: React.FC<Props> = ({ score }) => {
  const { data, error } = useSWR<Data, Error>(
    `{
      max: zombies (first: 1, orderBy: score, orderDirection: desc) {
        score
      }
      min: zombies (first: 1, orderBy: score, orderDirection: asc) {
        score
      }
    }`,
    fetcher
  );

  if (!data && !error) return <Spinner color="text-light" />;

  if (error || !data || !(data.max.length > 0) || !(data.min.length > 0))
    return <i className="fas text-light fa-times"></i>;

  const fraction =
    ((parseFloat(data.min[0].score.toString()) - score) /
      (parseFloat(data.min[0].score.toString()) -
        parseFloat(data.max[0].score.toString()))) *
    100;

  const parsedFraction = fraction === 0 ? 1 : fraction;

  console.log(fraction);

  return (
    <>
      <div className="mt-2 text-light small">Overall Rarity Score</div>
      <div className="progress shadow mt-2 mb-3 bg-secondary">
        <div
          className="progress-bar bg-warning text-dark text-shadow fw-bold"
          role="progressbar"
          style={{ width: `${parsedFraction}%` }}
          aria-valuenow={parsedFraction}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {parsedFraction.toFixed(1)}%
        </div>
      </div>
    </>
  );
};
