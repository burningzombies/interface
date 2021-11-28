import React from "react";

type RoadmapItem = {
  icon: string;
  title: string;
  desc: string;
};

const roadmapItems: Array<RoadmapItem> = [
  {
    icon: "fas fa-shopping-cart",
    title: "Minting",
    desc: "Zombies awaken! The minting is limited by time, and you need to be careful not to miss it. Mint will be available for everyone, but there will be something special for Neon Monsters holders and minters. Check litepaper for more information.",
  },
  {
    icon: "fas fa-fire",
    title: "Burning",
    desc: "Nothing can go forever! When minting is finished, there may be zombies which are not controllable (unclaimed). Our task is as a community to burn them. Also, to claim rewards and start the market, we have to burn all unminted zombies.",
  },
  {
    icon: "fas fa-store",
    title: "Marketplace",
    desc: "If we could reach here, it means all zombies are claimed, and we are safe, but what will we do with them? Slavery! People who have zombies are able to sell them. Or maybe someone who wants to collect them, they can buy!",
  },
  {
    icon: "fas fa-parachute-box",
    title: "Burner Rewards",
    desc: "Everyone cares about minters or holders, but nobody about burners! Not anymore! They are our heroes. We collected our minting rewards because of them. We were also able to trade our zombies because of them! Time to reward them.",
  },
];

export const Roadmap: React.FC = () => {
  return (
    <div>
      <h2 className="hero-text fw-bold">
        Roadmap{" "}
        <i
          className="ms-1 fas fa-exclamation"
          style={{ transform: "rotate(15deg)" }}
        ></i>
      </h2>
      <div className="row mt-5">
        {roadmapItems.map((x, i) => (
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={i}>
            <div className="bg-secondary shadow p-3 rounded">
              <h3 className="text-light h6 fw-bold mb-2">
                <i className={`me-2 ${x.icon}`}></i>
                {x.title}
              </h3>
              <p className="text-light small">{x.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
