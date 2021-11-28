import React from "react";
import Image from "next/image";
import nemoImage from "../../assets/nemo.png";
import avax from "../../assets/avax-logo.svg";

type Props = {
  price: number;
};
const Price: React.FC<Props> = ({ price }) => {
  return (
    <div className="d-inline mx-1">
      <Image src={avax} width={25} height={25} alt="$AVAX" />
      <span className="ms-1 fw-bold" style={{ fontSize: "1.2rem" }}>
        {price}
      </span>
    </div>
  );
};

export const NeonMonsters: React.FC = () => {
  return (
    <div className="bg-dark p-3 rounded shadow">
      <h3 className="fw-bold text-center hero-text h5 mb-4">
        <i className="fas fa-certificate"></i> You like Neon Monsters? Zombies
        are!
      </h3>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-2">
          <Image src={nemoImage} alt="Neon Monsters #0" className="rounded" />
        </div>
        <div className="col-lg-10 col-md-10 col-sm-10">
          <div className="text-light text-shadow">
            If you&apos;re a Neon Monsters minter, then you can mint Burning
            Zombies for <Price price={0.2} />. <br />
            You can claim your token{" "}
            <a
              className="link-light"
              target="_blank"
              rel="noreferrer"
              href="https://neonmonsters.net/#mint"
            >
              here
            </a>
            .
          </div>

          <div className="mt-2 text-light text-shadow">
            If you&apos;re a Neon Monsters holder, then you can mint Burning
            Zombies for <Price price={0.5} />. <br />
            You can buy your token{" "}
            <a
              className="link-light"
              target="_blank"
              rel="noreferrer"
              href="https://neonmonsters.net/marketplace"
            >
              here
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
