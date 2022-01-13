import type { NextPage } from "next";
import React from "react";
import Router, { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import { Filter } from "../../components/filter";
import { Sorting } from "../../components/sorting";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { parseTier, fetcher, checkEmptyObject } from "../../utils";
import { getUserZombies, topZombie } from "../../utils/queries";
import useSWR from "swr";
import { Deck } from "../../components/deck";
import { Zombie, Collection } from "../../types";
import { parseAddress } from "../../utils";
import { utils } from "ethers";
import { Spinner } from "../../components/spinner";

interface Data {
  max: Array<Zombie>;
  min: Array<Zombie>;
  zombies: Array<Zombie>;
  collection: Collection;
}

const UserGraveyard: NextPage = () => {
  const router = useRouter();

  const pageIndex = Number(router.query.page);
  const tier = router.query.tier as string;
  const background = router.query.background as string;
  const skin = router.query.skin as string;
  const mouth = router.query.mouth as string;
  const eyes = router.query.eyes as string;
  const sort = router.query.sort as string;
  const address = React.useMemo(() => {
    return router.query.address ? (router.query.address as string) : "";
  }, [router.query.address]);

  React.useEffect(() => {
    if (!Router || !Router.router) return;
    if (
      Router.router.asPath !== `/users/${address}` &&
      checkEmptyObject(router.query)
    )
      return;

    const isNotInitialized = () => {
      return (
        !Router.query["page"] ||
        typeof Router.query["tier"] === "undefined" ||
        typeof Router.query["background"] === "undefined" ||
        typeof Router.query["skin"] === "undefined" ||
        typeof Router.query["mouth"] === "undefined" ||
        typeof Router.query["eyes"] === "undefined" ||
        typeof Router.query["sort"] === "undefined"
      );
    };

    if (isNotInitialized()) {
      Router.replace({
        pathname: `/users/${address}`,
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
  }, [address, router.query]);

  const { data: topZombieData, error: topZombieError } = useSWR<Data>(
    topZombie(),
    fetcher
  );

  const isLoadable = () => {
    return (
      typeof topZombieData !== "undefined" &&
      topZombieData.min.length > 0 &&
      topZombieData.max.length > 0 &&
      pageIndex > 0 &&
      typeof tier !== "undefined" &&
      typeof background !== "undefined" &&
      typeof skin !== "undefined" &&
      typeof mouth !== "undefined" &&
      typeof eyes !== "undefined"
    );
  };

  const { data, error, mutate } = useSWR<Data, Error>(
    !isLoadable()
      ? null
      : getUserZombies(
          address,
          pageIndex,
          parseTier(
            tier,
            topZombieData ? topZombieData.min[0].score : 0.0,
            topZombieData ? topZombieData.max[0].score : 999
          ),
          background,
          skin,
          mouth,
          eyes,
          sort
        ), // eslint-disable-line no-mixed-spaces-and-tabs
    fetcher
  );

  return (
    <Layout>
      <Head>
        <title>
          {APP.NAME} - {address}
        </title>
      </Head>
      {(() => {
        if (!address) {
          return (
            <div className="container mt-5 text-center">
              <Spinner color="text-light" />
            </div>
          );
        }
        if (!utils.isAddress(address)) {
          router.replace("/404");
          return (
            <div className="container mt-5 text-center">
              <Spinner color="text-light" />
            </div>
          );
        }
        return (
          <div>
            <div className="container mt-5">
              <PageTitle
                title={`${address.slice(0, 12)}...`}
                desc={`You're watching ${parseAddress(
                  address
                )}'s walking deads.`}
              />
            </div>
            <section className="zombie-bg inner-shadow py-5">
              <div className="container">
                <Filter initialPathname={`/users/${address}`} />
                <div className="mt-3">
                  <Sorting initialPathname={`/users/${address}`}>
                    <option value="">- Sort -</option>
                    <option value="recently-listed">Recently Listed</option>
                    <option value="recently-minted">Recently Minted</option>
                    <option value="rarity-asc">
                      Rarity (Lowest to Highest)
                    </option>
                    <option value="rarity-desc">
                      Rarity (Highest to Lowest)
                    </option>
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
          </div>
        );
      })()}
    </Layout>
  );
};

export default UserGraveyard;
