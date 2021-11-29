import React from "react";
import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { Filter } from "../../components/filter";
import { Sorting } from "../../components/sorting";
import { Deck } from "../../components/deck";
import { fetcher, checkEmptyObject, parseTier } from "../../utils";
import { getAllZombies, topZombie } from "../../utils/queries";
import useSWR from "swr";
import Router, { useRouter } from "next/router";
import { Zombie } from "../../types";

interface Data {
  zombies: Array<Zombie>;
}

const Marketplace: NextPage = () => {
  const router = useRouter();

  const pageIndex = Number(router.query.page);
  const tier = router.query.tier as string;
  const background = router.query.background as string;
  const skin = router.query.skin as string;
  const mouth = router.query.mouth as string;
  const eyes = router.query.eyes as string;
  const sort = router.query.sort as string;

  React.useEffect(() => {
    if (!Router || !Router.router) return;
    if (Router.router.asPath !== "/zombies" && checkEmptyObject(router.query))
      return;

    const isParamsInitialized = () => {
      return (
        typeof Router.query["page"] !== "undefined" ||
        typeof Router.query["tier"] !== "undefined" ||
        typeof Router.query["background"] !== "undefined" ||
        typeof Router.query["skin"] !== "undefined" ||
        typeof Router.query["mouth"] !== "undefined" ||
        typeof Router.query["eyes"] !== "undefined" ||
        typeof Router.query["sort"] !== "undefined"
      );
    };

    if (!isParamsInitialized()) {
      Router.replace({
        pathname: "/zombies",
        query: {
          page: 1,
          tier: "",
          background: "",
          skin: "",
          mouth: "",
          eyes: "",
          sort: "",
        },
      });
    }
  }, [router.query]);

  const { data: topZombieData, error: topZombieError } = useSWR<Data>(
    topZombie(),
    fetcher
  );

  const isLoadable = () => {
    return (
      topZombieData &&
      topZombieData.zombies.length > 0 &&
      pageIndex > 0 &&
      typeof tier !== "undefined" &&
      typeof background !== "undefined" &&
      typeof skin !== "undefined" &&
      typeof mouth !== "undefined" &&
      typeof eyes !== "undefined"
    );
  };

  const { data, error, mutate } = useSWR<Data, Error>(
    isLoadable()
      ? getAllZombies(
          pageIndex,
          parseTier(tier, topZombieData ? topZombieData.zombies[0].score : 0.0),
          background,
          skin,
          mouth,
          eyes,
          sort
        )
      : null,
    fetcher
  );

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Collection</title>
      </Head>
      <div className="container mt-5">
        <PageTitle
          title="Collection"
          desc="Here is each zombie that ever exists."
        />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <div className="mb-0">
            <Filter initialPathname="/zombies" />
          </div>
          <div className="mt-3">
            <Sorting initialPathname={`/zombies`}>
              <option value="">- Sort -</option>
              <option value="recently-listed">Recently Listed</option>
              <option value="recently-minted">Recently Minted</option>
              <option value="rarity-asc">Rarity (Lowest to Highest)</option>
              <option value="rarity-desc">Rarity (Highest to Lowest)</option>
            </Sorting>
          </div>
          <Deck
            {...{
              data,
              error: topZombieError ? topZombieError : error,
              mutate,
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
