import React from "react";
import { Trait } from "../../types";

type Props = {
  attrs: Array<Trait>;
  totalSupply: number;
};

export const TokenAttributes: React.FC<Props> = ({ attrs, totalSupply }) => {
  const item = (x: Trait) => {
    const score = () => {
      return (1 / (x.amount / totalSupply)).toFixed(2);
    };
    return (
      <div className="mb-4" key={x.id}>
        <div className="bg-dark rounded-top rounded-top-end small px-2 p-1 d-inline text-secondary text-shadow">
          {x.type}
        </div>
        <div className="w-100 rounded-bottom rounded-end p-2 ps-2 pe-3 bg-dark text-light">
          {x.value}
          <span className="ms-2 badge bg-danger">{score()}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="mb-3 fw-bold text-light text-shadow">Attributes</h3>
      <p>
        Token rarities come from the accessories assigned to tokens. All
        accessories used a certain ratio in the whole collection and were set
        scores by their amount. The token score is the sum of the score of the
        attributes.
      </p>
      <div className="row mt-4">
        <div className="col-lg-6">
          {attrs
            .filter((x) =>
              [
                "Background",
                "Skin",
                "Mouth",
                "Eyes",
                "Arm Accessory",
                "Nose Accessory",
                "Neck Accessory",
              ].includes(x.type)
            )
            .map((x) => item(x))}
        </div>
        <div className="col-lg-6">
          {attrs
            .filter((x) =>
              [
                "Mouth Accessory",
                "Head Accessory",
                "Face Accessory",
                "Eyes Accessory",
                "Ear Accessory",
                "Clothes",
                "Body Accessory",
              ].includes(x.type)
            )
            .map((x) => item(x))}
        </div>
      </div>
    </div>
  );
};
