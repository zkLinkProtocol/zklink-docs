---
sidebar_position: 2
---

# Cross Chain Swap

---

Cross Chain Swap is an AMM-based chain-to-chain trading tool built on top of zkLink's high-performance and secure multi-chain infrastructure, enabling one-stop cross-chain transactions, where the target token will be on L1 wallet within only a few blocks’ time.

Designed for everyone to trade supported tokens securely across different Layer1s and Layer2s with low costs.

> **🥇** <span className="highlight">Features</span>
- L1/L2 - L1/L2
- State-of-the-art cross chain transaction user experience.
- Complete in a few minutes.
- High-level security of tokens guaranteed by zero-knowledge technology with a decentralized, tech-oriented solution.

<div className="cancel-md-margin cancel-img">

![zkLink Layer2 Engine](../../static/img/fastswap.png)

</div>

## The Broker Mechanism
zkLink achieves L1-L1 Cross Chain Swap by calling L2 Liquidity on L1, and creates a ‘broker’ mechanism to shorten the withdrawal time from L2 to L1.

It is an inevitable drawback of almost all Layer2 protocols that token withdrawal from Layer2 back to Layer1 wallet can take as long as hours or even days. Although a ZK-Rollup solution can achieve instant finality of transactions, it still needs at least half an hour to process the computation. Thus zkLink initiates this “broker” mechanism, transferring the long waiting time from traders to brokers, at the expense of some extra fees.


![Fast Withdraw](../../static/img/fastwithdraw.png)

The “broker” is a new role in a cross-chain transaction, who earns transaction fees just as a liquidity provider, when the latter gives up the opportunity cost of locking the funds, a broker sacrifices the time waiting for the transaction from Layer2 to Layer1.

As soon as zkLink's Layer2 Engine receives a Fast Withdraw request, it will notify the optimal broker, who will immediately transfer the right amount of target tokens to the user’s Layer1 wallet from its Layer1 wallet, so that the user only needs to wait for 1 block’s interval before receiving the target token on Layer1 wallet.

Then, after the ZK_proof related to this original withdrawal request is officially verified, the final_root containing this transaction info is uploaded to Layer1 and being confirmed, zkLink Layer1 contract will finally send the token to the broker’s Layer1 wallet, reaching a re-balance on the broker’s Layer1 and Layer2 account.


## Transaction Flow


<div className="cancel-md-margin cancel-img2">

When users enjoy "one-click" cross-chain swap, there are actually several procedures behind the scene:
![zkLink Layer2 Engine](../../static/img/fastprocess.png)

</div>

1. If the source token is not listed on zkLink Layer2 liquidity pools, it will be firstly swapped into an "initial token" on zkLink Layer1 DEX Aggregator. Otherwise this step is skipped.
2. Deposit: source tokens are automatically deposited to zkLink Layer2 Engine.
3. Instant Swap: on zkLink Layer2 Engine, initial tokens will be directly swapped into target tokens on the corresponding AMM-based liquidity pool.
4. Fast withdraw: once the swap is confirmed, target tokens will go to a broker's Layer2 wallet, who will then transit the right amount of target tokens to the user's Layer1 wallet from its Layer1 wallet.

![zkLink Layer2 Engine](../../static/img/FastSwapUI.jpg)

## Layer1 DEX Aggregator (Developing)
For those less frequently-used tokens, zkLink Fast Cross Chain Swap breaks the barrier and offers a solution where users can trade them across separate chains. And this is achieved efficiently without adding a long list of liquidity pairs.  


zkLink aggregates multiple leading decentralized exchanges such as Uniswap. When a user initiates a cross-chain request with the source unlisted on any of the zkLink's L2 liquidity pools, the system would compare different Layer1 DEXs on the source chain in zkLink aggregator, **find the most cost-effective route and exchange rate**, and then swap the source token to an intermediary that is listed on zkLink Layer2 liquidity pools. We will then help the user to swap this intermediary to his/her designated token and then initiate the Fast_Withdraw protocol (elaborated below). - **This all happens within a few minutes, with no manual intervention required.**


In this manner, the scope of available source tokens is expanded considerably. Theoretically, any token that is listed on its local DEXs can be exchanged globally, so that traders do not need to bother exchanging their source tokens to something zkLink supports in advance when zkLink accomplishes this for them, saving them even much more trouble. In addition, with the support from third-party Layer1 DEXs, the number of necessary liquidity pairs on zkLink Layer2 Engine drops significantly, contributing to greater depth and lower slippage in the current liquidity pools.
