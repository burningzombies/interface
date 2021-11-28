import React from "react";

type Props = {
  title: string | React.ReactNode;
  desc?: string;
};

export const PageTitle: React.FC<Props> = ({ title, desc }) => {
  return (
    <div className="mb-5">
      <h1 className="fw-bold hero-text">
        {title}{" "}
        <i
          className="ms-1 fas fa-exclamation"
          style={{ transform: "rotate(15deg)" }}
        ></i>
      </h1>
      {desc && <p className="lead fw-bold text-light text-shadow">{desc}</p>}
    </div>
  );
};
