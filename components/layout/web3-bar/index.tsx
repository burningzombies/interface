import React from "react";
import { useWeb3 } from "../../../hooks/use-web3";
import { APP } from "../../../utils/consts";
import { ethers } from "ethers";
import { Bar } from "./bar";

export const Web3Bar: React.FC = () => {
  const { isReady, provider, address, chainId } = useWeb3();

  const [loading, setLoading] = React.useState<boolean>(false);

  const connect = async () => {
    if (loading === true) return;
    setLoading(true);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const switchChain = async () => {
    if (loading === true) return;
    setLoading(true);

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(APP.CHAIN_ID) }],
      });
      // eslint-disable-next-line
    } catch (switchError: any) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.utils.hexlify(APP.CHAIN_ID),
              rpcUrls: [
                APP.CHAIN_ID === 43114
                  ? "https://api.avax.network/ext/bc/C/rpc"
                  : "https://api.avax-test.network/ext/bc/C/rpc",
              ],
              chainName:
                APP.CHAIN_ID === 43114
                  ? "Avalanche Network"
                  : "Avalanche Test Network",
              blockExplorerUrls: [
                APP.CHAIN_ID === 43114
                  ? "https://snowtrace.io/"
                  : "https://testnet.snowtrace.io/",
              ],
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
              },
            },
          ],
        });
        // eslint-disable-next-line
      } catch (addError: any) {
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const redirectToDownload = async () => {
    window.open("https://metamask.io/download", "_blank");
  };

  if (!isReady) return null;
  if (!provider)
    return (
      <Bar
        desc="Please, install the web3 provider."
        btnValue="Get Web3"
        fn={redirectToDownload}
        loading={loading}
      />
    );
  if (!address)
    return (
      <Bar
        desc="Please, connect to interact."
        btnValue="Connect"
        fn={connect}
        loading={loading}
      />
    );

  if (chainId && chainId !== APP.CHAIN_ID)
    return (
      <Bar
        desc={
          APP.CHAIN_ID === 43114
            ? "Please, switch to Avalanche C-Chain."
            : "Please, switch to Avalanche test network."
        }
        btnValue="Switch"
        fn={switchChain}
        loading={loading}
      />
    );
  return null;
};
