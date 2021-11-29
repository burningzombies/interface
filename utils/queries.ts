import { toTitleCase } from "../utils";

export const topZombie = (): string => {
  return `
    {
      zombies (first: 1, orderBy: score, orderDirection: desc) {
        score
      }
    }
  `;
};

export const collectionInfo = (): string => {
  return `{
    collection(id: 0) {
      id
      maxSupply
      totalSupply
      maxTokenMint
      maxTokenPerWallet
      currentReflection
      rate
      tokenPrice
      nextTokenId
      saleStartsAt
      saleDuration
    }
  }`;
};

export const getTraits = (): string => {
  return `
		{
			traits (orderBy: type, orderDirection: desc) {
				type
				value
				amount
        id
			}
			collection(id: 0) {
				totalSupply
			}
		}
  `;
};

export const getSingleZombie = (name: string): string => {
  return `
    {
      collection(id: 0) {
        totalSupply
      }
      zombies(where: {name: "${toTitleCase(name)}"}) {
        id
        name
        imageURI
        mintedAt
        score
        minter
        owner
        sale
        gender
        price
        desc
        attributes {
          id
          type
          value
          amount
        }
        history (orderBy: date, orderDirection: asc) {
          id
          eventType
          price
          from
          to
          date
        }
      }
    }
  `;
};

export const getUserZombies = (
  address: string,
  pageIndex: number,
  tier: string,
  background: string,
  skin: string,
  mouth: string,
  eyes: string,
  sort: string
): string => {
  let direction = "";
  let by = "";
  let where = "";
  switch (sort) {
    case "rarity-asc": {
      direction = "asc";
      by = "score";
      break;
    }
    case "rarity-desc": {
      direction = "desc";
      by = "score";
      break;
    }
    case "recently-minted": {
      direction = "desc";
      by = "mintedAt";
      break;
    }
    case "recently-listed": {
      direction = "desc";
      by = "updatedAt";
      where = "sale: true";
      break;
    }
    default: {
      direction = "asc";
      by = "mintedAt";
      break;
    }
  }

  const _tier = tier.split(",");
  const from = _tier[0];
  const to = _tier[1];

  return `
    {
      zombies (where: {${
        where ? `${where}, ` : ""
      }owner: "${address}", background_contains: "${background}", ${
    tier !== "" ? `score_lt: ${to}, score_gte: ${from} ` : ""
  }skin_contains: "${skin}", mouth_contains: "${mouth}", eyes_contains: "${eyes}" }, skip: ${
    (pageIndex - 1) * 15
  } first: 15, orderDirection: "${direction}", orderBy: "${by}") {
        id
        name
        imageURI
        mintedAt
        updatedAt
        minter
        owner
        sale
        price
        desc
        score
        attributes {
          id
          type
          value
          amount
        }
      }
      collection(id: 0) {
        totalSupply
      }
    }
  `;
};

export const getFilterableTraits = (): string => {
  return `
  {
    traits  (where: { type_in: ["Gender", "Background", "Skin", "Mouth", "Eyes"] }) {
      id
      type
      value
    }
  }
  `;
};

export const getOnSaleZombies = (
  pageIndex: number,
  gender: string,
  background: string,
  skin: string,
  mouth: string,
  eyes: string,
  sort: string
): string => {
  let direction = "";
  let by = "";
  switch (sort) {
    case "rarity-asc": {
      direction = "asc";
      by = "score";
      break;
    }
    case "rarity-desc": {
      direction = "desc";
      by = "score";
      break;
    }
    case "price-desc": {
      direction = "desc";
      by = "price";
      break;
    }
    case "price-asc": {
      direction = "desc";
      by = "price";
      break;
    }
    default: {
      direction = "desc";
      by = "updatedAt";
      break;
    }
  }

  return `
    {
      zombies (where: {sale: true, background_contains: "${background}", gender_contains: "${gender}", skin_contains: "${skin}", mouth_contains: "${mouth}", eyes_contains: "${eyes}" }, skip: ${
    (pageIndex - 1) * 15
  } first: 15, orderDirection: "${direction}", orderBy: "${by}") {
        id
        name
        imageURI
        mintedAt
        updatedAt
        minter
        owner
        sale
        price
        desc
        score
        attributes {
          id
          type
          value
          amount
        }
      }
      collection(id: 0) {
        totalSupply
      }
      marketStats(id: 0) {
        highestSale
        totalVolume
      }
      floor: zombies (where: { sale: true }, orderDirection: asc, orderBy: price, first: 1) {
        price
      }
    }
  `;
};
