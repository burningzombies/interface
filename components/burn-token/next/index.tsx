import React from "react";
import { Spinner } from "../../spinner";

type Props = {
  loading: boolean;
};

export const BurnNext: React.FC<Props> = ({ loading }) => {
  return (
    <button
      role="button"
      type="submit"
      className="w-100 btn btn-dark text-warning shadow"
    >
      {loading ? (
        <Spinner color="text-warning" />
      ) : (
        <>
          <i className="fas fa-fire me-2"></i>Burn
        </>
      )}
    </button>
  );
};
