import type { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import Image from "next/image";
import Link from "next/link";
import lottery from "../../assets/lottery.png";

type Props = {
  image: StaticImageData | string;
  title: string;
  href: string;
};

const Card: React.FC<Props> = ({ image, title, href }) => {
  return (
    <div className="card bg-dark text-light shadow">
      <Link href={href}>
        <a className="link-light text-decoration-none">
          <Image
            src={image}
            width={512}
            height={256}
            className="card-img-top"
            alt={title}
          />
          <div className="card-body">
            <h5 className="text-truncate card-title m-0 fw-bold h6">
              Lottery #0
            </h5>
          </div>
        </a>
      </Link>
    </div>
  );
};

const Main: NextPage = () => {
  const lotteries = () => {
    return [
      <Card
        key={Math.random()}
        image={lottery}
        title="Lottery #0"
        href="/lottery/0"
      />,
    ];
  };

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Lotteries</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Lottery" desc="Here is the lotteries!" />
      </div>

      <section className="inner-shadow zombie-bg py-5">
        <div className="container">
          <div className="row">
            {lotteries().map((node, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 my-3">
                {node}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Main;
