import React from "react";
import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";

const Giveaway: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Giveaway</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Giveaway" desc="Let's roll dice!" />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <div className="text-light text-center">
            There is no active giveaway.
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Giveaway;
