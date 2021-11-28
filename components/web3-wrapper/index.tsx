import React from "react";
import { NoAccount, NoProvider, WrongChain } from "../warning";
import { States } from "../../hooks/use-web3";
import { APP } from "../../utils/consts";
import { Spinner } from "../spinner";

type Props = {
  wrapperStyle?: string;
  spinnerStyle?: string;
  onlyIcon?: boolean;
} & States;
export const Web3Wrapper: React.FC<Props> = ({
  children,
  wrapperStyle = "text-center text-light my-5",
  spinnerStyle = "text-light",
  onlyIcon = false,
  ...args
}) => {
  const icon = () => {
    return <i className="fas fa-exclamation-triangle"></i>;
  };

  if (!args.isReady) {
    return (
      <div className={wrapperStyle}>
        <Spinner color={spinnerStyle} />
      </div>
    );
  }
  if (!args.provider) {
    return (
      <div className={wrapperStyle}>{onlyIcon ? icon() : <NoProvider />}</div>
    );
  }
  if (!args.address) {
    return (
      <div className={wrapperStyle}>{onlyIcon ? icon() : <NoAccount />}</div>
    );
  }
  if (args.chainId && args.chainId !== APP.CHAIN_ID) {
    return (
      <div className={wrapperStyle}>{onlyIcon ? icon() : <WrongChain />}</div>
    );
  }
  return <>{children}</>;
};
