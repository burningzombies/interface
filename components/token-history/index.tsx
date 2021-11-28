import React from "react";
import { BigNumber } from "ethers";
import { parsePrice } from "../../utils";
import Link from "next/link";
import Image from "next/image";
import avax from "../../assets/avax-logo.svg";

type Event = {
  id: string;
  eventType: string;
  price: BigNumber;
  from: string;
  to: string;
  date: number;
};

type Props = {
  history: Array<Event>;
};

export const TokenHistory: React.FC<Props> = ({ history }) => {
  const item = (h: Event) => {
    return (
      <tr key={h.id}>
        <td className="text-truncate">{h.eventType}</td>
        <td className="text-truncate">
          <div className="d-flex">
            <Image src={avax} width={25} height={25} alt="$AVAX" />
            <span className="ms-2">
              {h.eventType === "Minting" ? "--" : parsePrice(h.price)}
            </span>
          </div>
        </td>
        <td className="text-truncate">
          {h.from === "0x0000000000000000000000000000000000000000" ? (
            "--"
          ) : (
            <Link href={`/users/${h.from.toLowerCase()}`}>
              <a className="link-light">{h.from.slice(0, 12)}...</a>
            </Link>
          )}
        </td>
        <td className="text-truncate">
          <i className="text-secondary fas fa-arrow-right"></i>
        </td>
        <td className="text-truncate">
          {h.to === "0x0000000000000000000000000000000000000000" ? (
            "--"
          ) : (
            <Link href={`/users/${h.to.toLowerCase()}`}>
              <a className="link-light">{h.to.slice(0, 12)}...</a>
            </Link>
          )}
        </td>
        <td
          className="text-truncate"
          title={new Date(h.date * 1000).toUTCString()}
        >
          {new Date(h.date * 1000).toDateString()}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h3 className="mb-3 fw-bold text-light text-shadow">History</h3>
      <p className="text-light">Events of the token.</p>
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th style={{ width: "15%" }} scope="col">
                Event
              </th>
              <th style={{ width: "12%" }} scope="col">
                Price
              </th>
              <th style={{ width: "21%" }} scope="col">
                From
              </th>
              <th style={{ width: "6%" }} scope="col"></th>
              <th style={{ width: "21%" }} scope="col">
                To
              </th>
              <th style={{ width: "25%" }} scope="col">
                Date
              </th>
            </tr>
          </thead>
          <tbody>{history.map((h) => item(h))}</tbody>
        </table>
      </div>
    </div>
  );
};
