import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";
import { Balance } from "../../../components/balance";
import Image from "next/image";
import avaware from "../../../assets/avaware.jpg";
import yetiswap from "../../../assets/yetiswap.jpg";
import penguin from "../../../assets/penguin.png";
import pangolin from "../../../assets/pangolin.png";
import joe from "../../../assets/joe.jpg";
import maxi from "../../../assets/maxi.jpg";
import hurricane from "../../../assets/hurricane.jpg";
import qi from "../../../assets/qi.svg";
import avalaunch from "../../../assets/avalaunch.jpg";
import nemo from "../../../assets/nemo.png";

type Props = {
  masterContract: Contract | undefined | null;
  address: string | undefined | null;
};
export const Info: React.FC<Props> = ({ address, masterContract }) => {
  const [maxTokenPerWallet, setMaxTokenPerWallet] = React.useState<
    number | undefined
  >();
  const [segmentNo, setSegmentNo] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const maxTokenPerWallet = (
          await masterContract.MAX_TOKEN_PER_WALLET()
        ).toNumber();

        const segmentSize = (await masterContract.segmentSize()).toNumber();
        const totalSupply = (await masterContract.totalSupply()).toNumber();
        const segmentNo_ = (totalSupply / segmentSize).toString();
        const segmentNo = parseInt(segmentNo_);

        if (isMounted) {
          setMaxTokenPerWallet(maxTokenPerWallet);
          setSegmentNo(segmentNo);
        }
      } catch {
        setMaxTokenPerWallet(undefined);
        setSegmentNo(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  const renderMaxTokenPerWallet = () => {
    return maxTokenPerWallet ? (
      <strong>
        <Balance {...{ masterContract, owner: address }} />/{maxTokenPerWallet}
      </strong>
    ) : (
      <Spinner color="text-light" />
    );
  };

  const renderSegment = () => {
    return typeof segmentNo !== "undefined" ? (
      <div className="mt-5 w-100">
        <div className="mb-3 text-center text-shadow">
          {(() => {
            if (segmentNo === 0)
              return (
                <div>
                  <div>
                    <i className="fas fa-hashtag me-1"></i>Neon Monsters Round
                  </div>
                  <p>It&apos;s mintable 90% discounted for every 10 $NEMO.</p>
                </div>
              );

            if (segmentNo > 0 && segmentNo < 5)
              return (
                <div className="mb-5">
                  <div className="mb-2">
                    <i className="fas fa-hashtag me-1"></i>NFT Round
                  </div>
                  <p>
                    It&apos;s mintable 10% discounted if you&apos;re holder of
                    partnered tokens.
                  </p>
                </div>
              );

            if (segmentNo > 4 && segmentNo < 9)
              return (
                <div className="mb-5">
                  <div className="mb-2">
                    <i className="fas fa-hashtag me-1"></i>DeFi Round
                  </div>
                  <p>
                    It&apos;s mintable 10% discounted if you&apos;re holder of
                    partnered tokens.
                  </p>
                </div>
              );

            return null;
          })()}
        </div>
        <div className="" style={{ marginLeft: `${segmentNo * 11.2}%` }}>
          <i className="fa-2x fas fa-map-pin text-shadow"></i>
        </div>
        <div
          className="progress shadow mb-3 bg-dark"
          style={{ height: "2.5rem" }}
        >
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: "11.2%" }}
            aria-valuenow={22}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="text-center mt-1">
              <Image
                src={nemo}
                width={30}
                height={30}
                className="rounded-circle border border-dark border-1"
                alt="Neon Monsters"
              />
            </div>
          </div>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "44.4%" }}
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Image
                  src={avaware}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Avaware"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={avalaunch}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Avalaunch"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={pangolin}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Pangolin"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={penguin}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Penguin Finance"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={qi}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="BenQi"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={hurricane}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Hurricane Swap"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={maxi}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Maximizer"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={yetiswap}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Yeti"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={joe}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Trader Joe"
                />
              </li>
            </ul>
          </div>
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: "44.4%" }}
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Image
                  src={avaware}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Avaware"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={avalaunch}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Avalaunch"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={pangolin}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Pangolin"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={penguin}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Penguin Finance"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={qi}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="BenQi"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={hurricane}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Hurricane Swap"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={maxi}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Maximizer"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={yetiswap}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Yeti"
                />
              </li>
              <li className="list-inline-item">
                <Image
                  src={joe}
                  width={30}
                  height={30}
                  className="rounded-circle border border-dark border-1"
                  alt="Trader Joe"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center">
        <Spinner color="text-light" />
      </div>
    );
  };

  return (
    <div>
      <ul className="list-unstyled mb-0">
        <li>
          <span className="small">
            ** Maximum {renderMaxTokenPerWallet()} zombies can collect for this
            wallet.
          </span>
        </li>
      </ul>
      {renderSegment()}
    </div>
  );
};
