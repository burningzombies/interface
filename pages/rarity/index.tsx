import type { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import Image from "next/image";
import { APP } from "../../utils/consts";
import formulaImage from "../../assets/formula.png";
import { AttributesTable } from "../../components/attributes-table";
import useSWR from "swr";
import { fetcher } from "../../utils";
import { Zombie } from "../../types";
import { Spinner } from "../../components/spinner";
import { topZombie } from "../../utils/queries";

type Data = {
  max: Array<Zombie>;
  min: Array<Zombie>;
  zombies: Array<Zombie>;
};

/**
 * TODO
 * If it includes more than 1000 tokens
 * should be loop, because thegraph' single query is limited by 1000
 */

const renderScoreCalculation = () => {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div className="text-end">
          <a
            href="https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c"
            target="_blank"
            rel="noreferrer"
            className="link-light small"
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
        <Image
          src={formulaImage}
          layout="responsive"
          alt="Formula of the rarity calculation"
        />
      </div>
      <div className="col-lg-8 col-md-6 col-sm-12 mb-3">
        <h6 className="fw-bold">How Scores Calculated?</h6>
        <p className="small">
          Token rarities come from the accessories assigned to tokens. All
          accessories used a certain ratio in the whole collection and were set
          scores by their amount. The token which has the highest score is the
          rarest and valuable one.
        </p>
      </div>
    </div>
  );
};

type RarityLabelProps = {
  topZombie: {
    data: Data | undefined;
  };
  label: string;
  max: number;
  min: number;
};

const RarityLabel: React.FC<RarityLabelProps> = ({
  topZombie,
  label,
  max,
  min,
  children,
}) => {
  const runQuery = () => {
    if (
      !topZombie.data ||
      !(topZombie.data.max.length > 0) ||
      !(topZombie.data.min.length > 0)
    )
      return null;

    const maxZombieScore = parseFloat(topZombie.data.max[0].score.toString());
    const minZombieScore = parseFloat(topZombie.data.min[0].score.toString());

    const from =
      minZombieScore + ((maxZombieScore - minZombieScore) * min) / 100;
    const parsedFrom = parseFloat(from.toString());

    const to = minZombieScore + ((maxZombieScore - minZombieScore) * max) / 100;
    const parsedTo = parseFloat(to.toString());

    return `{
      zombies (first: 1000, where: { score_lt: "${parsedTo}", score_gte: "${parsedFrom}" }) {
        id
      }
    }`;
  };

  const { data, error } = useSWR<Data, Error>(runQuery(), fetcher);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
      <div className="text-center bg-dark shadow rounded p-3">
        {children}
        <p className="lead text-light text-shadow">{label}</p>
        <div className="text-light">
          {min.toFixed(0)}% - {max.toFixed(0)}%
        </div>
        <div className="text-light small border-top border-secondary pt-2 mt-2">
          {(() => {
            if (!data && !error) {
              return <Spinner color="text-light" />;
            }
            if (!data || error) {
              return <>Something went wrong!</>;
            }
            return (
              <>
                {data.zombies.length > 999 ? (
                  <>More than {data.zombies.length}</>
                ) : (
                  data.zombies.length
                )}{" "}
                Walking deads.
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

const Rarity: NextPage = () => {
  const { data } = useSWR<Data, Error>(topZombie, fetcher);

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Rarity Scores</title>
      </Head>
      <div className="container py-5">
        <PageTitle
          title="Rarity Scores"
          desc="Token rarities come from the accessories assigned to tokens."
        />

        <div className="mb-5">{renderScoreCalculation()}</div>

        <div className="row mb-5">
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Common",
              min: 0,
              max: 40,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
            </h3>
          </RarityLabel>
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Uncommon",
              min: 40,
              max: 55,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
            </h3>
          </RarityLabel>
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Rare",
              min: 55,
              max: 70,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
              <i className="text-warning text-shadow fas fa-fire mx-1"></i>
            </h3>
          </RarityLabel>
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Super Rare",
              min: 70,
              max: 80,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
            </h3>
          </RarityLabel>
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Mystic",
              min: 80,
              max: 90,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
            </h3>
          </RarityLabel>
          <RarityLabel
            {...{
              topZombie: { data },
              label: "Legendary",
              min: 90,
              max: 100.4,
            }}
          >
            <h3>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
              <i className="text-warning text-shadow fas fa-biohazard mx-1"></i>
            </h3>
          </RarityLabel>
        </div>

        <AttributesTable />
      </div>
    </Layout>
  );
};

export default Rarity;
