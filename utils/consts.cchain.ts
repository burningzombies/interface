
export const APP = {
	NAME: "Burning Zombies",
	CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string),
	IPFS_GATEWAY: "https://storage.burningzombies.com",

	PROVENANCE_CID: "QmcD5fjjsUArKKj1f1a2Lp7Pzz2HSXizJyY2xMfkQuGdNZ",

	GOVERNANCE_TOKEN: {
		CONTRACT: "0x2017E625a7661F65Dd5Ee0a61C1B84d601212131",
		SYMBOL: "BURN",
		DECIMAL: 18,
	},

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
	LOTTERY_START: 1641810048,
	LOTTERY_DURATION: 60 * 60,
	LOTTERY_CONTRACT: "0x403DbaD44413073BdbB9646599759027E1bB8fB8",
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
				"https://api.thegraph.com/subgraphs/name/burningzombies/firat-nft-stake",
			CONTRACT: "0x0942EC098A73808f0d9dD3aB4d0386061C7AdDfE",
			MASTER: "0xa9e188f2ba1421f0e65e7ddf2f6cef289399d66c",
			STAKING_SYMBOL: "FIRAT_NFT",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-7.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/apa-stake",
			CONTRACT: "0x22ee215Ae7e9c8Ea342f5e32BB6a8A78a64184e8",
			MASTER: "0xccafd2e9116add05290c914a93936b02c2f4411f",
			STAKING_SYMBOL: "APA",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-3.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/police-stake",
			CONTRACT: "0x49ab01b1bB6d1D1adE640EEb65e27c225E7584A4",
			MASTER: "0x3ba5cFB6A3a96FF12249E159025A466325587416",
			STAKING_SYMBOL: "POLICE",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-POLICE.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/avaxape-stake",
			CONTRACT: "0xcc85bBF7A8B8F31DfC69E020D77BDC138DCe1E1C",
			MASTER: "0x18796BAB2ee9199e7d146A99b44673f6B5BB125b",
			STAKING_SYMBOL: "AVAXAPE",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-APE.png",
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
				"https://api.thegraph.com/subgraphs/name/burningzombies/punk-stake",
			CONTRACT: "0xBfB37e560922D7A27f308398879045E54dc7a020",
			MASTER: "0xA2EEa5A9a38C1c28bE679570EAA2dae7859Bfe7b",
			STAKING_SYMBOL: "PUNK",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-2.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/chikn-stake",
			CONTRACT: "0x9180cc90deabE260800AA6bc94C7aC3a6C62bC2F",
			MASTER: "0xDd5ADB41a06AfaBA631aBd67ba47Ee9fC9141dD7",
			STAKING_SYMBOL: "chikn",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-chikn.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/tbc-stake",
			CONTRACT: "0xAb180d16eE96f6ABCC80098fe0E9C7926790F397",
			MASTER: "0x867edFE02469f30D31Ee735D0460Fa6b05da53a3",
			STAKING_SYMBOL: "TBC",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-4.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/seal-stake",
			CONTRACT: "0x621FE0C3e5B3e98AA05ecf5B098B29B1225009F2",
			MASTER: "0x6d0A8b280d76d22bB43970D1e732457cB84f0B77",
			STAKING_SYMBOL: "SEAL",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-5.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/hro-stake",
			CONTRACT: "0xa6069C1e050a14a6A418dA2824aB688cB1D7444A",
			MASTER: "0x012f775f5aCc604A5E3cd997c24a9F268d65De8A",
			STAKING_SYMBOL: "HRO",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-6.png",
		},
		{
			SUBGRAPH:
				"https://api.thegraph.com/subgraphs/name/burningzombies/bigjoes-stake",
			CONTRACT: "0xc78a1fe0BC20daa5ea07b016068618eDBa1305C3",
			MASTER: "0xE9Be3540f2Cba0f8beF035C93d48a300f84534D0",
			STAKING_SYMBOL: "BIGJOES",
			REWARDS_SYMBOL: "BURN",
			POOL_IMAGE: "/stake/stake-BIGJOES.png",
		},
	],

	STAKE_CONTRACT_CID: "QmWwvvcX1nnr67SYiE8FB3RQ9TRxpgJsbjhUytU8VNfJn3",
};
