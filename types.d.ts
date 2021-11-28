import { BigNumber } from "ethers";

export interface Collection {
  totalSupply: number;
  highestScore: number;
}

export interface Trait {
  id: string;
  type: string;
  value: string;
  amount: number;
}

export interface TokenHistory {
  id: string;
  eventType: string;
  from: string;
  to: string;
  price: BigNumber;
  date: number;
}

// Token type
export interface Zombie {
  id: string;
  name: string;
  imageURI: string;
  score: number;
  mintedAt: number;
  minter: string;
  owner: string;
  sale: boolean;
  price: BigNumber;
  desc: string;
  gender: string;
  attributes: Array<Trait>;
  history: Array<TokenHistory>;
}
