import React from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { Signal } from "./signal";
import { APP } from "../../../utils/consts";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const renderDropdown = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Menu
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <Link href="/burn">
              <a
                className={`dropdown-item ${
                  router.pathname == "/burn" && "active"
                }`}
              >
                <i className="me-1 fas fa-fire"></i> Burn
              </a>
            </Link>
          </li>
          <li>
            <Link href="/loot">
              <a
                className={`dropdown-item ${
                  router.pathname == "/loot" && "active"
                }`}
              >
                <i className="me-1 fas fa-coins"></i> Loot
              </a>
            </Link>
          </li>
          <li>
            <Link href="/zombies">
              <a
                className={`dropdown-item ${
                  router.pathname == "/zombies" && "active"
                }`}
              >
                <i className="me-1 fas fa-biohazard"></i> Collection
              </a>
            </Link>
          </li>
          <li>
            <Link href="/brains">
              <a
                className={`dropdown-item ${
                  router.pathname == "/brains" && "active"
                }`}
              >
                <i className="me-1 fas fa-brain"></i> My Brains
              </a>
            </Link>
          </li>
          <li>
            <Link href="/honorary">
              <a
                className={`dropdown-item ${
                  router.pathname == "/honorary" && "active"
                }`}
              >
                <i className="me-1 fas fa-trophy"></i> Honorary
              </a>
            </Link>
          </li>
          <li>
            <Link href="/lottery">
              <a
                className={`dropdown-item ${
                  router.pathname == "/lottery" && "active"
                }`}
              >
                <i className="me-1 fas fa-dice"></i> Lottery
              </a>
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link href="/rarity">
              <a
                className={`dropdown-item ${
                  router.pathname == "/rarity" && "active"
                }`}
              >
                <i className="me-1 fas fa-square-root-alt"></i> Rarity
              </a>
            </Link>
          </li>
          <li>
            <Link href="/provenance">
              <a
                className={`dropdown-item ${
                  router.pathname == "/provenance" && "active"
                }`}
              >
                <i className="me-1 fas fa-passport"></i> Provenance
              </a>
            </Link>
          </li>
          <li>
            <Link href="/burn-token">
              <a
                className={`dropdown-item ${
                  router.pathname == "/burn-token" && "active"
                }`}
              >
                <i className="me-1 fas fa-dollar-sign"></i> BURN
              </a>
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              href="https://docs.burningzombies.com"
              target="_blank"
              rel="noreferrer"
              className="dropdown-item"
            >
              <i className="me-1 fas fa-scroll"></i> Docs
            </a>
          </li>
        </ul>
      </li>
    );
  };

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
            {APP.CHAIN_ID === 43114 ? "C-Chain" : "Fuji"}
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
              <Link href="/stake">
                <a
                  className={`nav-link ${
                    router.pathname == "/stake" && "active"
                  }`}
                >
                  Stake
                </a>
              </Link>
            </li>
            {renderDropdown()}
            <li className="nav-item">
              <Signal />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
