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

export const RarityTag: React.FC<Props> = ({ score }) => {
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

  if (!data && !error) {
    return <Spinner color="text-light" />;
  }
  if (error) {
    return <i className="fas text-light fa-times"></i>;
  }
  if (!data || !(data.min.length > 0) || !(data.max.length > 0)) {
    return <i className="fas text-light fa-times"></i>;
  }

  const fraction =
    ((parseFloat(data.min[0].score.toString()) - score) /
      (parseFloat(data.min[0].score.toString()) -
        parseFloat(data.max[0].score.toString()))) *
    100;

  return (
    <span className="fw-bold text-shadow text-light">
      <i className="me-1 fas fa-hashtag"></i>
      {(() => {
        if (fraction >= 0 && fraction < 40) {
          return "Common";
        } else if (fraction >= 40 && fraction < 55) {
          return "Uncommon";
        } else if (fraction >= 55 && fraction < 70) {
          return "Rare";
        } else if (fraction >= 70 && fraction < 80) {
          return "Super Rare";
        } else if (fraction >= 80 && fraction < 90) {
          return "Mystic";
        } else if (fraction >= 90 && fraction < 100.4) {
          return "Legendary";
        } else {
          return "Reveal Soon";
        }
      })()}
    </span>
  );
};
