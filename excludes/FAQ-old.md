---
sidebar_position: 7
---

# FAQ



## About zkLink

> **Q. What is zkLink?**

zkLink is a trustless chain-to-chain DEX based on zero-knowledge technology.

As the bridging component among isolated chains and layer2 networks, zkLink makes it possible for native assets on separate ecos to interoperate and pair with each other.

Suppose that traders are able to swap from SRM on Solana for CAKE on BSC within 45 seconds, and developers will be provided with zkLink SDK for their users to enjoy fast cross chain swapping without leaving their platforms: this all happens in a secure, fast, cost-friendly experience, when zkLink adopts recursive SNARKs to guarantee the validity of cross-chain transactions.

> **Q. What product features can zkLink offer?**

As a trustless chain-to-chain liquidity transfer station of DeFi-verse, zkLink functions as the "connector" between separate public chains, providing users with DEX scenarios utilizing cross-chain assets in a time/monetary-cost friendly manner. zkLink v1 has following features:

1. **"one-click" swapping** with assets which are native for projects of separate ecological types and public chains. For example, users can swap UNI on Ethereum for CAKE on BSC via zkLink at one stop, and achieve instant finality of transactions.
2. **L2 StableSwap**: "one-click" stablecoin swapping on different chains or of different kinds, with a stablecoin-specialized AMM curve and negligible slippage. For example, on zkLink's Layer2 network, users can not only transfer their USDT on Ethereum (ERC-20) to BSC (BEP-20), but also swap their USDT on Ethereum to USDC on BSC.
3. **Fast Cross Chain Swap**: zkLink provides fast cross-chain transaction service for some pairs, where traders can enjoy chain interoperability on Layer1 without depositing tokens to zkLink Layer2 in advance.
4. **Widget & SDK**: a brand new deposit channel for third-party DeFi projects by offering visualization component, which developers can easily access. With zkLink widget settled, users can play with third-party DeFi with any kinds of assets from any public chains, such as Vaults, Lending, etc.

In addition, users can provide liquidity for cross-chain pairs to earn transaction fees.

> **Q. How should I choose between *Swap* and *Fast Cross Chain Swap*?**

These two products are designed to meet different kinds of user needs.
- If you are new to zkLink, or if you are in a rush but have no sufficient deposit on Layer2 wallet, ***Fast Cross Chain Swap*** would be a better choice, since it is more convenient (fewer steps) and much faster.
- If your assets are already on Layer2 wallet, or if you wish to complete your cross-chain transaction at the lowest cost, *Swap* suits you well. It's also quite easy to operate comparing to other methods: you get your target tokens, and can withdraw your money to Layer1 within several minutes.


> **Q. What are the fees for using zkLink's cross-chain swapping?**

Users pay 0.3% of the sum as transaction fees: 0.25% goes directly to liquidity providers, and the rest are used for R&D. For ZKL holders, we will exempt part of transaction fees in forms of subsidies or direct discount. In addition, users pay the gas fee, which is typically very low for the following two reasons: firstly, since zkLink batches a certain number of transactions into one, and all users share this gas fee; secondly, the gas fee on Layer2 is 0.

## About technology

> **Q. How zkLink achieve chain interoperability.**

zkLink connects separate Layer1 networks with a Layer2 network, so that tokens belonging to different ecosystems can be directly swapped with each other freely on this second layer, without an intermediate token. The Layer2 network will generate zero-knowledge proofs of the off-chain state on a regular basis and upload them to respective Layer1 contracts for verification. Users will see the pairs that have never been seen before, such as: CAKE-SUSHI, BNB-HT, BUNNY-COW, etc.

*More technical details will be disclosed upon mainnet launch.*

> **Q. What are the competitive edges of the technology zkLink applies.**

