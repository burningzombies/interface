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
npm install               # install dependencies
npm run dev               # start next.js development server
npm run lint && npx tsc   # lint and compile
npm run prettier          # prettier
```

## Configuring the environment

Make a copy of `env.sample` named `.env.local`

```shell
NEXT_PUBLIC_CHAIN_ID=                   # Blockchain ID
```
