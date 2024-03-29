import React from "react";
import Image from "next/image";
import developerImage from "../../assets/team/developer.jpeg";
import designerImage from "../../assets/team/designer.jpeg";
import comManagerImage from "../../assets/team/com-manager.jpeg";
import marketingImage from "../../assets/team/marketing.jpeg";

const teamMembers = [
  {
    image: developerImage,
    name: "Taha",
    title: "Developer",
    links: [
      {
        icon: "fab fa-github",
        href: "https://github.com/root36x9",
      },
      {
        icon: "fab fa-telegram",
        href: "https://t.me/root36x9",
      },
    ],
  },
  {
    image: designerImage,
    name: "Anna",
    title: "NFT Artist",
    links: [
      {
        icon: "fab fa-vk",
        href: "https://vk.com/suchkovaanna",
      },
      {
        icon: "fab fa-telegram",
        href: "https://t.me/sui_ann",
      },
    ],
  },
  {
    image: marketingImage,
    name: "It's Your Time",
    title: "Marketing",
    links: [
      {
        icon: "fas fa-globe",
        href: "https://itsyourtime.pt/",
      },
    ],
  },
  {
    image: comManagerImage,
    name: "Hardcore NFTs",
    title: "Community Manager",
    links: [
      {
        icon: "fab fa-twitter",
        href: "https://twitter.com/HardcoreNfts",
      },
    ],
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
            className="col-lg-3 mt-5 col-md-6 col-sm-6 col-xs-12"
          >
            <Image
              src={member.image}
              className="rounded-circle w-100 border border-5 border-dark"
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
            <ul className="list-inline mt-2">
              {member.links.map((p, i) => (
                <li className="list-inline-item" key={i}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={p.href}
                    className="text-light text-shadow"
                  >
                    <i className={p.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <span className="text-light text-shadow">
            Burning Zombies is an open-source NFT collection.{" "}
            <a
              className="link-light"
              href="https://github.com/burningzombies/"
              target="_blank"
              rel="noreferrer"
            >
              Let&apos;s build together!
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
