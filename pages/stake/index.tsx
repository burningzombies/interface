import type { NextPage } from "next";
import { ReactNode } from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import stake0 from "../../assets/stake-0.png";
import stake1 from "../../assets/stake-1.png";
import stake2 from "../../assets/stake-2.png";
import stake3 from "../../assets/stake-3.png";
import stake4 from "../../assets/stake-4.png";
import stake5 from "../../assets/stake-5.png";
import stake6 from "../../assets/stake-6.png";
import stake7 from "../../assets/stake-7.png";
import Image from "next/image";
import Link from "next/link";

const Main: NextPage = () => {
  const renderCol = (
    img: StaticImageData,
    t1: string,
    t2: string,
    rewardToken: string,
    href: string | null,
    reward: string,
    end: string
  ): ReactNode => {
    return (
      <div className="col-lg-3 my-3">
        <div className="card bg-dark text-light shadow">
          <Image src={img} className="card-img-top" alt={`${t1}/${t2}`} />
          <div className="card-body">
            <h5 className="card-title fw-bold h6">
              {t1}
              <small>/{t2}</small>
            </h5>
            <ul className="small mt-3 m-0 list-unstyled">
              <li className="mb-2">
                <i className="fas fa-coins me-2"></i>
                {reward}{" "}
                <span style={{ fontSize: "0.7rem" }}>{rewardToken}</span>
              </li>
              <li>
                <i className="fas fa-file-signature me-2"></i>Ends at {end}
              </li>
            </ul>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            {href === null ? (
              <a className="btn disabled btn-secondary btn-sm w-100">Soon...</a>
            ) : (
              <Link href={href}>
                <a className="btn btn-warning btn-sm w-100">Stake</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

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
            {renderCol(
              stake0,
              "ZOMBIE",
              "TBA",
              "TBA",
              "/stake/ZOMBIE",
              "TBA",
              "01/01/2023"
            )}
            {renderCol(stake2, "PUNK", "TBA", "TBA", null, "TBA", "TBA")}
            {renderCol(stake7, "FIRAT_NFT", "TBA", "TBA", null, "TBA", "TBA")}
            {renderCol(stake3, "APA", "TBA", "TBA", null, "TBA", "TBA")}
            {renderCol(
              stake1,
              "NEMO",
              "TBA",
              "TBA",
              "/stake/NEMO",
              "TBA",
              "01/01/2023"
            )}
            {renderCol(stake4, "TBC", "TBA", "TBA", null, "TBA", "TBA")}
            {renderCol(stake5, "SEAL", "TBA", "TBA", null, "TBA", "TBA")}
            {renderCol(stake6, "HRO", "TBA", "TBA", null, "TBA", "TBA")}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Main;
