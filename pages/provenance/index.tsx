import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import useSWR from "swr";
import { Spinner } from "../../components/spinner";

/**
 * TODO error handler
 */

const Provenance: NextPage = () => {
  const { data } = useSWR(
    process.env.NEXT_PUBLIC_PROVENANCE_CID as string,
    (cid) =>
      fetch(`${APP.IPFS_GATEWAY}/ipfs/${cid}`).then((r) => r.json())
  );

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Provenance</title>
      </Head>
      <div className="container py-5">
        <PageTitle
          title="Provenance"
          desc="The provenance record of each zombie that ,will ever exist."
        />

        <div className="mb-5">
          <p>
            Each zombie image is firstly hashed using the SHA-256 algorithm. A
            combined string is obtained by concatenating SHA-256 of each zombie
            image in the specific order as listed below. The final proof is
            obtained by SHA-256 hashing this combined string. This is the
            conclusive provenance record stored on the smart contract.
          </p>
        </div>

        <div className="mb-4 text-truncate">
          <span className="small fw-bold text-light text-shadow text-uppercase">
            Final Proof Hash:{" "}
          </span>
          <span className="fw-bold text-dark text-shadow text-uppercase">
            {!data ? <Spinner color="text-dark" /> : data.final}
          </span>
        </div>
        <div className="hash bg-dark text-light rounded p-2 shadow">
          {!data ? (
            <div className="text-center mt-1">
              <Spinner color="text-light" />
            </div>
          ) : (
            data.hash
          )}
        </div>
      </div>
      <style jsx>{`
        .hash {
          font-size: 0.7rem;
          overflow-wrap: break-word;
          overflow-y: scroll;
          scrollbar-color: var(--bs-dark) var(--bs-light);
          height: 20.6rem;
          color: var(--bs-dark);
        }
      `}</style>
    </Layout>
  );
};

export default Provenance;
