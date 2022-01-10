import React from "react";
import Image from "next/image";
import nemoImage from "../../assets/nemo.png";

export const NeonMonsters: React.FC = () => {
  return (
    <div className="bg-dark p-3 rounded shadow">
      <h3 className="fw-bold text-center hero-text h5 mb-4">
        <i className="fas fa-certificate"></i> You like Neon Monsters? Zombies
        are!
      </h3>
      <div className="row">
        <div className="col-lg-1 col-md-2 col-sm-2">
          <Image src={nemoImage} alt="Neon Monsters #0" className="rounded" />
        </div>
        <div className="col-lg-11 col-md-10 col-sm-10">
          <div className="text-light text-shadow">
            You can mint Burning Zombies <strong>90%</strong> discounted if
            you&apos;re a Neon Monsters minter. If not claim your token{" "}
            <a
              className="fw-bold link-light"
              target="_blank"
              rel="noreferrer"
              href="https://neonmonsters.net/#mint"
            >
              <i className="me-2 fas fa-shopping-cart"></i>
              here
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
