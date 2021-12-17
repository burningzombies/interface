import React from "react";
import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { Spinner } from "../../components/spinner";
import Image from "next/image";
import Link from "next/link";
import { useHonorary } from "../../hooks/use-honorary";

type HonoraryCardProps = {
  id: string;
  name: string;
  imageURI: string;
};
const HonoraryCard: React.FC<HonoraryCardProps> = ({ id, name, imageURI }) => {
  const title = () => {
    switch (id) {
      case "0": {
        return "Ceo of Ava Labs";
      }
      default: {
        return "Honorary";
      }
    }
  };

  const social = () => {
    switch (id) {
      case "0": {
        return (
          <div>
            <Link href="https://twitter.com/el33th4xor">
              <a className="link-light" target="_blank" rel="noreferrer">
                <i className="me-2 text-info fab fa-twitter"></i>
                <span className="small">el33th4xor</span>
              </a>
            </Link>
          </div>
        );
      }
      default: {
        return (
          <div>
            <a
              className="link-light text-decoration-none"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <i className="me-2 text-danger fas fa-times"></i>
              <span className="small">Not Social</span>
            </a>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="card bg-dark shadow">
        <Image
          alt={name}
          src={`${APP.IPFS_GATEWAY}/ipfs/${imageURI.split("ipfs://").join("")}`}
          width={512}
          height={512}
          layout="responsive"
          className="text-light card-img-top"
        />
        <div className="card-body">
          <h5 className="h5 text-truncate text-warning text-shadow fw-bold card-title">
            {name}
          </h5>
          <div className="text-light small">
            <i className="fas fa-info-circle me-1"></i> {title()}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          {social()}
        </div>
      </div>
    </>
  );
};

const Honorary: NextPage = () => {
  const { loading, data, error, isEmpty } = useHonorary();
  console.log(data);
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Honorary</title>
      </Head>
      <div className="container mt-5">
        <PageTitle
          title="Honorary"
          desc="We are glad to present honorary zombies."
        />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <div className="row">
            {(() => {
              if (loading)
                return (
                  <div className="text-center">
                    <Spinner color="text-light" />
                  </div>
                );

              if (error)
                return (
                  <div className="text-center text-light">
                    Something went wrong!
                  </div>
                );

              if (isEmpty)
                return (
                  <div className="text-center text-light">
                    Honorary zombies are not minted yet.
                  </div>
                );

              return data?.zombies.map((z) => (
                <div
                  key={z.id}
                  className="mt-4 col-lg-4 col-md-6 col-sm-12 col-xs-12"
                >
                  <HonoraryCard {...z} />
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Honorary;
