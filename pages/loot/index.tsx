import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { useWeb3 } from "../../hooks/use-web3";
import { ClaimRewards } from "../../components/claim-rewards";

const Loot: NextPage = () => {
  const {
    isReady,
    provider,
    address,
    chainId,
    masterContract,
    marketContract,
  } = useWeb3();

  const col = (node: React.ReactNode) => {
    return (
      <div className="col-lg-6 col-md-6 my-1">
        <div className="bg-dark p-3 rounded-3 shadow">{node}</div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Loot</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Loot" desc="Time to talk about money." />
      </div>
      <section className="py-5 zombie-bg inner-shadow">
        <div className="container">
          <Web3Wrapper
            {...{ isReady, provider, address, chainId }}
            wrapperStyle="text-center text-light my-5"
            spinnerStyle="text-light"
          >
            <div className="row">
              {col(
                <>
                  <h2 className="text-warning text-shadow h5 fw-bold mb-3">
                    <i className="fas fa-coins me-1"></i>Marketplace Rewards
                  </h2>
                  <p className="text-light">
                    Zombies are tradable; all trades have rewards, and it&apos;s
                    yours!
                  </p>
                  <ClaimRewards {...{ contract: marketContract }} />
                </>
              )}
              {col(
                <>
                  <h2 className="text-warning text-shadow h5 fw-bold mb-3">
                    <i className="fas fa-coins me-1"></i>Minter Rewards
                  </h2>
                  <p className="text-light">
                    All zombies hold minting rewards, grab your ax loot them!{" "}
                  </p>
                  <ClaimRewards {...{ contract: masterContract }} />
                </>
              )}
            </div>
          </Web3Wrapper>
        </div>
      </section>
    </Layout>
  );
};

export default Loot;
