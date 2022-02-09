import { BigNumber } from "ethers";

export interface AppConsts {
  NAME: string;
  CHAIN_ID: number;
  IPFS_GATEWAY: string;
  PROVENANCE_CID: string;
  MASTER_CONTRACT: string;
  MASTER_CONTRACT_CID: string;

  MINT_START: number;
  MINT_END: number;

  MARKET_CONTRACT: string;
  MARKET_CONTRACT_CID: string;

  SPLITTER_CONTRACT: string;
  SPLITTER_CONTRACT_CID: string;

  GOVERNANCE_TOKEN: {
    CONTRACT: string;
    SYMBOL: string;
    DECIMAL: number;
  };

  STAKING: Array<{
    SUBGRAPH: string;
    CONTRACT: string;
    MASTER: string;
    STAKING_SYMBOL: string;
    REWARDS_SYMBOL: string;
    POOL_IMAGE: string;
  }>;
  STAKE_CONTRACT_CID: string;
}

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
