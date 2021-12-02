import React from "react";
import roadmapIMG from "../../assets/roadmap.png";
import Image from "next/image";

const renderTitle = () => {
  return (
    <div>
      <div className="d-sm-block d-xs-block d-md-none d-lg-none">
        <h2 className="hero-text fw-bold">
          Roadmap{" "}
          <i
            className="ms-1 fas fa-exclamation"
            style={{ transform: "rotate(15deg)" }}
          ></i>
        </h2>
      </div>
      <div className="d-none d-lg-block d-md-block">
        <h2 className="hero-text fw-bold">
          How is it going?{" "}
          <i
            className="ms-1 fas fa-exclamation"
            style={{ transform: "rotate(15deg)" }}
          ></i>
        </h2>
        <p className="lead fw-bold text-light text-shadow">
          Here is the known roadmap for Burning Zombies.
        </p>
      </div>
    </div>
  );
};

export const Roadmap: React.FC = () => {
  return (
    <div className="text-center">
      {renderTitle()}
      <div className="row">
        <Image
          src={roadmapIMG}
          alt="Roadmap"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};
