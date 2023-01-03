           @@@@@@@@@@@@@@@                                        @@@@@@
        @@@@@@@@@@@@@@@@@@@@                                       @@@@
      @@@@@@,
     @@@@@@                      @@@          @@@          &@@%    %@@@      @@@@   @@@@@@@
     @@@@@                      *@@@@        @@@@@(       @@@@@    @@@@%     @@@@@@@@@@@@@@@@%
     @@@@@        @@@@@@@@@@     #@@@@      @@@@@@@      @@@@@     @@@@%     @@@@@       @@@@@
     @@@@@         @@@@@@@@@      &@@@@    @@@@ @@@@    %@@@@      @@@@%     @@@@*       #@@@@
     @@@@@@             @@@@       @@@@@  @@@@   @@@@  *@@@@       @@@@%     @@@@,       #@@@@
      @@@@@@            @@@@        @@@@@@@@@.    @@@@ @@@@        @@@@%     @@@@,       #@@@@
        @@@@@@@@@@&@@@@@@@@@         @@@@@@@%      @@@@@@@         @@@@%     @@@@,       #@@@@
           @@@@@@@@@@@@@@@@#          @@@@@@        @@@@@          @@@@.     @@@@         @@@@

# Gwin Protocol Front End

### Launch and Trade Markets with Any Price Feed

Inspired by how the best DeFi projects work at small scale and large, Gwin allows you to launch a working market with just a price feed and then let that market grow organically as interest increases. The platform algorithmically ensures best performance available, even in markets with limited liquidity. This allows you to create and confidently trade in even the most obscure and growing markets, knowing that your transactions will be executed at their best potential, without concerns about exit liquidity or costly exposure in a lopsided trade.

Check out the [smart contract](https://github.com/coltonmilbrandt/gwin-app) that can be used along with this front end.

### Want to learn more?

Check out the [full documentation.](https://coltonmilbrandt.gitbook.io/gwin/)

## Getting Started with Next.js

Follow the instructions below to get the front end going.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Front End

### Cloning the project

Use Git to clone the Gwin repository:

```bash
git clone https://github.com/coltonmilbrandt/gwin-app.git
cd gwin-protocol
```

Once you've cloned the project, use the terminal:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Deployment with Front-End and Metamask

Follow the smart contract instructions for [local deployment](https://github.com/coltonmilbrandt/gwin-protocol#local-pool-deployment-with-front-end-and-metamask)

> Note: You will need to change the local contract address for development.

## Test Net Deployment with Goerli

### Connecting to Deployed Test Contract

You can use the current contract address in the code to connect to the already deployed Goerli test contract. This is very simple, and just requires that you connect your MetaMask on the Goerli test net.

> Note: Make sure you [grab some test net ETH](https://goerlifaucet.com/) if you need it.

### Deploying Your Own Contract

Follow the smart contract instructions for [deploying contract to Goerli](https://github.com/coltonmilbrandt/gwin-protocol#running-scripts-and-deployment-on-goerli-test-net).

> Note: The Goerli address will be set to the current test contract, so make sure you change the contract address in your code. And be sure to [grab some test net ETH](https://goerlifaucet.com/) if you need it.
