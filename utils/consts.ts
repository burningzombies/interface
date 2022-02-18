import type { AppConsts } from "../types";

export const APP: AppConsts = Object.freeze({
  NAME: "Burning Zombies",
  CHAIN_ID: 43114,
  IPFS_GATEWAY: "https://graph.burningzombies.com",

  PROVENANCE_CID: "QmSxjQjk1bMN2PkFm36ow45fD9DpBqCT9VVfq1Gq1rgQhw",

  GOVERNANCE_TOKEN: {
    CONTRACT: "0x9c4f88408f9f003Fb10f106E7A69989bB4f3452f",
    SYMBOL: "BURN",
    DECIMAL: 18,
  },

  MINT_START: 1645196400 * 1000,
  MINT_END: 1646060400 * 1000,

  // master
  MASTER_CONTRACT: "0x1C273Bd314958b09D78A530d68A4326ed8799F4f",
  MASTER_CONTRACT_CID: "QmbfVoymUYJGTAXvQ8JwZD7gebaYzuFMaSk9LSAabhptvh",

  // market
  MARKET_CONTRACT: "0xa0c89b8C9b49dcDaC44CDD39907778591f6be916",
  MARKET_CONTRACT_CID: "QmSqj9hoNFqqcYzdyn7XRa1XTYn22cLvLScYkNgdxaAVFe",

  // splitter
  SPLITTER_CONTRACT: "0xec8A03954243091b7Fbbd4751A48e332677CF62E",
  SPLITTER_CONTRACT_CID: "QmNNwWm1JR72adSUVgSes4JUkoXWw8prCrRXBwqYwEWhqX",

  STAKING: [
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/nemo-stake",
      CONTRACT: "0xAd147ad40290CAa8cac0B9eec399eBbc43d8b8c7",
      MASTER: "0x1b72CFde16E5a33a36eAAFbf2eb9CDEd02B09577",
      STAKING_SYMBOL: "NEMO",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/stake-1.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/nemo-v2-stake",
      CONTRACT: "0xD895EBe7CAb646AAd7b04dBcC594cf0181125B73",
      MASTER: "0xb47d3Cd10DB2f035e14163e3D96F2B2F92eB66e2",
      STAKING_SYMBOL: "NEMOv2",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/nemo-stake.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/boss-bulls-stake",
      CONTRACT: "0xEAc7b0869D4e3dab719419f6bC9c3111326182aC",
      MASTER: "0x250c53d7307cfa8aabbd58d80e9fe3c8b64748c8",
      STAKING_SYMBOL: "BBULLS",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/bossbullstake.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/sapling-stake",
      CONTRACT: "0x89029C62068ef1065ee56b91974a72e3439Fd499",
      MASTER: "0x2fe07FCD6d67141Ec36314223d63abA7b7fe90Db",
      STAKING_SYMBOL: "SAPLING",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/saplingstake.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/id/QmQ2yW9sah618DYr3cmfQQKjKW48GvB6ZDMQSr6q6bMJ47",
      CONTRACT: "0xBF9803BCcCDD2Ff604b4F8ECb41C29DA03696881",
      MASTER: "0xF2674DAa048f039E30Da9e12cB0e0879eEb02229",
      STAKING_SYMBOL: "LPASS",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/degen-stake.png",
    },
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
