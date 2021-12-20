export const APP = Object.freeze({
  NAME: process.env.NEXT_PUBLIC_NAME as string,
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string),
  MASTER_CONTRACT: process.env.NEXT_PUBLIC_MASTER_CONTRACT as string,
  MARKET_CONTRACT: process.env.NEXT_PUBLIC_MARKET_CONTRACT as string,
  IPFS_GATEWAY: "https://storage.burningzombies.com",
  MASTER_CONTRACT_CID: process.env.NEXT_PUBLIC_MASTER_CONTRACT_CID as string,
  MARKET_CONTRACT_CID: process.env.NEXT_PUBLIC_MARKET_CONTRACT_CID as string,
  SPLITTER_CONTRACT: process.env.NEXT_PUBLIC_SPLITTER_CONTRACT as string,
  SPLITTER_CONTRACT_CID: process.env
    .NEXT_PUBLIC_SPLITTER_CONTRACT_CID as string,
  LOTTERY_CONTRACT: process.env.NEXT_PUBLIC_LOTTERY_CONTRACT as string,
  LOTTERY_CONTRACT_CID: process.env
    .NEXT_PUBLIC_LOTTERY_CONTRACT_CID as string,
});
