import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/use-window-size";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { parseAddress, fetcher } from "../../utils";
import useSWR from "swr";
import { Spinner } from "../../components/spinner";
import newMinted from "../../assets/new.png";
import { utils } from "ethers";

type Zombie = {
  id: string;
  name: string;
  imageURI: string;
};

type Props = {
  isNew: boolean;
} & Zombie;

interface Data {
  zombies: Array<Zombie>;
}

const PreviewToken: React.FC<Props> = ({ name, imageURI, isNew }) => {
  return (
    <div
      className={`card p-1 ${
        isNew ? "bg-warning text-dark" : "bg-dark text-warning"
      } shadow`}
      title={name}
    >
      <div className="position-absolute top-0 left-0" style={{ zIndex: 1 }}>
        {isNew && (
          <Image src={newMinted} width={70} height={70} alt="New Minted" />
        )}
      </div>
      <Link href={`/zombies/${encodeURIComponent(name.toLowerCase())}`}>
        <a>
          <Image
            src={`https://ipfs.burningzombies.com/ipfs/${imageURI
              .split("ipfs://")
              .join("")}`}
            layout="responsive"
            width={512}
            height={512}
            className="card-img-top"
            alt={name}
          />
        </a>
      </Link>
      <div className="card-body p-1 pt-2">
        <Link href={`/zombies/${encodeURIComponent(name.toLowerCase())}`}>
          <a
            className={`text-decoration-none ${
              isNew ? "link-dark" : "link-light"
            }`}
          >
            <span className="d-block text-truncate fw-bold">{name}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

const Congrats: NextPage = () => {
  const size = useWindowSize();
  const router = useRouter();

  const minter = router.query.minter
    ? (router.query.minter as string)
    : undefined;
  const tokens = router.query.tokens
    ? parseInt(router.query.tokens as string)
    : undefined;

  const query = `
    {
      zombies (where: { minter: "${minter}" }, first: 24, orderDirection: desc, orderBy: mintedAt) {
        name
        imageURI
        id
      }
    }
  `;
  const { data, error } = useSWR<Data, Error>(
    !minter || !tokens || !utils.isAddress(minter) ? null : query,
    fetcher,
    { refreshInterval: 1000 }
  );

  const share = () => {
    if (typeof window === "undefined" || !router.asPath) return;

    const text = encodeURIComponent(
      `GB Everyone, I just got my zombies 🥳.\n\nLook at them 👉 https://burningzombies.com${router.asPath} 🧟‍♂️🧟‍♀️`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{APP.NAME} - Congratulations!</title>
        </Head>
        {(() => {
          if (!minter || !tokens || !utils.isAddress(minter)) {
            return (
              <div className="container mt-5 text-center">
                <Spinner color="text-light" />
              </div>
            );
          }
          return (
            <>
              <div className="container mt-5">
                <PageTitle
                  title="Congratulations"
                  desc={`${parseAddress(
                    minter
                  )} added new zombies to the collection. That was scary!`}
                />
                <div className="text-dark mb-5">
                  <i className="fas fa-info-circle"></i> Burning Zombies uses
                  fully decentralized services to show tokens. That&apos;s why
                  some delays are typical but don&apos;t hesitate to contact us
                  if you think that something is wrong.
                </div>
              </div>
              <section className="zombie-bg inner-shadow py-5">
                <div className="container">
                  {(() => {
                    if (!data && !error) {
                      return (
                        <div className="text-center my-5">
                          <Spinner color="text-light" />
                        </div>
                      );
                    }
                    if (error) {
                      return (
                        <div className="text-center my-5">
                          <span className="text-light">
                            Something went wrong!
                          </span>
                        </div>
                      );
                    }
                    if (!data || !(data.zombies.length > 0)) {
                      return (
                        <div className="text-center my-5">
                          <Spinner color="text-light" />
                        </div>
                      );
                    }
                    return (
                      <>
                        {size.width && size.height && (
                          <Confetti
                            numberOfPieces={300}
                            width={size.width - 20}
                            height={size.height * 1.9}
                          />
                        )}
                        <div className="row">
                          {data.zombies.map((zombie, i) => {
                            return (
                              <div
                                key={zombie.id}
                                className="col-lg-2 col-md-4 col-sm-6 mb-3 position-relative"
                              >
                                <PreviewToken
                                  {...{
                                    ...zombie,
                                    isNew: tokens > i,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-center mt-5">
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <Link href="/#mint">
                                <a className="btn btn-warning shadow">Mint</a>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="btn btn-info text-dark shadow"
                                onClick={share}
                              >
                                <i className="fab fa-twitter"></i> Share
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </section>
            </>
          );
        })()}
      </Layout>
    </>
  );
};

export default Congrats;
