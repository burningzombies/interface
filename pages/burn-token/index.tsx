import type { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAlert } from "react-alert";
import { errorHandler } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Team", "Staking", "Liquidty"],
  datasets: [
    {
      label: "# of Votes",
      data: [1196.724, 13142.956, 7201.339],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
      ],
      borderColor: ["#000000"],
      borderWidth: 1,
      color: "#FFFFFF",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#FFFFFF",
      },
    },
  },
};

const Index: NextPage = () => {
  const alert = useAlert();

  const addBurn = async () => {
    const tokenAddress = APP.GOVERNANCE_TOKEN.CONTRACT;
    const tokenSymbol = APP.GOVERNANCE_TOKEN.SYMBOL;
    const tokenDecimals = APP.GOVERNANCE_TOKEN.DECIMAL;
    const tokenImage = `${APP.IPFS_GATEWAY}/ipfs/QmXsEP3fU5rHDuXKP2rcGLYP3XvVewfrNSpaoNTrbFHjJa`;

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) alert.success(<>Added.</>);

      // eslint-disable-next-line
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
    }
  };
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - $BURN</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="$BURN" desc="Fungible instrument for the zombies." />
      </div>
      <section className="inner-shadow zombie-bg py-5">
        <div className="container">
          <h2 className="hero-text fw-bold">Tokenomics</h2>
          <p className="text-light text-shadow">
            Zombies can use $BURN for the game, lotteries, marketplace, etc.,
            and every Zombie can yield $BURN.
          </p>
          <div className="row mt-4">
            <div className="col-lg-4">
              <Doughnut data={data} options={options} />
            </div>
            <div className="col-lg-8">
              <ul className="text-light">
                <li className="mb-3">
                  <strong>
                    Marketplace v2
                    <br />
                  </strong>
                  The release of marketplace v2 will support trading with ERC20
                  tokens, and trading will be available with the BURN token.
                </li>
                <li className="mb-3">
                  <strong>
                    Weekly Lotteries
                    <br />
                  </strong>
                  We prepared weekly lotteries for the Zombies, and zombies can
                  use BURN to join lotteries to win NFTs, AVAX, and more.
                </li>
                <li className="mb-3">
                  <strong>
                    P2E Game
                    <br />
                  </strong>
                  BURN will also be the native token for our p2e game, which
                  will be released soon!
                </li>
                <li className="mb-3">
                  <strong>
                    Farming
                    <br />
                  </strong>
                  Also, Zombies can farm the token to earn more and more...
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-7 text-center">
              <button
                onClick={addBurn}
                className="btn-sm btn w-100 btn-warning"
              >
                Add to Wallet
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
