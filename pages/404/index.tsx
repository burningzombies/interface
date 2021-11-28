import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";

const ErrorPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Not Found</title>
      </Head>
      <div className="container py-5">
        <PageTitle title="404" desc="You Came to the Wrong Neighborhood!" />
      </div>
    </Layout>
  );
};

export default ErrorPage;
