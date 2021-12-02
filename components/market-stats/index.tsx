import React from "react";
import { BigNumber } from "ethers";
import avax from "../../assets/avax-logo.svg";
import Image from "next/image";
import { parsePrice } from "../../utils";

type Props = {
  highestSale: BigNumber;
  totalVolume: BigNumber;
  floorPrice: BigNumber;
  reflectionBalance: BigNumber;
};

export const MarketStats: React.FC<Props> = ({
  highestSale,
  floorPrice,
  totalVolume,
  reflectionBalance,
}) => {
  return (
    <ul className="list-inline mb-0">
      <li className="ms-2 me-2 list-inline-item d-inline-flex">
        <span
          style={{ marginTop: ".1rem" }}
          className="me-2 text-uppercase small fw-bold text-light text-shadow"
        >
          Floor Price:{" "}
        </span>
        <Image alt="avax" src={avax} width={25} height={25} />
        <span className="ms-1 text-shadow text-warning fw-bold">
          {parsePrice(floorPrice)}
        </span>{" "}
      </li>
      <li className="ms-2 me-2 list-inline-item d-inline-flex">
        <span
          style={{ marginTop: ".1rem" }}
          className="me-2 text-uppercase small fw-bold text-light text-shadow"
        >
          Highest Sale:{" "}
        </span>
        <Image alt="avax" src={avax} width={25} height={25} />
        <span className="ms-1 text-shadow text-warning fw-bold">
          {parsePrice(highestSale)}
        </span>{" "}
      </li>
      <li className="ms-2 me-2 list-inline-item d-inline-flex">
        <span
          style={{ marginTop: ".1rem" }}
          className="me-2 text-uppercase small fw-bold text-light text-shadow"
        >
          Total Volume:{" "}
        </span>
        <Image alt="avax" src={avax} width={25} height={25} />
        <span className="ms-1 text-shadow text-warning fw-bold">
          {parsePrice(totalVolume)}
        </span>{" "}
      </li>
      <li className="ms-2 me-2 list-inline-item d-inline-flex">
        <span
          style={{ marginTop: ".1rem" }}
          className="me-2 text-uppercase small fw-bold text-light text-shadow"
        >
          Reflection:{" "}
        </span>
        <Image alt="avax" src={avax} width={25} height={25} />
        <span className="ms-1 text-shadow text-warning fw-bold">
          {parsePrice(reflectionBalance)}
        </span>{" "}
      </li>
    </ul>
  );
};
