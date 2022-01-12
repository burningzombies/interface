import type { AppConsts } from "../types";

export const APP: AppConsts = Object.freeze({
  NAME: "Burning Zombies",
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string),
  IPFS_GATEWAY: "https://storage.burningzombies.com",

  PROVENANCE_CID: "QmcD5fjjsUArKKj1f1a2Lp7Pzz2HSXizJyY2xMfkQuGdNZ",

  GOVERNANCE_TOKEN: {
    CONTRACT: "",
    SYMBOL: "",
    DECIMAL: 0,
  },

  // master
  MASTER_CONTRACT: "0xEa2184765Fb2c4254106a1D999ed2eD481d9b702",
  MASTER_CONTRACT_CID: "Qmc5c3x3bdJZX6811UwRyUVViczZEL7cn3ND4Av9K4YwiG",

  // market
  MARKET_CONTRACT: "0xC1D8AE4310eF5ff2C5A0242c9FC993E7C06c7f85",
  MARKET_CONTRACT_CID: "QmZ1ut4KgdcrWC8eBu9RuNF8NAsNATotd6D7xdrpRWzJ3W",

  // splitter
  SPLITTER_CONTRACT: "0x54810A0a5A5Ebf50F922D74e13ADA36D5D8c9e54",
  SPLITTER_CONTRACT_CID: "QmRTZET28M1vh8K9XZcWoxsefcCyFSMjiJ16UeSCRRaiMw",

  // Lottery consts
  LOTTERY_START: 0,
  LOTTERY_DURATION: 0,
  LOTTERY_CONTRACT: "",
  LOTTERY_CONTRACT_CID: "",

  STAKING: [
    {
      SUBGRAPH: "",
      CONTRACT: "",
      MASTER: "",
      STAKING_SYMBOL: "ZOMBIE",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/stake-0.png",
    },
  ],

  STAKE_CONTRACT_CID: "",
});
