import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { useRouter } from "next/router";
import { parsePrice, toTitleCase, fetcher } from "../../utils";
import { getSingleZombie } from "../../utils/queries";
import useSWR from "swr";
import { Zombie, Collection } from "../../types";
import { Spinner } from "../../components/spinner";
import Image from "next/image";
import Link from "next/link";
import { APP } from "../../utils/consts";
import avax from "../../assets/avax-logo.svg";
import { Web3Actions } from "../../components/web3-actions";
import { TokenAttributes } from "../../components/token-attributes";
import { RarityTag } from "../../components/rarity-tag";
import { OverallRarity } from "../../components/overall-rarity";
import { TokenHistory } from "../../components/token-history";
import { TransferToken } from "../../components/transfer-token";

interface Data {
  zombies: Array<Zombie>;
  collection: Collection;
}

const SingleZombie: NextPage = () => {
  const router = useRouter();

  const { data, error, mutate } = useSWR<Data, Error>(
    !router.query.name ? null : getSingleZombie(router.query.name as string),
    fetcher
  );

  const renderPrice = () => {
    if (!data) return;
    if (data.zombies[0].sale === true) {
      return (
        <div className="d-flex">
          <span
            className="text-light text-shadow me-2 text-uppercase small fw-bold"
            style={{ marginTop: "0.3rem", fontSize: "0.7rem" }}
          >
            Listed Price
          </span>
          <Image
            alt="$AVAX"
            src={avax}
            width={30}
            height={30}
            className="float-start"
          />
          <span
            style={{ fontSize: "1.1rem" }}
            className="ms-2 text-shadow text-warning fw-bold"
          >
            {parsePrice(data.zombies[0].price, 2)}
          </span>{" "}
        </div>
      );
    }
    return <div className="text-danger fw-bold text-shadow">Not for sale</div>;
  };

  return (
    <Layout>
      <Head>
        <title>
          {APP.NAME} -{" "}
          {router.query.name ? toTitleCase(router.query.name as string) : "..."}
        </title>
      </Head>
      {(() => {
        if (!data && !error) {
          return (
            <div className="container text-center mt-5">
              <Spinner color="text" />
            </div>
          );
        }
        if (error) {
          return (
            <div className="container text-center mt-5">
              <span className="text-dark">
                Sorry for that, something went wrong if it continues, please
                report us: boo@burningzombies.com
              </span>
            </div>
          );
        }
        if (!data || !(data.zombies.length > 0)) {
          router.replace("/404");
          return (
            <div className="container text-center mt-5">
              <Spinner color="text" />
            </div>
          );
        }
        return (
          <div>
            <div className="container mt-5">
              <PageTitle
                title={
                  <>
                    {data.zombies[0].name}
                    <sup className="ms-1">{data.zombies[0].id}</sup> (
                    {data.zombies[0].gender === "Male" ? (
                      <i className="text-info fas fa-mars"></i>
                    ) : (
                      <i className="text-danger fas fa-venus"></i>
                    )}
                    )
                  </>
                }
                desc={`What a bitch, right?`}
              />
            </div>
            <section className="zombie-bg py-5 inner-shadow">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="rounded border border-5 border-dark hero-shadow mb-3">
                      <Image
                        className="rounded"
                        src={`${
                          APP.IPFS_GATEWAY
                        }/ipfs/${data.zombies[0].imageURI
                          .split("ipfs://")
                          .join("")}`}
                        width={512}
                        height={512}
                        layout="responsive"
                        alt={data.zombies[0].name}
                      />
                    </div>
                    <div className="mb-4">
                      <OverallRarity score={data.zombies[0].score} />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="float-end">
                      <TransferToken
                        className="btn btn-outline-light"
                        from={data.zombies[0].owner}
                        tokenId={data.zombies[0].id}
                        mutate={mutate}
                      />
                    </div>

                    <ul className="list-unstyled">
                      <li
                        className="text-truncate text-light text-shadow mb-3"
                        title="Minted At"
                      >
                        <i className="fas fa-clock me-2"></i>
                        <span>
                          {new Date(
                            data.zombies[0].mintedAt * 1000
                          ).toUTCString()}
                        </span>
                      </li>
                      <li
                        className="text-truncate text-light text-shadow mb-3"
                        title="Minter"
                      >
                        <i className="fab fa-ethereum me-2"></i>
                        <Link
                          href={`/users/${data.zombies[0].minter.toLowerCase()}`}
                        >
                          <a className="text-decoration-none link-light">
                            {data.zombies[0].minter.toLowerCase().slice(0, 30)}
                            ...
                          </a>
                        </Link>
                      </li>
                      <li
                        className="text-truncate text-light text-shadow mb-3"
                        title="Owner"
                      >
                        <i className="fas fa-user me-2"></i>
                        <Link
                          href={`/users/${data.zombies[0].owner.toLowerCase()}`}
                        >
                          <a className="text-decoration-none link-light">
                            {data.zombies[0].owner.toLowerCase().slice(0, 30)}
                            ...
                          </a>
                        </Link>
                      </li>
                      <li
                        className="text-truncate small text-light text-shadow mb-3"
                        title="Owner"
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={
                            APP.CHAIN_ID === 43114
                              ? `https://snowtrace.io/token/${APP.MASTER_CONTRACT}?a=${data.zombies[0].id}`
                              : `https://testnet.snowtrace.io/token/${APP.MASTER_CONTRACT}?a=${data.zombies[0].id}`
                          }
                          className="me-2 text-decoration-none link-light"
                        >
                          View on the snowtrace.io
                        </a>
                        <i className="fas fa-external-link-alt"></i>
                      </li>
                    </ul>
                    <div className="mb-3">
                      <RarityTag score={data.zombies[0].score} />
                    </div>
                    <div className="mb-4">{renderPrice()}</div>
                    <div className="mb-3">
                      <Web3Actions
                        {...{
                          size: "btn-md",
                          owner: data.zombies[0].owner,
                          sale: data.zombies[0].sale,
                          tokenId: data.zombies[0].id,
                          price: data.zombies[0].price,
                          mutate,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="container py-5">
              <TokenAttributes
                attrs={data.zombies[0].attributes}
                totalSupply={data.collection.totalSupply}
              />
            </div>
            <section className="zombie-bg inner-shadow py-5">
              <div className="container">
                <TokenHistory history={data.zombies[0].history} />
              </div>
            </section>
          </div>
        );
      })()}
    </Layout>
  );
};

export default SingleZombie;
