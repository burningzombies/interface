import React from "react";

type Props = {
  minter: string;
  owner: string;
};

export const Ownership: React.FC<Props> = ({ owner, minter }) => {
  return (
    <ul className="list-unstyled">
      <li className="text-truncate">
        <span className="text-uppercase small text-secondary">Minter:</span>{" "}
        <a className="text-decoration-none link-light">
          {minter.toLowerCase()}
        </a>
      </li>
      <li className="text-truncate">
        <span className="text-uppercase small text-secondary">Owner:</span>{" "}
        <a className="text-decoration-none link-light">{owner.toLowerCase()}</a>
      </li>
    </ul>
  );
};
