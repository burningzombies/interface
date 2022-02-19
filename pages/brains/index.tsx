import React from "react";
import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { wagmiFetcher } from "../../utils";
import useSWR from "swr";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { useWeb3 } from "../../hooks/use-web3";
import { Spinner } from "../../components/spinner";
import Image from "next/image";

type Data = {
  brains: Array<{
    id: number;
    power: string;
    image: string;
    name: string;
  }>;
};

const Brains: NextPage = () => {
  const { isReady, address, provider, chainId } = useWeb3();

  const { data, error } = useSWR<Data, Error>(
    !address
      ? null
      : `{ brains(where: { owner: "${address}" }) { power id image name } }`,
    wagmiFetcher
  );

  console.log(data, error);

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - My Brains</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="My Brains" desc="Feed your zombies." />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <Web3Wrapper {...{ isReady, provider, address, chainId }}>
            <div className="row">
              {(() => {
                if (!data && !error)
                  return (
                    <div className="col-lg-12 text-center">
                      <Spinner color="text-light" />
                    </div>
                  );

                if (error)
                  return (
                    <div className="col-lg-12 text-center">
                      <span className="text-light">Error</span>
                    </div>
                  );
                if (!data || !(data.brains.length > 0))
                  return (
                    <div className="col-lg-12 text-center">
                      <span className="text-light">No Brain</span>
                    </div>
                  );

                return data.brains.map((b) => (
                  <div key={b.id} className="mb-3 col-lg-4 col-md-4">
                    <div className="card bg-dark shadow">
                      <Image
                        alt={b.name}
                        src={`${APP.IPFS_GATEWAY}/ipfs/${b.image
                          .split("ipfs://")
                          .join("")}`}
                        width={512}
                        height={512}
                        className="text-light card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="text-warning text-shadow fw-bold card-title">
                          {b.name}
                        </h5>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <div className="text-truncate text-light">
                          <span className="text-light small">
                            <i className="text-light fas fa-brain me-1"></i>
                            {b.power}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </Web3Wrapper>
        </div>
      </section>
    </Layout>
  );
};

export default Brains;
