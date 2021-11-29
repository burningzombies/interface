import React from "react";
import { useWeb3 } from "../../../../hooks/use-web3";
import { useAlert } from "react-alert";

export const Signal: React.FC = () => {
  const { isReady, address } = useWeb3();
  const alert = useAlert();

  if (!isReady) {
    return (
      <a className="nav-link" title="Loading">
        <i className="fas fa-circle text-shadow text-warning"></i>
      </a>
    );
  }
  if (!address) {
    return (
      <a className="nav-link" title="Not Connected">
        <i className="fas fa-circle text-shadow text-danger"></i>
      </a>
    );
  }
  return (
    <a
      className="nav-link"
      title={address.toLowerCase()}
      onClick={() => alert.success(<>{address.toLowerCase()}</>)}
      style={{ cursor: "pointer" }}
    >
      <i className="fas fa-circle text-shadow text-success"></i>
    </a>
  );
};
