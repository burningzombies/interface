# Burning Zombies Interface

An open-source interface for Burning Zombies, powered by Avalanche.

- Website: [burningzombies.com/](https://burningzombies.com)
- Telegram: [Burning Zombies](https://t.me/burning_zombies)
- Discord: [Burning Zombies](https://discord.gg/xwgHsaAGBt)
- Twitter: [@burning_zombies](https://twitter.com/burning_zombies)
- Docs: [Litepaper](https://docs.burningzombies.com)

## Accessing the Interface

- Prod [burningzombies.com](https://burningzombies.com/).
- Development [develop.burningzombies.com](https://develop.burningzombies.com/).

## Development

```shell
npm install             # install dependencies
npm run dev             # start next.js development server
npm run lint && npx tsc # lint and compile
npm run prettier        # prettier
```

## Configuring the environment

Make a copy of `env.sample` named `.env.local`

```shell
NEXT_PUBLIC_PROVENANCE_CID=""       	# provenance hash ipfs CID
NEXT_PUBLIC_MASTER_CONTRACT_CID=""  	# NFT contract's ABI CID
NEXT_PUBLIC_MARKET_CONTRACT_CID=""  	# Marketplace contract's ABI CID
NEXT_PUBLIC_NAME="Burning Zombies"  	# Application title
NEXT_PUBLIC_CHAIN_ID=               	# Blockchain ID
NEXT_PUBLIC_MASTER_CONTRACT=""      	# Contract address
NEXT_PUBLIC_MARKET_CONTRACT=""      	# Market contract address
NEXT_PUBLIC_SPLITTER_CONTRACT=""			# Splitter contract address
NEXT_PUBLIC_SPLITTER_CONTRACT_CID=""	# Splitter contract's ABI CID
```
