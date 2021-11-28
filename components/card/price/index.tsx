import React from "react";
import avax from "../../../assets/avax-logo.svg";
import Image from "next/image";
import { BigNumber } from "ethers";
import { parsePrice } from "../../../utils";

type Props = {
  price: BigNumber;
};

export const Price: React.FC<Props> = ({ price }) => {
  return (
    <div className="mt-2 d-flex">
      <Image
        alt="$AVAX"
        src={avax}
        width={30}
        height={30}
        className="float-start"
      />
      <span
        style={{ fontSize: "1.1rem" }}
        className="ms-2 text-shadow text-warning fw-bold"
      >
        {parsePrice(price, 2)}
      </span>{" "}
    </div>
  );
};
