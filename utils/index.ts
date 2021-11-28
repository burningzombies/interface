import { ethers } from "ethers";
import { request } from "graphql-request";

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
  return toTitleCase(err.data ? err.data.message : err.message);
};
