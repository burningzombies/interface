import React from "react";
import Image from "next/image";

type Props = {
  mintedAt: number;
  name: string;
  imageURI: string;
};

export const Profile: React.FC<Props> = ({ mintedAt, name, imageURI }) => {
  return (
    <div>
      <Image
        alt="text"
        src={`https://ipfs.burningzombies.com/ipfs/${imageURI
          .split("ipfs://")
          .join("")}`}
        width={512}
        height={512}
        layout="responsive"
        className="rounded-circle"
      />
      <div className="mt-2">{name}</div>
      <div className="mt-1 small">
        <i className="fas fa-clock me-1"></i>
        {new Date(mintedAt * 1000).toLocaleString().split(",")[0]}
      </div>
    </div>
  );
};
