import type { NextPage } from "next";
import React, { useState } from "react";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";
import { useAlert } from "react-alert";
import { Spinner } from "../../components/spinner";
import { ethers, BigNumber, Contract } from "ethers";
import { parsePrice, errorHandler } from "../../utils";
import avax from "../../assets/avax-logo.svg";
import Image from "next/image";
import { Web3Wrapper } from "../../components/web3-wrapper";
import { useWeb3 } from "../../hooks/use-web3";
import { useAvax } from "../../hooks/use-avax";

enum LotteryState {
  OPEN,
  CLOSED,
}

const Lottery: NextPage = () => {
  const alert = useAlert();
  const { isReady, signer, provider, address, chainId } = useWeb3();

  const { mutate, loading: fiatLoading, price, error: fiatError } = useAvax();

  const [lottery, setLottery] = useState<Contract | null | undefined>();
  const [lotteryState, setLotteryState] = useState<LotteryState | undefined>();
  const [tickets, setTickets] = useState<number | undefined>();
  const [prize, setPrize] = useState<BigNumber | undefined>();
  const [lengthOf, setLengthOf] = useState<number | undefined>();
  const [fee, setFee] = useState<BigNumber | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | undefined>();
  const [timeDone, setTimeDone] = useState<number>(0);

  const participate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!lottery || !address || loading || !fee) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const numberOfTickets = formData.get("numberOfTickets") as string;
    const amountToPay = fee.mul(BigNumber.from(numberOfTickets));

    try {
      const tx = await lottery.participate(numberOfTickets, {
        value: amountToPay,
      });
      await tx.wait();

      setLoading(false);
      alert.success(<>Good Luck!</>);
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
        const abi = await fetch(
          `${APP.IPFS_GATEWAY}/ipfs/${APP.LOTTERY_CONTRACT_CID}`
        );
        const lottery = new ethers.Contract(
          APP.LOTTERY_CONTRACT,
          await abi.json(),
          signer
        );
        if (isMounted) setLottery(lottery);

        const lotteryState = await lottery.lotteryState();
        if (isMounted) setLotteryState(lotteryState);

        const tickets = await lottery.tickets(address);
        if (isMounted) setTickets(tickets.toNumber());

        const prize = await lottery.prize();
        if (isMounted) setPrize(prize);

        const lengthOf = await lottery.lengthOf();
        if (isMounted) setLengthOf(lengthOf.toNumber());

        const fee = await lottery.fee();
        if (isMounted) setFee(fee);

        const winner = await lottery.winner();
        if (isMounted) setWinner(winner);

        mutate();
      } catch {
        setLottery(null);
      }
    };

    init();

    const calculateTime = () => {
      const start = 1640111811;
      const end = start + 60 * 60 * 18;
      const current = Math.floor(new Date().getTime() / 1000);

      const timeDone = 100 - ((end - current) / (end - start)) * 100;
      const result = end - current > 0 ? parseInt(timeDone.toFixed(0)) : 100;
      if (isMounted) setTimeDone(result);
    };

    calculateTime();
    const interval = setInterval(() => calculateTime(), 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [mutate, signer, address, loading]);

  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Lottery</title>
      </Head>
      <div className="container mt-5">
        <PageTitle title="Lottery" desc="Let's roll dice!" />
      </div>
      <section className="zombie-bg inner-shadow py-5">
        <div className="container">
          <Web3Wrapper
            {...{
              isReady,
              provider,
              address,
              chainId,
              wrapperStyle: "text-center text-light my-0",
            }}
          >
            {(() => {
              if (lottery === null || lotteryState === LotteryState.CLOSED)
                return (
                  <div className="text-center text-light">
                    <div className="mb-3">
                      There is no active lottery, please try again later.
                    </div>
                    <h4 className="h6 fw-bold">
                      Recent Winner:{" "}
                      {typeof winner !== "undefined" ? (
                        winner
                      ) : (
                        <Spinner color="text-light" />
                      )}
                    </h4>
                    <div className="d-inline-flex">
                      <span className="h5 mt-2 me-3 text-shadow text-light fw-bold">
                        Recent Prize:
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
                          {typeof prize !== "undefined" ? (
                            <>
                              {parsePrice(prize)}
                              {(() => {
                                if (fiatLoading)
                                  return <Spinner color="text-light" />;

                                if (fiatError)
                                  return (
                                    <span className="text-light">Error</span>
                                  );

                                return (
                                  <span className="ms-2">
                                    ≈
                                    <i className="ms-2 me-1 fas fa-dollar-sign"></i>
                                    {(
                                      parseInt(parsePrice(prize)) *
                                      price["avalanche-2"].usd
                                    ).toFixed(2)}
                                  </span>
                                );
                              })()}
                            </>
                          ) : (
                            <Spinner color="text-light" />
                          )}
                        </span>
                      </>
                    </div>
                  </div>
                );

              return (
                <div className="row mb-4">
                  <div className="col-lg-12 col-md-6 my-1">
                    <div className="d-inline-flex">
                      <span className="h5 mt-2 me-3 text-shadow text-light fw-bold">
                        Prize:
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
                          {typeof prize !== "undefined" ? (
                            <>
                              {parsePrice(prize)}
                              {(() => {
                                if (fiatLoading)
                                  return <Spinner color="text-light" />;

                                if (fiatError)
                                  return (
                                    <span className="text-light">Error</span>
                                  );

                                return (
                                  <span className="ms-2">
                                    ≈
                                    <i className="ms-2 me-1 fas fa-dollar-sign"></i>
                                    {(
                                      parseInt(parsePrice(prize)) *
                                      price["avalanche-2"].usd
                                    ).toFixed(2)}
                                  </span>
                                );
                              })()}
                            </>
                          ) : (
                            <Spinner color="text-light" />
                          )}
                        </span>
                      </>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-3 my-2">
                    <form className="row mb-2" onSubmit={participate}>
                      <div className="col-lg-12 mb-3">
                        <div className="d-inline mx-2" title="Participants">
                          <span className="text-light">
                            <i className="fas fa-users me-1"></i>
                            {typeof lengthOf !== "undefined" ? (
                              lengthOf
                            ) : (
                              <Spinner color="text-light" />
                            )}
                          </span>
                        </div>
                        <div className="d-inline mx-2" title="Your Tickets">
                          <span className="text-light">
                            <i className="fas fa-ticket-alt me-1"></i>
                            {typeof tickets !== "undefined" ? (
                              tickets
                            ) : (
                              <Spinner color="text-light" />
                            )}
                          </span>
                        </div>
                        <div className="d-inline-flex mx-2" title="Ticket Fee">
                          <span className="text-light">
                            <Image
                              src={avax}
                              width={22}
                              height={22}
                              alt="$AVAX"
                            />
                            <span className="ms-2">
                              {typeof fee !== "undefined" ? (
                                parsePrice(fee)
                              ) : (
                                <Spinner color="text-light" />
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 mb-3">
                        <div
                          title={`${100 - timeDone}% left`}
                          className="progress bg-dark shadow"
                          style={{ height: "2.35rem" }}
                        >
                          <div
                            className="progress-bar bg-warning text-dark fw-bold"
                            role="progressbar"
                            style={{
                              width: `${timeDone}%`,
                            }}
                            aria-valuenow={timeDone}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {100 - timeDone}% left
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 mb-3">
                        <div className="input-group">
                          <span className="input-group-text bg-dark text-light border-dark">
                            <i className="fas fa-ticket-alt"></i>
                          </span>
                          <input
                            name="numberOfTickets"
                            type="number"
                            min={1}
                            max={30}
                            className="form-control shadow"
                            defaultValue={1}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 mb-3">
                        <button
                          role="submit"
                          className="btn shadow btn-danger w-100"
                        >
                          {loading ? (
                            <Spinner color="text-light" />
                          ) : (
                            <>Claim Ticket(s)</>
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="p-3 bg-secondary rounded w-100 shadow mb-3 mt-5">
                      <h6 className="small fw-bold text-light">
                        <i className="me-1 fas fa-info-circle"></i> How Does It
                        Work?
                      </h6>
                      <p className="text-light small">
                        The smart contract picks the winner by providing seed
                        between the whole participants. Buying more tickets
                        increases your chance to win. The calculation is not
                        between unique wallet addresses.
                      </p>
                      <ul className="list-unstyled my-3">
                        <li>
                          <span className="small text-light">
                            <i className="mx-2 fas fa-caret-right"></i>100% of
                            the ticket fees are going to add to the prize.
                          </span>
                        </li>
                        <li>
                          <span className="small text-light">
                            <i className="mx-2 fas fa-caret-right"></i> The
                            prize will transfer to the winner&apos;s wallet
                            directly.
                          </span>
                        </li>
                      </ul>
                      <div className="text-light text-truncate small fst-italic">
                        <i className="fas fa-file me-2"></i>
                        Contract:{" "}
                        {lottery ? (
                          <a
                            href={`https://${
                              chainId === 43114 ? "" : "testnet."
                            }snowtrace.io/address/${lottery.address}`}
                            rel="noreferrer"
                            className="link-light text-truncate"
                            target="_blank"
                          >
                            {lottery.address}
                          </a>
                        ) : (
                          <Spinner color="text-light" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Web3Wrapper>
        </div>
      </section>
    </Layout>
  );
};

export default Lottery;
