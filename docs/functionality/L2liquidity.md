---
sidebar_position: 3
---

# L2 Liquidity

---

AMM-based, Layer2 liquidity pools composed of LP tokens from two separate chains, supporting L2 Swap and L2 Mirror (Stable Swap). LP providers would receive high rewards by easy steps without firstly depositing to L2, fully utilizing the LP tokens they’ve earned from other DEXs - reaping twice with single staking.


<div className="cancel-md-margin cancel-img">

> **🥇** <span className="highlight">Features</span>
- No need to manually deposit to Layer2 in advance.
- Easy earning with no extra effort by staking LP tokens ALREADY EARNED from other AMM protocols.

</div>

<div className="cancel-md-margin cancel-img">

![zkLink Layer2 Network](../../static/img/prooverview.png)

</div>

## One-coin LP
To lower the threshold for providing liquidity, zkLink supports one-coin LP. Instead of deposit both tokens of a liquidity pool in a certain proportion, users are give more flexibility and can add only one kind of token at any amount.

Holding and providing liquidity with two kinds of assets can be cumbersome - first of all, you will have to take the risk of the price fluctuations from two tokens; secondly, unless you happens to hold EXACTLY the right proportion of two tokens, your fund utilization rate can never reach 100%. Last but not least, depositing both coins of a pair does not earn extra interests under the condition of same total amount - so why bother?

And the above trouble just doubled in terms of cross-chain liquidity pools: you may use different wallets for each chain, even if you are not you still have to switch network and run the whole process again with much more clicks.

As zkLink always attaches the most priority to user experience, we allow liquidity providers to deposit whatever and how much you want, optimizing user experience and maximize your fund utilization rate. 



## Reaping twice with one stake

For some commonly used pairs, zkLink has created a "never-been-easier" process for players to provide liquidity on zkLink from Layer1 while earning double rewards.

Take 3CRV(Ethereum)-3EPS(Solana) as an example - when a user adds 3CRV liquidity from its Ethereum Layer1 wallet, instead of locking up on zkLink's Layer1 smart contract, zkLink stakes it to one of the yield farming protocols such as Convex, helping the liquidity provider to secure the first half of earnings. In the mean time, zkLink mints the same amount of mapped-3CRV on our Layer2 network, adds liquidity to the correct pool, generating the second half for the LP. When the LP chooses to remove liquidity or to harvest earnings, the two parts of earnings will be collected together and received at once.

When a user provides liquidity into a pool, an unique NFT (ERC-721) which can be seen as liquidity tokens on other Dexs will be minted and sent to the provider's Layer1 address. This NFT represents the LP's contribution (or "share") to the given liquidity pool, and can be further staked to zkLink Layer1 contract in order to receive farming rewards.

<div className="cancel-md-margin cancel-img">
</div>

![Provide Liquidity](../../static/img/liq-flow.png)
