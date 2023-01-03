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
Look through [the FAQs](https://coltonmilbrandt.gitbook.io/gwin/faqs)

## Key Features

-   Launch markets quickly with any price feed
-   Trade efficiently in any market, even low-interest ones
-   Act as a market maker and earn profits by maintaining balance in the protocol
-   Avoid systemic risk with a unique approach to settlement and market making
-   Connect to the platform via a simple front end and MetaMask

### Types of Trades on Gwin

Users can execute "trades" on Gwin by depositing funds into their desired pool. Each pool represents a position, which can be long, short, or stable. Trades can be entered and exited at any time.

Users can earn profits by correctly predicting the price movements of the underlying asset. If the price of the underlying asset moves in the direction that the user predicted, the user will realize a profit. If the price moves against the user's prediction, the user will realize a loss. Alternatively, users can deposit to a stable pool to preserve their funds and while making markets.

Users can also earn profits by acting as market makers and maintaining balance in the protocol. If a pool is underweight compared to its target ratio, users can deposit funds into the underweight pool and receive a better risk-to-reward ratio in return for acting as market makers for the overweight pool. This helps to maintain balance in the protocol and create a dynamic for efficient markets.

For more information about trading on Gwin, check out the documentation for [trading on Gwin](https://coltonmilbrandt.gitbook.io/gwin/features/trade).

## Getting Started with Next.js

Follow the instructions below to get the front end going.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Front End

### Cloning the project

Use Git to clone the Gwin repository:

```bash
git clone https://github.com/coltonmilbrandt/gwin-app.git
cd gwin-app
```

Once you've cloned the project, use the terminal:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Deployment with Metamask

Follow the smart contract instructions for [local deployment](https://github.com/coltonmilbrandt/gwin-protocol#local-pool-deployment-with-front-end-and-metamask)

> Note: You will need to change the local contract address in the front end code for development.

## Goerli Test Net Deployment with MetaMask

### Connecting to the Current Goerli Test Contract

You can use the current contract address in the code to connect to the already deployed Goerli test contract. This is very simple, and just requires that you connect your MetaMask via the Goerli test net.

1. Launch front-end with `yarn dev` and connect your MetaMask wallet.

    > Note: Make sure you use a test wallet and are connected to the Goerli test net!

2. Now you can Deposit and Withdraw to pools ([see how trading works](https://coltonmilbrandt.gitbook.io/gwin/features/trade)). Keep in mind that without market forces at work, it's easy to create interesting scenarios that otherwise wouldn't naturally arise with other traders participating and taking advantage of underweight (high health) pools. Read more about this in [the documentation](https://coltonmilbrandt.gitbook.io/gwin/technical-details/how-pools-are-settled). Also note that you can create pools as well. Read about that [right here](https://coltonmilbrandt.gitbook.io/gwin/technical-details/creating-a-new-market). You have a chance to earn some test net ETH if you make some good trades!

> Note: Make sure you [grab some test net ETH](https://goerlifaucet.com/) if you need it.

### Deploying Your Own Contract

Follow the smart contract instructions for [deploying contract to Goerli](https://github.com/coltonmilbrandt/gwin-protocol#running-scripts-and-deployment-on-goerli-test-net).

> Note: The Goerli address will be set to the current test contract, so make sure you change the contract address in your code. And be sure to [grab some test net ETH](https://goerlifaucet.com/) if you need it.

## Technical Details

Gwin is built on top of the Ethereum blockchain and utilizes smart contracts for its core logic. The front end is built with Next.js and connects to the smart contracts via Web3.

The core of Gwin's approach to market making and settlement is its use of paired pools and risk tranching. Paired pools are created for each market, and the risk of each pool is redistributed through tranches. This enables users to take positions with different risk profiles, such as cooled pools with reduced volatility and heated pools with higher potential for gain at the risk of increased potential for loss.

For more information on the technical details of Gwin, check out the [full documentation](https://coltonmilbrandt.gitbook.io/gwin/technical-details/).

## Status

Gwin is currently in alpha and is undergoing active development. While it is functional, there may be some bugs and issues that have not yet been addressed.

The smart contracts for Gwin have not yet been formally audited and should not be used for main net applications at this time.

If you encounter any issues or have any questions about Gwin, please don't hesitate to [contact me](#contact-me).

## Contributing

We welcome contributions to Gwin! Here are a few ways you can help:

-   Report bugs and suggest features by opening an issue on GitHub.
-   Contribute code by opening a pull request on GitHub.
-   Help to improve the documentation by submitting updates and corrections.

# Contact Me

-   Have questions?
-   Need some help setting up?
-   Want to contribute?

### Email me at coltonmilbrandt@gmail.com!

### Check out my website [www.coltonmilbrandt.com](https://coltonmilbrandt.com/)

## Learn More About Gwin

Read the [full docs](https://coltonmilbrandt.gitbook.io/gwin/) to learn more.
