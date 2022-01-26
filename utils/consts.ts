import type { AppConsts } from "../types";

export const APP: AppConsts = Object.freeze({
  NAME: "Burning Zombies",
  CHAIN_ID: 43114,
  IPFS_GATEWAY: "https://storage.burningzombies.com",

  PROVENANCE_CID: "QmSxjQjk1bMN2PkFm36ow45fD9DpBqCT9VVfq1Gq1rgQhw",

  GOVERNANCE_TOKEN: {
    CONTRACT: "0x9c4f88408f9f003Fb10f106E7A69989bB4f3452f",
    SYMBOL: "BURN",
    DECIMAL: 18,
  },

  // master
  MASTER_CONTRACT: "0xa9EDaf66c717808A30dfDEaf2490e3147a145fb5",
  MASTER_CONTRACT_CID: "Qmc5c3x3bdJZX6811UwRyUVViczZEL7cn3ND4Av9K4YwiG",

  // market
  MARKET_CONTRACT: "0x5500Bc936Ce36324c235e6d3bf99083B618a5F99",
  MARKET_CONTRACT_CID: "QmZ1ut4KgdcrWC8eBu9RuNF8NAsNATotd6D7xdrpRWzJ3W",

  // splitter
  SPLITTER_CONTRACT: "0x19BD1dD6A19211E9D0Ed991B25a7ed4dCCA52b45",
  SPLITTER_CONTRACT_CID: "QmRTZET28M1vh8K9XZcWoxsefcCyFSMjiJ16UeSCRRaiMw",

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
      POOL_IMAGE: "/stake/nemov2.png",
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
