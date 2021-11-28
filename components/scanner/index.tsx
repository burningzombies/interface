import React from "react";
import { Zombie } from "../../types";
import { Profile } from "./profile";
import { Ownership } from "./ownership";
import { Attributes } from "./attributes";
import { OverallRarity } from "../overall-rarity";
import QRCode from "react-qr-code";
import { APP } from "../../utils/consts";
import Image from "next/image";
import snowtraceLogo from "../../assets/snowtrace.svg";

type Props = {
  className?: string;
} & Zombie;

const renderModalTitle = () => {
  return (
    <div className="modal-header border-bottom border-secondary">
      <div className="d-md-block d-lg-block d-none">
        <h5
          className="modal-title text-warning text-shadow"
          id="exampleModalLabel"
        >
          <i className="fas me-1 fa-qrcode"></i> Zombie Scanner
        </h5>
      </div>
      <div className="d-xs-block d-sm-block d-md-none d-lg-none">
        <h5
          className="modal-title text-warning text-shadow"
          id="exampleModalLabel"
        >
          <i className="fas me-1 fa-qrcode"></i> Scanner
        </h5>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        <i className="fas fa-times-circle"></i>
      </button>
    </div>
  );
};

const renderModalFooter = (tokenId: string) => {
  return (
    <div className="modal-footer border-top border-secondary">
      <button
        data-bs-dismiss="modal"
        aria-label="Close"
        type="button"
        className="btn btn-sm btn-secondary"
      >
        Close
      </button>
      <a
        target="_blank"
        rel="noreferrer"
        href={
          APP.CHAIN_ID === 43113
            ? `https://snowtrace.io/token/${APP.MASTER_CONTRACT}?a=${tokenId}`
            : `https://testnet.snowtrace.io/token/${APP.MASTER_CONTRACT}?a=${tokenId}`
        }
        type="button"
        className="btn btn-sm btn-light"
      >
        <div className="d-line mt-1">
          <Image
            src={snowtraceLogo}
            width={140}
            height={25}
            alt="Snowtrace Logo"
          />
        </div>
      </a>
    </div>
  );
};

export const Scanner: React.FC<Props> = ({
  className = "btn btn-warning btn-sm",
  ...zombie
}) => {
  const renderModal = () => {
    return (
      <div
        className="modal fade text-start"
        id={`z${zombie.id}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-dark">
            {renderModalTitle()}
            <div className="modal-body text-shadow text-light">
              <div className="row">
                <div className="col-lg-3 col-md-3 text-center">
                  <Profile
                    {...{
                      mintedAt: zombie.mintedAt,
                      name: zombie.name,
                      imageURI: zombie.imageURI,
                    }}
                  />
                  <div className="mt-3 mb-3">
                    <div className="shadow d-inline py-4 border border-4 rounded border-warning">
                      <QRCode
                        value={`https://snowtrace.io/address/${encodeURIComponent(
                          zombie.owner.toLowerCase()
                        )}`}
                        size={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9">
                  <Ownership
                    {...{ minter: zombie.minter, owner: zombie.owner }}
                  />
                  <Attributes
                    {...{ attributes: zombie.attributes, name: zombie.name }}
                  />
                  <OverallRarity {...{ score: zombie.score }} />
                  <p className="small">
                    {zombie.desc
                      .split(
                        "These zombies, which are unique and scary, spread from the dark sides of the Avalanche Network. "
                      )
                      .join("")}
                  </p>
                </div>
              </div>
            </div>
            {renderModalFooter(zombie.id)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className={className}
        role="button"
        data-bs-toggle="modal"
        data-bs-target={`#z${zombie.id}`}
      >
        <i className="fas fa-search"></i>
      </button>
      {renderModal()}
    </>
  );
};
