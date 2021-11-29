import React from "react";

type Props = {
  defaultValue: string;
};

export const ByRarity: React.FC<Props> = ({ defaultValue }) => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-6 my-1">
      <select className="form-select" name="tier" defaultValue={defaultValue}>
        <option value="">- Tier -</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Super Rare">Super Rare</option>
        <option value="Mystic">Mystic</option>
        <option value="Legendary">Legendary</option>
      </select>
    </div>
  );
};
