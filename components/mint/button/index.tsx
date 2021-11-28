import React from "react";
import { Spinner } from "../../spinner";

type Props = {
  loading: boolean;
};

export const MintButton: React.FC<Props> = ({ loading }) => {
  return (
    <button role="submit" className="btn shadow btn-lg btn-danger w-100">
      {loading ? <Spinner color="text-light" /> : <>Mint</>}
    </button>
  );
};
