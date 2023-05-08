---
sidebar_position: 1
title: ' '
---
# Introduction

---

## What is zkLink？
zkLink is a **unified multi-chain trading infrastructure** secured with **zk-SNARKS**, empowering the next-generation of decentralized trading products such as order book DEX, NFT marketplaces, and more.

By connecting various L1 blockchains and L2 networks, zkLink's unified, multi-purpose ZK-Rollup middleware enables developers and traders to leverage aggregated assets and liquidity from different chains and offer a seamless multi-chain trading experience, contributing to a more accessible and efficient DeFi ecosystem for all.


Furthermore, atop our multi-chain ZK-Rollup infrastructure, zkLink offers an array of API-driven use cases to cater to a diverse range of decentralized applications.



<div className="cancel-md-margin">

>**🥇** zkLink innovatively applies **[zero-knowledge](/docs/Technology/Technology)** technology to multi-chain interoperability with a trustless and decentralized **[separation of powers](/docs/Technology/About-Security)** design that safeguards the security of assets and trades as well as multi-chain data transits.

</div>

<div className="cancel-md-margin cancel-img">

![zkLink Layer2 Network](../static/img/background.png)

</div>

<div className="cancel-md-margin">

</div>

## Features
### Native Asset Aggregation
#### Multi-chain Token Listing and Trading
dApps built atop the zkLink protocol can list and trade tokens across various L1s and L2s, including FTs and NFTs, enabling users to transact multi-chain tokens through a single user interface. No bridges are required in this process, thus circumventing cross-chain risks and costly bridging fees.

#### Multi-chain Token Portfolio Management
A single wallet can manage multi-chain portfolios. For example, if Alice deposits 2 UNI from her wallet (e.g., Metamask) to the zkLink contract deployed on Ethereum, and then deposits 3 BNB from the BNB chain to the zkLink contract using the same wallet address, she will receive 2 UNI + 3 BNB at the same address on zkLink's rollup network. This functionality extends to tokens from Polygon, Avalanche, Starknet, zkSync, Linea, Scroll, Solana, and more.


### Liquidity Aggregation
#### Token Merge
Tokens issued on different blockchains by the same entity (e.g., USDT ERC20, USDT SPL, USDT BEP20) will be merged into a single token (USDT) within the zkLink rollup network. This concept also applies to ETH, which will be consolidated from various sources, including Ethereum, zkSync, Starknet, and Scroll, eliminating chain identities. In summary, tokens of the same kind issued on different chains are merged into a single token, providing a seamless multi-chain user experience akin to a centralized exchange but without counterparty risk.

#### Stablecoin Liquidity Unification
USD, a unified pricing currency, is introduced within the zkLink system and exists exclusively in the zkLink rollup network. USD is backed by a basket of fiat-backed and market-proven stablecoins, such as USDC issued by Circle, USDP issued by Paxos, and BUSD issued by Paxos. This unification eliminates disparities among fiat-backed stablecoins from different chains.

USD can be transferred to any address within the zkLink system and serve as the base currency for any trading pair in the zkLink ecosystem. For instance, an order book DEX can list pairs like ETH/USD, BTC/USD, BNB/USD, etc., for both spot and derivatives trading. A NFT marketplace could also list NFT assets priced in USD to reduce friction costs and lower the user entry barrier.

Key factors considered for the qualification of a fiat-backed stablecoin include, but are not limited to, regulated issuance entities, market-leading circulation supply, and transparency on Proof of Reserve or Collateral. Since stablecoins remain redeemable one-on-one for US Dollars, the peg ratio of USD to stablecoins is maintained at 1:1.

dApps have the option to enable or disable the auto-conversion of USD. The smart contract can add or remove supported stablecoins.

### App-specific Zero-knowledge Circuit
The zkLink protocol's zero-knowledge circuit is customized to support industry-leading performance (1000+ TPS) for order book trading, bridging the gap between high-frequency traders' needs and on-chain products. At present, zero-knowledge circuit development remains complex, expensive, and time-consuming. Some core competencies of the zkLink infrastructure, facilitated by the app-specific circuit design approach, include:

- **Customizability:** The zkLink engineering team offers customized designs for strategic partners in specific use cases, such as order book DEX and NFT trading.
- **Development cost:** High-level APIs are easy to use.
- **Efficiency:** The app-specific circuit is considerably smaller compared to general-purpose zk circuits, resulting in lower computational resource and on-chain gas consumption.
- **Continuous optimization:** The protocol focuses on improving trading performance and reducing cost per trade.