The competitive edges of zkLink are achieved by: "Fast Cross Chain Swap" and "Zero Knowledge Technology".

  - **Sleekest token cross-chain experience**

    + Traders can now directly exchange one token to any kinds from any chains, with only "**one click**".
    + Different from other chain-interoperation platforms where users get stable-coins or mapping assets on the target chain, on zkLink they receive their target tokens, **saving much time & effort**.  
    + **Friendly user experience** in aspects of learning cost, mental cost, time cost, and monetary cost.

  - **Security and validity**

    + zkLink achieves the same **security level** as Ethereum Layer1.
    + Zero knowledge guarantees that nobody, including the platform, can play maliciously and users can retrieve tokens losslessly in any extreme cases, and that **cross-chain transactions are always valid**.
    + Even the total data loss of zkLink can not endanger capital safety when users can always **roll back** their account states based on Layer1 data under all circumstances.

  - **Decentralization and non-custody**

    + Free from restriction or authentication.
    + Users no longer have to "give out" the control of assets and private keys to exchanges instead they will have full custody over their funds: a true sense of "token ownership."

> **Q. How are security and privacy guaranteed when using zkLink.**

zkLink's layer2 could achieve the same security level as Ethereum Layer1, and this is assured by the adoption of zero-knowledge. The Layer2 network will generate zero-knowledge proofs of the off-chain state on a regular basis and upload them to respective Layer1 contracts for verification, making sure that the transaction is correctly approved and signed by users and the account balance on Layer1 (the mainchain) is correctly updated. In this way, the security of assets and transactions is guaranteed by cryptography rather than game theory and economic models, meaning that nobody, including the platform itself, is able to jeopardize the security of assets, and users are able to withdraw tokens losslessly under extreme cases.

> **Q. Are zkLink's smart contracts audited?**

Yes. All of zkLink's smart contracts are audited by Certik. You can refer to [*zkLink V1 audit report*](https://github.com/zkLinkProtocol/zklink-audit-report) for complete audit report.

## What is ZKL

> **Q. What is ZKL?**

ZKL (*unreleased yet*) is the governance token of zkLink, and is an ERC-20 token. The total supply of ZKL is 1,000,000,000. More details about token economy will be released at a later time.

> **Q. How can users acquire ZKL?**

1. Provide liquidity / become a staking node: user can provide liquidity to trading pairs, or pledge idle tokens on zkLink and get ZKL as rewards.
2. Campaigns and community reward: users who offer constructive suggestions or make contribution to product design / community / resource referral will be rewarded with ZKL.
3. Becoming a staking node: users can compete for the role of the staking node by locking ZKL, and will win ZKL as rewards.

> **Q. How holders of ZKL benefit from it?**

1. Better transaction fee offers: for ZKL holders, zkLink will exempt part of transaction fees in forms of subsidies or direct discount.
2. Get airdrop: those who have been holding ZKL for a considerable time can expect irregularly airdrop as a reward.
3. Proposal initiation and voting: users can participate in our DAO governance by holding ZKL, and can initiate a proposal by burning certain amount of ZKL.
4. Becoming the staking node: users can compete for the role of the staking node by locking ZKL, and will win ZKL as rewards.

## How to setup and play with zkLink?

*For step-by-step instructions, please refer to zkLink userguide: https://docs.zk.link/docs/UserGuide/EN*

> **Q. Where should I start to use zkLink?**

To get started, users need to firstly deposit tokens to their Layer2 address via MetaMask, since every execution will happen on Layer2. Then you can start swapping / transaction / providing liquidity on this second layer, and experience all product features, before you withdraw your tokens from Layer2 back to Layer1 (the main chain). During the whole process, users always hold their assets.

> **Q. What wallets does zkLink support?**

Currently, users can connect MetaMask to zkLink, and we will support more wallets in the following version.

## Community

> **Q. How can I join zkLink's community?**

We welcome everyone with interest in zkLink / Layer2 Scaling / chain iinteroperability / ZK-Rollup to join our community. You can reach out to us via the following links:

Web: https://zk.link/

Twitter: https://twitter.com/zkLinkorg

Telegram: https://t.me/zkLinkorg

Discord: https://discord.gg/9GCwxN7xaJ

Medium: https://zklinkdefi.medium.com

Reddit: https://www.reddit.com/user/zkLink_
