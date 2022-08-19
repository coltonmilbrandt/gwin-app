## Gwin DeFi Front End

## Getting Started

Gwin is a staking app that issues GWIN ERC-20 token rewards for staking DAI or WETH.

You can currently set up Gwin by using the Gwin Smart Contract and deploying a local Ganache instance.

Then run:

```
brownie run scripts/deploy.py --network ganache
```

The contract will deploy and send you mock tokens to use to interact with the contract.

Take note of your private key for the first wallet that Ganache spins up.

Afterwards, follow the instructions below to get the front end going. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Front End

Once you've cloned the project, use the terminal:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Interacting

Once you have the front end running, it will prompt you to connect your wallet. Use Metamask to connect with the private key of the wallet Ganache made for you and then import your tokens via the addresses Ganache deployed the mock tokens to.

Now you are ready to stake! From here on out, it's quite easy. Just enter an amount and "Stake".
