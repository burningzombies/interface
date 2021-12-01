import { ethers } from "ethers";
import { request } from "graphql-request";

export const parseTier = (tier: string, highScore: number): string => {
  switch (tier) {
    case "Common": {
      const from = ((highScore / 100) * 0.0).toFixed(0);
      const to = ((highScore / 100) * 40).toFixed(0);
      return `${from},${to}`;
    }
    case "Uncommon": {
      const from = ((highScore / 100) * 40.0).toFixed(0);
      const to = ((highScore / 100) * 55).toFixed(0);
      return `${from},${to}`;
    }
    case "Rare": {
      const from = ((highScore / 100) * 55.0).toFixed(0);
      const to = ((highScore / 100) * 70).toFixed(0);
      return `${from},${to}`;
    }
    case "Super Rare": {
      const from = ((highScore / 100) * 70.0).toFixed(0);
      const to = ((highScore / 100) * 80).toFixed(0);
      return `${from},${to}`;
    }
    case "Mystic": {
      const from = ((highScore / 100) * 80.0).toFixed(0);
      const to = ((highScore / 100) * 90).toFixed(0);
      return `${from},${to}`;
    }
    case "Legendary": {
      const from = ((highScore / 100) * 90.0).toFixed(0);
      const to = ((highScore / 100) * 100.1).toFixed(0);
      return `${from},${to}`;
    }
  }
  return "0,999";
};

export const fetcher = <TData>(query: string): Promise<TData> => {
  return request(
    "https://api.thegraph.com/subgraphs/name/burningzombies/burning-zombies",
    query
  );
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// eslint-disable-next-line
export const checkEmptyObject = (targetObject: any): any => {
  return (
    Object.keys(targetObject).length === 0 &&
    targetObject.constructor === Object
  );
};

export const parsePrice = (
  price: ethers.BigNumber,
  decimal?: number
): string => {
  const etherPrice = ethers.utils.formatUnits(price, "ether");
  return `${Number(etherPrice.toString())
    .toFixed(decimal ? decimal : 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const parseAddress = (str: string): string => {
  const firstBlob = str.slice(0, 9);
  const secondBlob = str.slice(-9);
  return `${firstBlob}...${secondBlob}`.toLowerCase();
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line
export const errorHandler = (err: any): string => {
  if (err.data) {
    if (err.data.message.toLowerCase().includes("sale is active"))
      return "The minting is still active.";

    if (err.data.message.toLowerCase().includes("insufficient funds"))
      return "Insufficient balance.";

    if (err.data.message.toLowerCase().includes("first token already minted"))
      return "Reflection dynamics can not change right now.";

    if (err.data.message.toLowerCase().includes("invalid range"))
      return "Invalid token ID.";

    if (err.data.message.toLowerCase().includes("token does not exists"))
      return "Token not found.";

    if (
      err.data.message
        .toLowerCase()
        .includes("purchase exceeds max limit per transaction")
    )
      return "Maximum minting per transaction is exceeded.";

    if (
      err.data.message
        .toLowerCase()
        .includes("the receiver exceeds max holding amount")
    )
      return "Maximum hold amount per wallet is exceeded for receiver.";

    if (
      err.data.message
        .toLowerCase()
        .includes("purchase exceeds max supply of tokens")
    )
      return "Maximum supply of the tokens is exceeded.";

    if (
      err.data.message.toLowerCase().includes("ether value sent is not correct")
    )
      return "Invalid amount.";

    if (
      err.data.message
        .toLowerCase()
        .includes("burning exceeds max supply of tokens")
    )
      return "Maximum supply of the tokens is exceeded.";

    if (
      err.data.message
        .toLowerCase()
        .includes("burning exceeds max limit per transaction")
    )
      return "Maximum burning per transaction is exceeded.";

    if (
      err.data.message
        .toLowerCase()
        .includes("there are unclaimed or not burned tokens")
    )
      return "Loot will be available end of the burning.";

    if (
      err.data.message
        .toLowerCase()
        .includes("claim reward caller is not owner nor approved")
    )
      return "Only owner can claim rewards.";

    if (err.data.message.toLowerCase().includes("account has no shares"))
      return "This account has no shares.";

    if (err.data.message.toLowerCase().includes("account is not due payment"))
      return "There is no pending payment.";
  }

  if (err.message.toLowerCase().includes("user denied transaction signature"))
    return "Transaction cancelled.";

  return toTitleCase(err.data ? err.data.message : err.message);
};
