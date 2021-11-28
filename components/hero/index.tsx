import React from "react";
import hero from "../../assets/hero.png";
import Image from "next/image";
import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <div className="row">
      <div className="col-lg-7 col-md-12 col-sm-12">
        <div className="d-none d-md-block d-lg-block">
          <h1 className="hero-text fw-bold">
            Zombie Alert{" "}
            <i
              className="ms-1 fas fa-exclamation"
              style={{ transform: "rotate(15deg)" }}
            ></i>
          </h1>
        </div>
        <div className="d-sm-block d-xs-block d-md-none d-lg-none">
          <h1 className="hero-text fw-bold">
            Zombies{" "}
            <i
              className="ms-1 fas fa-exclamation"
              style={{ transform: "rotate(15deg)" }}
            ></i>
          </h1>
        </div>
        <p className="mb-4 mt-3 lead text-shadow text-light">
          In total, 3,024 zombies are ready to be claimed! These zombies, which
          are unique and scary, spread from the dark sides of the Avalanche
          Network. Don&apos;t forget! Some zombies are terrifying than others!
        </p>

        <ul className="list-inline">
          <li className="list-inline-item mt-1">
            <Link href="/rarity">
              <a className="btn btn-dark shadow">Rarity</a>
            </Link>
          </li>
          <li className="list-inline-item mt-1">
            <Link href="https://docs.burningzombies.com">
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark shadow"
              >
                Litepaper
              </a>
            </Link>
          </li>
          <li className="list-inline-item mt-1">
            <Link href="/#roadmap">
              <a className="btn btn-dark shadow">Roadmap</a>
            </Link>
          </li>
          <li className="list-inline-item mt-1">
            <Link href="/#team">
              <a className="btn btn-dark shadow">Team</a>
            </Link>
          </li>
        </ul>

        <ul className="list-inline mt-4">
          <li className="list-inline-item me-4">
            <Link href="https://github.com/burningzombies">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-light text-shadow"
              >
                <i className="fab fa-2x fa-github"></i>
              </a>
            </Link>
          </li>
          <li className="list-inline-item me-4">
            <Link href="https://t.me/burning_zombies">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-light text-shadow"
              >
                <i className="fab fa-2x fa-telegram-plane"></i>
              </a>
            </Link>
          </li>
          <li className="list-inline-item me-4">
            <Link href="https://twitter.com/burning_zombies">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-light text-shadow"
              >
                <i className="fab fa-2x fa-twitter"></i>
              </a>
            </Link>
          </li>
          <li className="list-inline-item me-4">
            <Link href="https://discord.gg/xwgHsaAGBt">
              <a
                target="_blank"
                rel="noreferrer"
                className="text-light text-shadow"
              >
                <i className="fab fa-2x fa-discord"></i>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-lg-5 d-none d-lg-block text-end">
        <Image src={hero} width={550} height={550} alt="Hero Zombie" />
      </div>
    </div>
  );
};
