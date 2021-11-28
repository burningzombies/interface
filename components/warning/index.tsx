import React from "react";

export const NoAccount: React.FC = () => {
  return (
    <>
      <i className="fas fa-exclamation-triangle me-1"></i> You should connect an
      account to use the app.
    </>
  );
};

export const NoProvider: React.FC = () => {
  return (
    <>
      <i className="fas fa-exclamation-triangle me-1"></i> It seems like you
      have no injected web3 provider.
    </>
  );
};

export const WrongChain: React.FC = () => {
  return (
    <>
      <i className="fas fa-exclamation-triangle me-1"></i> It seems like you
      connected to the wrong chain.
    </>
  );
};
