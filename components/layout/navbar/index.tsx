import React from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { Signal } from "./signal";
import { APP } from "../../../utils/consts";

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="py-3 navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link href="/">
          <a>
            <Image
              src={logo}
              width={69}
              height={80}
              alt="Burning Zombies Logo"
            />
          </a>
        </Link>
        <div className="d-none d-md-block d-lg-block ms-2 position-relative">
          <Link href="/">
            <a className={`text-light text-shadow navbar-brand fw-bold`}>
              Burning Zombies
            </a>
          </Link>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {APP.CHAIN_ID === 43114 ? "Mainnet" : "Fuji"}
            <span className="visually-hidden">Blockchain</span>
          </span>
        </div>
        <div className="d-sm-block d-xs-block d-md-none d-lg-none position-relative">
          <Link href="/">
            <a className={`text-light text-shadow navbar-brand fw-bold`}>
              Zombies
            </a>
          </Link>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {APP.CHAIN_ID === 43114 ? "Mainnet" : "Fuji"}
            <span className="visually-hidden">Blockchain</span>
          </span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/#story">
                <a className="nav-link">Story</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#mint">
                <a className="nav-link">Mint</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/marketplace">
                <a
                  className={`nav-link ${
                    router.pathname == "/marketplace" && "active"
                  }`}
                >
                  Marketplace
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/graveyard">
                <a
                  className={`nav-link ${
                    router.pathname == "/graveyard" && "active"
                  }`}
                >
                  Graveyard
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/burn">
                <a
                  className={`nav-link ${
                    router.pathname == "/burn" && "active"
                  }`}
                >
                  Burn
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/loot">
                <a
                  className={`nav-link ${
                    router.pathname == "/loot" && "active"
                  }`}
                >
                  Loot
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Signal />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
