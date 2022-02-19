import { ethers } from "ethers";
import { request } from "graphql-request";

export const nFormatter = (num: number, digits: number): string => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const parseTier = (
  tier: string,
  lowScore: number,
  highScore: number
): string => {
  const calc = (per: number): number => {
    const val =
      parseFloat(lowScore.toString()) +
      ((parseFloat(highScore.toString()) - parseFloat(lowScore.toString())) *
        per) /
        100;
    const parsedVal = parseFloat(val.toString());
    return parsedVal;
  };

  switch (tier) {
    case "Common": {
      return `${calc(0)},${calc(40)}`;
    }
    case "Uncommon": {
      return `${calc(40)},${calc(55)}`;
    }
    case "Rare": {
      return `${calc(55)},${calc(70)}`;
    }
    case "Super Rare": {
      return `${calc(70)},${calc(80)}`;
    }
    case "Mystic": {
      return `${calc(80)},${calc(90)}`;
    }
    case "Legendary": {
      return `${calc(90)},${calc(100.4)}`;
    }
  }
  return "0,999";
};

export const fetcher = <TData>(query: string): Promise<TData> => {
  return request(
    "https://graph.burningzombies.com/subgraphs/id/QmQW4vLrF4ZYwifBnNtaLxymYFWUQMcQYXeZS7qZETJ7H9",
    query
  );
};

export const wagmiFetcher = <TData>(query: string): Promise<TData> => {
  return request(
    "https://w-sg.neonmonsters.net/subgraphs/id/QmQW4vLrF4ZYwifBnNtaLxymYFWUQMcQYXeZS7qZETJ7H9",
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

    if (err.data.message.toLowerCase().includes("sale is not active"))
      return "The minting is not active.";

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
