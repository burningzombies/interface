import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { APP } from "../utils/consts";

export interface States {
  provider: ethers.providers.Web3Provider | boolean | undefined;
  isReady: boolean;
  signer?: ethers.Signer | null | undefined;
  address: string | null | undefined;
  chainId: number | null | undefined;
  masterContract?: ethers.Contract | null | undefined;
  marketContract?: ethers.Contract | null | undefined;
}

export const useWeb3 = (): States => {
  const [provider, setProvider] = useState<States["provider"]>(undefined);
  const [signer, setSigner] = useState<States["signer"]>(undefined);
  const [address, setAddress] = useState<States["address"]>(undefined);
  const [chainId, setChainId] = useState<States["chainId"]>(undefined);

  const [masterContract, setMasterContract] =
    useState<States["masterContract"]>(undefined);
  const [marketContract, setMarketContract] =
    useState<States["marketContract"]>(undefined);

  useEffect(() => {
    let isMounted = true;
    const handler = (accounts: Array<string>) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
      } else {
        setAddress(null);
      }
    };
    if (window.ethereum) {
      const init = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (isMounted) {
          setProvider(provider);
          setSigner(signer);
        }

        try {
          const address = await signer.getAddress();

          const chainId = await signer.getChainId();

          const masterContractABIResponse = await fetch(
            `${APP.IPFS_GATEWAY}/ipfs/${APP.MASTER_CONTRACT_CID}`
          );
          const marketContractABIResponse = await fetch(
            `${APP.IPFS_GATEWAY}/ipfs/${APP.MARKET_CONTRACT_CID}`
          );

          const masterContract = new ethers.Contract(
            APP.MASTER_CONTRACT,
            await masterContractABIResponse.json(),
            signer
          );
          const marketContract = new ethers.Contract(
            APP.MARKET_CONTRACT,
            await marketContractABIResponse.json(),
            signer
          );
          if (isMounted) {
            setAddress(address);
            setChainId(chainId);
            setMasterContract(masterContract);
            setMarketContract(marketContract);
          }
        } catch (err) {
          setAddress(null);
          setChainId(null);
          setMasterContract(null);
          setMarketContract(null);
        }
      };
      init();
      window.ethereum.on("accountsChanged", handler);
    } else {
      setProvider(false);
      setSigner(null);
      setAddress(null);
      setChainId(null);
      setMasterContract(null);
      setMarketContract(null);
    }

    return () => {
      isMounted = false;
      window.ethereum
        ? window.ethereum.removeListener("accountsChanged", handler)
        : null;
    };
  }, [address]);

  const isReady = () => {
    return (
      typeof provider !== "undefined" &&
      typeof signer !== "undefined" &&
      typeof address !== "undefined" &&
      typeof masterContract !== "undefined" &&
      typeof marketContract !== "undefined" &&
      typeof chainId !== "undefined"
    );
  };

  return {
    provider,
    isReady: isReady(),
    signer,
    address,
    chainId,
    masterContract,
    marketContract,
  };
};
