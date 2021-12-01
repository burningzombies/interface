import type { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { useWeb3 } from "../../hooks/use-web3";
import avax from "../../assets/avax-logo.svg";
import Image from "next/image";
import { parsePrice, parseAddress, errorHandler } from "../../utils";
import { ethers, BigNumber, Contract } from "ethers";
import { Spinner } from "../../components/spinner";
import { useAlert } from "react-alert";

const Withdraw: NextPage = () => {
  const alert = useAlert();
  const { isReady, signer, provider, address, chainId } = useWeb3();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [splitter, setSplitter] = React.useState<Contract | undefined | null>();
  const [released, setReleased] = React.useState<BigNumber | undefined>();
  const [shares, setShares] = React.useState<number | undefined>();
  const [pendingPayment, setPendingPayment] = React.useState<
    BigNumber | undefined
  >();

  const releasePayment = async () => {
    if (!splitter || !address || loading) return;
    setLoading(true);

    try {
      const tx = await splitter.release(address);
      await tx.wait();

      alert.success(<>Thanks for your hard work!</>);
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert.error(<>{errorHandler(err)}</>);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!signer || !address) return;

      try {
        const splitterABIResponse = await fetch(
          `${APP.IPFS_GATEWAY}/ipfs/${APP.SPLITTER_CONTRACT_CID}`
        );

        const splitterContract = new ethers.Contract(
          APP.SPLITTER_CONTRACT,
          await splitterABIResponse.json(),
          signer
        );

        const released = await splitterContract.released(address);
        const shares = (await splitterContract.shares(address)).toNumber();
        const pendingPayment = await splitterContract.pendingPayment(address);

        if (isMounted) {
          setSplitter(splitterContract);
          setReleased(released);
          setShares(shares);
          setPendingPayment(pendingPayment);
        }
      } catch {
        setSplitter(null);
      }
    };
    init();
    const interval = setInterval(() => init(), 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [loading, signer, address]);

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Withdraw</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Withdraw" desc="Pending payments for payees." />
      </div>
      <section className="py-5 zombie-bg inner-shadow">
        <div className="container">
          <Web3Wrapper
            {...{ isReady, provider, address, chainId }}
            wrapperStyle="text-center text-light my-5"
            spinnerStyle="text-light"
          >
            <div className="row mb-4">
              <div className="col-lg-12 col-md-6 my-1">
                <div className="d-inline-flex">
                  <span className="h5 mt-2 me-3 text-shadow text-light fw-bold">
                    Pending Payment:
                  </span>{" "}
                  <>
                    <Image
                      alt="$AVAX"
                      src={avax}
                      width={30}
                      height={30}
                      className="float-start"
                    />
                    <span className="h5 mt-2 ms-2 text-shadow text-light fw-bold">
                      {pendingPayment ? (
                        parsePrice(pendingPayment)
                      ) : (
                        <Spinner color="text-light" />
                      )}
                    </span>
                  </>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 col-md-6 mb-3">
                <div className="bg-info p-3 rounded-3 shadow">
                  <p className="small">
                    <span className="d-block mb-3 fw-bold">
                      Want to build with us?
                    </span>
                    If you are interested in crypto and NFTs, please reach us;{" "}
                    <a
                      className="link-dark"
                      href="mailto:boo@burningzombies.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      boo@burningzombies.com
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="col-lg-7 col-md-6 mb-3">
                <ul className="list-inline">
                  <li className="list-inline-item me-3">
                    <span className="text-light fw-bold text-shadow">
                      <i className="fas fa-percent me-2"></i>
                      {typeof shares !== "undefined" ? (
                        shares
                      ) : (
                        <Spinner color="text-light" />
                      )}
                    </span>
                  </li>
                  <li
                    className="list-inline-item"
                    title={address ? address : "..."}
                  >
                    <span className="text-light fw-bold text-shadow">
                      <i className="fab fa-ethereum me-2"></i>
                      {parseAddress(address ? address : "...")}
                    </span>
                  </li>
                </ul>
                <div className="mb-3">
                  <button onClick={releasePayment} className="btn btn-dark">
                    {loading ? <Spinner color="text-light" /> : <>Release</>}
                  </button>
                </div>
                <div className="d-flex">
                  <Image src={avax} width={25} height={25} alt="$AVAX" />
                  <span className="text-light small fst-italic ms-1">
                    <strong>
                      {released ? (
                        parsePrice(released)
                      ) : (
                        <Spinner color="text-light" />
                      )}
                    </strong>{" "}
                    already released.
                  </span>
                </div>
              </div>
            </div>
          </Web3Wrapper>
        </div>
      </section>
    </Layout>
  );
};

export default Withdraw;
