import React from "react";
import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { MarketStats } from "../../components/market-stats";
import { BigNumber } from "ethers";
import { Filter } from "../../components/filter";
import { Sorting } from "../../components/sorting";
import { Deck } from "../../components/deck";
import { fetcher, checkEmptyObject } from "../../utils";
import { getOnSaleZombies } from "../../utils/queries";
import useSWR from "swr";
import Router, { useRouter } from "next/router";
import { Zombie, Collection } from "../../types";
import { Spinner } from "../../components/spinner";

interface Data {
  zombies: Array<Zombie>;
  collection: Collection;
  marketStats: {
    highestSale: BigNumber;
    totalVolume: BigNumber;
  };
  floor: Array<{
    price: BigNumber;
  }>;
}

const Marketplace: NextPage = () => {
  const router = useRouter();

  const pageIndex = Number(router.query.page);
  const gender = router.query.gender as string;
  const background = router.query.background as string;
  const skin = router.query.skin as string;
  const mouth = router.query.mouth as string;
  const eyes = router.query.eyes as string;
  const sort = router.query.sort as string;

  React.useEffect(() => {
    if (!Router || !Router.router) return;
    if (
      Router.router.asPath !== "/marketplace" &&
      checkEmptyObject(router.query)
    )
      return;

    const isParamsInitialized = () => {
      return (
        typeof Router.query["page"] !== "undefined" ||
        typeof Router.query["gender"] !== "undefined" ||
        typeof Router.query["background"] !== "undefined" ||
        typeof Router.query["skin"] !== "undefined" ||
        typeof Router.query["mouth"] !== "undefined" ||
        typeof Router.query["eyes"] !== "undefined" ||
        typeof Router.query["sort"] !== "undefined"
      );
    };

    if (!isParamsInitialized()) {
      Router.replace({
        pathname: "/marketplace",
        query: {
          page: 1,
          gender: "",
          background: "",
          skin: "",
          mouth: "",
          eyes: "",
          sort: "",
        },
      });
    }
  }, [router.query]);

  const isLoadable = () => {
    return (
      pageIndex > 0 ||
      typeof gender !== "undefined" ||
      typeof background !== "undefined" ||
      typeof skin !== "undefined" ||
      typeof mouth !== "undefined" ||
      typeof eyes !== "undefined"
    );
  };

  const { data, error, mutate } = useSWR<Data, Error>(
    isLoadable()
      ? getOnSaleZombies(pageIndex, gender, background, skin, mouth, eyes, sort)
      : null,
    fetcher
  );

  const renderMarketplaceStats = () => {
    if (!data && !error) {
      return <Spinner color="text-warning" />;
    }
    if (error || !data || !data.marketStats) {
      return (
        <span className="text-danger">Failed to fetch marketplace stats.</span>
      );
    }
    return (
      <MarketStats
        {...{
          highestSale: data.marketStats.highestSale,
          totalVolume: data.marketStats.totalVolume,
          floorPrice:
            data.floor.length > 0 ? data.floor[0].price : BigNumber.from(0),
        }}
      />
    );
  };

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Marketplace</title>
      </Head>
      <div className="container mt-5">
        <PageTitle
          title="Marketplace"
          desc="These walking deads are available to own. Wanna grab?"
        />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <div className="mb-0">
            <Filter initialPathname="/marketplace" />
          </div>
          <div className="text-center py-2 bg-dark rounded-bottom">
            {renderMarketplaceStats()}
          </div>
          <div className="mt-3">
            <Sorting initialPathname="/marketplace">
              <option value="">Recently Listed</option>
              <option value="price-asc">Price (Lowest to Highest)</option>
              <option value="price-desc">Price (Highest to Lowest)</option>
              <option value="rarity-asc">Rarity (Lowest to Highest)</option>
              <option value="rarity-desc">Rarity (Highest to Lowest)</option>
            </Sorting>
          </div>
          <Deck {...{ data, error, mutate }} />
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
