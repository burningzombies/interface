import React from "react";
import Image from "next/image";
import tahaImage from "../../assets/team/taha.jpeg";
import annaImage from "../../assets/team/anna.jpeg";
import karinImage from "../../assets/team/karin.jpeg";

const teamMembers = [
  {
    image: tahaImage,
    name: "Taha",
    title: "Developer",
  },
  {
    image: annaImage,
    name: "Anna",
    title: "NFT Artist",
  },
  {
    image: karinImage,
    name: "Karin",
    title: "Marketing",
  },
];

export const Team: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="hero-text fw-bold mb-3">
        Team{" "}
        <i
          className="ms-1 fas fa-exclamation"
          style={{ transform: "rotate(15deg)" }}
        ></i>
      </h2>
      <p className="lead fw-bold text-shadow text-light">
        Here is the team behind the project!
      </p>
      <div className="row">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="col-lg-4 mt-5 col-md-6 col-sm-6 col-xs-12"
          >
            <Image
              src={member.image}
              className="rounded-circle border border-5 border-dark"
              width={300}
              height={300}
              alt=""
            />
            <h3 className="fw-bold text-light text-shadow h4 mt-3">
              {member.name}
            </h3>
            <small className="fw-bold text-light text-shadow">
              {member.title}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
