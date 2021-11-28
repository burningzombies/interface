import React from "react";
import avalanche from "../../../assets/avalanche.png";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "../../../hooks/use-window-size";

export const Footer: React.FC = () => {
  const size = useWindowSize();

  return (
    <footer className="footer mt-auto text-light text-center">
      <div className="grass"></div>
      <div className="py-2" style={{ backgroundColor: "#231a21" }}>
        <div className="container">
          <Image
            src={avalanche}
            width={174}
            height={60}
            alt="Powered By Avalanche"
          />

          <div className="mt-3 text-start small row">
            <div className="col-lg-12" style={{ fontSize: ".6rem" }}>
              <h6
                className="fw-bold text-secondary"
                style={{ fontSize: "0.7rem" }}
              >
                CREATOR’S OWNERSHIP AND RIGHTS ON THE ART
              </h6>
              <p className="text-secondary">
                The Owner acknowledges and agrees that the Creator remains the
                sole author of the Art. The Creator owns all legal rights,
                including intellectual property rights, titles, and interests in
                and to the underlying Art. It is expressly acknowledged and
                agreed upon that the Art shall at all times remain the sole
                property of the Creator. In no event shall this License assign,
                license, or otherwise transfer any rights on the Art to the
                Owner.
              </p>
              <p className="text-secondary">
                The Creator shall have the rights to, including but not limited
                to, reproduce, adapt, modify, use, perform, display, publish,
                distribute, sale and duplicate the Art, in whole or in part, for
                any purpose whatsoever, including commercial, by any media and
                means whether now known or hereafter devised. In particular, the
                Creator shall have the right to revise, edit, manipulate, add
                to, create and exploit derivative works thereof, use or not use
                the Art, and distribute and exploit the Art in any manner and
                any medium it may choose.
              </p>
            </div>
          </div>

          <div className="row py-3">
            <div
              className={`col-lg-12 col-md-12 col-sm-12 mb-3 ${
                size.width && size.width >= 768 ? "text-start" : "text-center"
              }`}
            >
              <div
                className={`text-secondary small ${
                  size.width && size.width <= 768 && "small"
                }`}
              >
                For all inquires;{" "}
                <a
                  href="mailto:boo@burningzombies.com"
                  target="_blank"
                  rel="noreferrer"
                  className="link-secondary"
                >
                  boo[at]burningzombies.com
                </a>
                .{" "}
              </div>
            </div>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link href="/faq">
                <a className="small text-decoration-none link-secondary">
                  F.A.Q.
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/terms-of-service">
                <a className="small text-decoration-none link-secondary">
                  Terms Of Service
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/privacy-policy">
                <a className="small text-decoration-none link-secondary">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/provenance">
                <a className="small text-decoration-none link-secondary">
                  Provenance
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/rarity">
                <a className="small text-decoration-none link-secondary">
                  Rarity Scores
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="https://docs.burningzombies.com">
                <a
                  className="small text-decoration-none link-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Litepaper
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-secondary small">
          &copy; {new Date().getUTCFullYear()} burningzombies.com
        </p>
      </div>
      <style jsx>{`
        .grass {
          width: 100%;
          bottom: -150px;
          left: -100px;
          top: auto !important;
          right: 0;
          margin: auto;
          height: 300px;
          z-index: 100;
          background: transparent url(/grass.png) repeat-x;
        }
      `}</style>
    </footer>
  );
};
