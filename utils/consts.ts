export interface ObjectType {
  NAME: string;
  CHAIN_ID: number;
  IPFS_GATEWAY: string;
  PROVENANCE_CID: string;
  MASTER_CONTRACT: string;
  MASTER_CONTRACT_CID: string;

  MARKET_CONTRACT: string;
  MARKET_CONTRACT_CID: string;

  SPLITTER_CONTRACT: string;
  SPLITTER_CONTRACT_CID: string;

  LOTTERY_START: number;
  LOTTERY_DURATION: number;
  LOTTERY_CONTRACT: string;
  LOTTERY_CONTRACT_CID: string;

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

export const APP: ObjectType = {
  NAME: "Burning Zombies",
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string),
  IPFS_GATEWAY: "https://storage.burningzombies.com",

  PROVENANCE_CID: "QmcD5fjjsUArKKj1f1a2Lp7Pzz2HSXizJyY2xMfkQuGdNZ",

  // master
  MASTER_CONTRACT: "0x15Ee4A7a3f9DCe5ABc2Ca40B37729B5d872e90Ef",
  MASTER_CONTRACT_CID: "QmNMaAt1AWbArV9iGrhhsX9Rg8zpkyZZTr5pnmTBtpwwVA",

  // market
  MARKET_CONTRACT: "0x90C5C950aC7767C3c4F4BF02f4De88dc44E79cf5",
  MARKET_CONTRACT_CID: "QmRSZZEy1hPcCvCRJSmZNNgGxbwzPNbi4LjEVpgW2GgiyD",

  // splitter
  SPLITTER_CONTRACT: "0xE70b9a060785daE17bF8A9f3CdA200e2c7267EBa",
  SPLITTER_CONTRACT_CID: "Qma1u4176xtvBGQS7hemgtDX4PZiFBFZVJiUvRDgoDHVcj",

  // Lottery consts
  LOTTERY_START: 1640958130,
  LOTTERY_DURATION: 60 * 60,
  LOTTERY_CONTRACT: "0x13fAEA45Ac96E4c2EAC0aFc24b0493aB1b30b4d7",
  LOTTERY_CONTRACT_CID: "QmPs248QR8LTps4bQ9FnwVR9e6E2uFSYfAMFnp4RzTRFCz",

  STAKING: [
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/zombie-stake",
      CONTRACT: "0xBA96E075D88644d885e760e5Ac1C9e25A6De8D85",
      MASTER: "0x15Ee4A7a3f9DCe5ABc2Ca40B37729B5d872e90Ef",
      STAKING_SYMBOL: "ZOMBIE",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/stake-0.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/nemo-stake",
      CONTRACT: "0x40ef07b5e0D5895343a0Df6F92cEC872F9fdF439",
      MASTER: "0x5A01ca6cfA4d8a9152E93Da820dA195553Dba3D0",
      STAKING_SYMBOL: "NEMO",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/stake-1.png",
    },
    {
      SUBGRAPH:
        "https://api.thegraph.com/subgraphs/name/burningzombies/firat-nft-stake",
      CONTRACT: "0x0942EC098A73808f0d9dD3aB4d0386061C7AdDfE",
      MASTER: "0xa9e188f2ba1421f0e65e7ddf2f6cef289399d66c",
      STAKING_SYMBOL: "FIRAT_NFT",
      REWARDS_SYMBOL: "BURN",
      POOL_IMAGE: "/stake/stake-7.png",
    },
  ],

  STAKE_CONTRACT_CID: "QmWwvvcX1nnr67SYiE8FB3RQ9TRxpgJsbjhUytU8VNfJn3",
};
