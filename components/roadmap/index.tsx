import React from "react";
import roadmapIMG from "../../assets/roadmap.png";
import Image from "next/image";

export const Roadmap: React.FC = () => {
  return (
    <div>
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
