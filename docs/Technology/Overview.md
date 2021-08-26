---
sidebar_position: 1
---

# Overview

## zkLink Technological Process

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vST5hyEGLObMjMqtCyZbhuW4Uaj08FA_hBcMbcDqKMHNCrwh2QOLRNy26B-fwjB8ymz8KMxOLElYynN/embed?start=true&loop=false&delayms=5000" frameborder="0" width="730" height="439" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Two key components of security in chain interoperation
There has been a lot of discussion around the purpose of zkLink, here we only focus on technical details in chain interoperability. The two major concerns during chain-to-chain data transmission are:

  1. **[The correctness of computation](/docs/Technology/About-Security#in-the-computation-process)**
  2. **[The authenticity of cross-chain data](/docs/Technology/About-Security#consensus-attack)**

Most cross-chain solutions are indifferent to the their distinction, since these two aspects are tend to be covered by the same party. zkLink, however, are designed to be extremely secure for that matter, since we customized separate schemes for them: zero-knowledge technology assures correctness of computation, while the validity of the verification process relies on a network composed with multiple oracles similar to a multi-sig organization.

- Read more on [How does zkLink support direct interaction of multi-chains](/docs/Technology/About-Security#how-does-zklink-support-direct-interaction-of-multi-chains)

> **💡** Oracles in this content are not responsible for data transmission, but rather for the validity of cross-chain transactions - an analogy to the referee of a ball game while players on the field are mathematics and cryptography.

## Functionalities of zkLink
At the current stage, zkLink supports L2 Swap, L2 Mirror (Stable-coin Swap), L2 Liquidity, Fast Withdraw, and FastCrossChainSwap (L1-L1).
- Read more on [Product](/docs/Product/Overview)
- For technology implementation, read more on [Technical Solution](/docs/Technology/Technology)

## Shared Liquidity
Based on ZK-Rollup, zkLink has achieved to call Layer2 liquidity pool on Layer1, so that traders do not need to "deposit to zkLink" and zkLink smart contracts only require the access to Layer1 assets. For liquidity providers, providing a voucher token such as crv3pool, is equivalent to providing liquidity for Layer2 pools.
