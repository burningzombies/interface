import type { NextPage } from "next";
import React from "react";
import Router, { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import { Filter } from "../../components/filter";
import { Sorting } from "../../components/sorting";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { fetcher, checkEmptyObject } from "../../utils";
import { getUserZombies } from "../../utils/queries";
import useSWR from "swr";
import { useWeb3 } from "../../hooks/use-web3";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { Deck } from "../../components/deck";
import { Zombie, Collection } from "../../types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAlert } from "react-alert";
import { Balance } from "../../components/balance";

interface Data {
  zombies: Array<Zombie>;
  collection: Collection;
}

const Graveyard: NextPage = () => {
  const router = useRouter();
  const alert = useAlert();

  const pageIndex = Number(router.query.page);
  const gender = router.query.gender as string;
  const background = router.query.background as string;
  const skin = router.query.skin as string;
  const mouth = router.query.mouth as string;
  const eyes = router.query.eyes as string;
  const sort = router.query.sort as string;

  const { isReady, address, provider, chainId, masterContract } = useWeb3();

  React.useEffect(() => {
    if (!Router || !Router.router) return;
    if (Router.router.asPath !== "/graveyard" && checkEmptyObject(router.query))
      return;

    const isInitialized = () => {
      return (
        typeof Router.query["page"] !== "undefined" &&
        typeof Router.query["gender"] !== "undefined" &&
        typeof Router.query["background"] !== "undefined" &&
        typeof Router.query["skin"] !== "undefined" &&
        typeof Router.query["mouth"] !== "undefined" &&
        typeof Router.query["eyes"] !== "undefined" &&
        typeof Router.query["sort"] !== "undefined"
      );
    };

    if (!isInitialized()) {
      Router.replace({
        pathname: "/graveyard",
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
    return isReady && address && chainId && chainId === APP.CHAIN_ID;
  };

  const { data, error, mutate } = useSWR<Data, Error>(
    !isLoadable()
      ? null
      : getUserZombies(
          address as string,
          pageIndex,
          gender,
          background,
          skin,
          mouth,
          eyes,
          sort
        ), // eslint-disable-line no-mixed-spaces-and-tabs
    fetcher
  );
  const share = () => {
    if (typeof window === "undefined" || !router.asPath || !address) return;

    const text = encodeURIComponent(
      `Hey zombies! I just got mines 🥳.\n\nLook at them 👉 ${
        window.location.protocol
      }//${window.location.host}/users/${address.toLowerCase()} 🧟‍♂️🧟‍♀️`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Graveyard</title>
      </Head>
      <div className="container mt-5">
        <PageTitle
          title="Graveyard"
          desc="The graveyard is the place for the walking dead. You're the one who holds the ax!"
        />
        <div className="mb-5">
          <a
            onClick={share}
            target="_blank"
            className="link-light text-shadow"
            rel="noreferrer"
            style={{ cursor: "pointer" }}
          >
            <i className="fab fa-2x fa-twitter"></i>
          </a>
        </div>
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <Web3Wrapper {...{ isReady, provider, address, chainId }}>
            <div
              title="User Balance"
              className="rounded-top small bg-dark d-inline p-2 text-light text-shadow"
            >
              <i className="fas fa-biohazard me-2"></i>
              <Balance {...{ masterContract, owner: address }} />
            </div>
            <CopyToClipboard
              text={
                typeof window !== "undefined"
                  ? `${window.location.protocol}//${window.location.host}/users/${address}`
                  : "..."
              }
              onCopy={() => alert.success(<>Copied.</>)}
            >
              <div
                style={{ cursor: "pointer" }}
                className="rounded-top small bg-dark d-inline ms-3 p-2 text-light text-shadow"
              >
                <i className="me-2 fas fa-copy"></i>Public Profile
              </div>
            </CopyToClipboard>
            <Filter initialPathname="/graveyard" />
            <div className="mt-3">
              <Sorting initialPathname="/graveyard">
                <option value="">- Sort -</option>
                <option value="recently-listed">Recently Listed</option>
                <option value="recently-minted">Recently Minted</option>
                <option value="rarity-asc">Rarity (Lowest to Highest)</option>
                <option value="rarity-desc">Rarity (Highest to Lowest)</option>
              </Sorting>
            </div>
            <Deck {...{ data, error, mutate }} />
          </Web3Wrapper>
        </div>
      </section>
    </Layout>
  );
};

export default Graveyard;
