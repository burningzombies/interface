import type { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import burnGif from "../../assets/burn.png";
import Image from "next/image";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { BurnToken } from "../../components/burn-token";

const desc = (): React.ReactNode => {
  return (
    <p className="mt-3 text-light">
      There are unclaimed tokens that prevent you from your rewards. You can
      purge them and help the community with reward distribution. Everything is
      in your hand. Let&apos;s clean weak and unwanted bitches?
    </p>
  );
};

const Burn: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Burn</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Purge" desc="You're in the heart of the zombies." />
      </div>
      <section className="zombie-bg py-5 inner-shadow">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-3">
              <Image
                src={burnGif}
                alt="Burn"
                className="rounded shadow"
                layout="responsive"
              />
            </div>

            <div className="col-lg-8">
              <BurnToken />
              {desc()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Burn;
