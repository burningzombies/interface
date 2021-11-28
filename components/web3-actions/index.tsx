import React from "react";
import { List } from "./list";
import { CancelListing } from "./cancel-listing";
import { Buy } from "./buy";
import { useWeb3 } from "../../hooks/use-web3";
import { Web3Wrapper } from "../web3-wrapper";
import { Spinner } from "../spinner";
import { BigNumber } from "ethers";

type Props = {
  size: string;
  owner: string;
  sale: boolean;
  tokenId: string;
  price: BigNumber;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const Web3Actions: React.FC<Props> = ({
  tokenId,
  price,
  sale,
  owner,
  size,
  mutate,
}) => {
  const {
    isReady,
    provider,
    address,
    chainId,
    masterContract,
    marketContract,
  } = useWeb3();
  const [isOwner, setIsOwner] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (!address) return;
    if (address.toLowerCase() === owner.toLowerCase()) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, owner]);

  return (
    <Web3Wrapper
      {...{ isReady, provider, address, chainId }}
      wrapperStyle="text-start text-light m-0"
      spinnerStyle="text-light"
      onlyIcon={true}
    >
      {(() => {
        switch (isOwner) {
          case true: {
            if (sale) {
              return (
                <CancelListing {...{ size, tokenId, marketContract, mutate }} />
              );
            } else {
              return (
                <List
                  {...{ size, tokenId, masterContract, marketContract, mutate }}
                />
              );
            }
          }
          case false: {
            if (sale) {
              return (
                <Buy {...{ size, tokenId, price, marketContract, mutate }} />
              );
            } else {
              return (
                <Buy
                  {...{
                    disabled: true,
                    size,
                    tokenId,
                    price,
                    marketContract,
                    mutate,
                  }}
                />
              );
            }
          }
          default: {
            return <Spinner color="text-light" />;
          }
        }
      })()}
    </Web3Wrapper>
  );
};
