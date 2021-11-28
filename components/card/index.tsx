import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zombie } from "../../types";
import { RarityTag } from "../rarity-tag";
import { Scanner } from "../scanner";
import { Price } from "./price";
import { Web3Actions } from "../web3-actions";
import { TransferToken } from "../transfer-token";

type Props = {
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const Card: React.FC<Zombie & Props> = ({ mutate, ...zombie }) => {
  return (
    <>
      <div className="card bg-dark shadow">
        <Link
          href={`/zombies/${encodeURIComponent(zombie.name.toLowerCase())}`}
        >
          <a>
            <Image
              alt={zombie.name}
              src={`https://ipfs.burningzombies.com/ipfs/${zombie.imageURI
                .split("ipfs://")
                .join("")}`}
              width={512}
              height={512}
              layout="responsive"
              className="text-light card-img-top"
            />
          </a>
        </Link>
        <div className="card-body">
          <h5 className="float-start h4 text-warning text-shadow fw-bold card-title">
            <Link
              href={`/zombies/${encodeURIComponent(zombie.name.toLowerCase())}`}
            >
              <a className="link-warning text-decoration-none text-truncate">
                {zombie.name}
              </a>
            </Link>
          </h5>
          <ul className="list-inline mb-0 float-end text-end">
            <li className="list-inline-item me-2">
              <TransferToken
                {...{
                  from: zombie.owner,
                  tokenId: zombie.id,
                  className: "btn btn-sm btn-warning text-dark",
                  mutate,
                }}
              />
            </li>
            <li className="list-inline-item me-2">
              <Scanner {...zombie} />
            </li>
          </ul>
          <div className="mt-5 text-light">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <RarityTag {...{ score: zombie.score }} />
              </li>
            </ul>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Web3Actions
            {...{
              size: "btn-sm",
              owner: zombie.owner,
              sale: zombie.sale,
              tokenId: zombie.id,
              price: zombie.price,
              mutate,
            }}
          />
          {zombie.sale ? (
            <Price {...{ price: zombie.price }} />
          ) : (
            <div className="mt-2">
              <span className="text-shadow text-danger fw-bold">
                Not for sale
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
