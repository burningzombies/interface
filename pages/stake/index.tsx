import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { StakingCard } from "../../components/staking-card";

const Main: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Stake</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Stake" desc="Stake NFTs to earn BURN." />
      </div>

      <section className="inner-shadow zombie-bg py-5">
        <div className="container">
          <div className="row">
            {APP.STAKING.map((stake, index) => (
              <div
                title={stake.CONTRACT}
                key={stake.CONTRACT}
                className="col-lg-3 my-3"
              >
                <StakingCard index={index} {...stake} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Main;
