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

export const RarityTag: React.FC<Props> = ({ score }) => {
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

  const fraction = parseFloat(((score / data.top[0].score) * 100).toFixed(0));

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
        } else {
          return "Legendary";
        }
      })()}
    </span>
  );
};
