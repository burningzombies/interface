import { APP as FUJI_CONSTS } from "./consts.fuji";
import { APP as CCHAIN_CONSTS } from "./consts.cchain";

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

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);

let APP: ObjectType;

if (chainId === 43113) APP = FUJI_CONSTS;
if (chainId === 43114) APP = CCHAIN_CONSTS;

export { APP };
