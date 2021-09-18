---
sidebar_position: 1
---

# Overview

## zkLink Technological Process

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vST5hyEGLObMjMqtCyZbhuW4Uaj08FA_hBcMbcDqKMHNCrwh2QOLRNy26B-fwjB8ymz8KMxOLElYynN/embed?start=true&loop=false&delayms=5000" frameborder="0" width="730" height="439" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## ZK-Rollup
zkLink, in essence, is a Layer2 cross-chain solution adopting ZK-Rollup technology. We bundles multiple transfers that happen on zkLink Layer2 network into a single transaction and upload necessary information to Layer1 smart contract. Every batch sent to the main chain contains a cryptographic proof (a ZK-SNARK, succinct non-interactive argument of knowledge), which proves that this series of transactions is correctly approved and signed by the users and that the update of the account balance is correct from the previous Merkle root to the new Merkle root.

> ‘Zero Knowledge Proof’ is a technique which employs cryptographic algorithms so that various parties can verify the veracity of an item of information without sharing the data that compose it.  
——Teresa Alameda

For detailed explanation of ZK-Rollup technology, please refer to [EthHub-io](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)


## Two key components in cross-chain interoperability
There has been a lot of discussion around the purpose of zkLink, here we only focus on technical details in chain interoperability. The two major concerns during chain-to-chain data transmission are:

  1. **[The correctness of computation](/docs/Technology/About-Security#in-the-computation-process)**
  2. **[The validity of cross-chain states](/docs/Technology/About-Security#consensus-attack)**

  Most cross-chain protocols are indifferent to the correctness of computation or authenticity of cross-chain data, since a multisignature (multi-sig) group usually handles these two concerns to 'sign off' on a trade.

  However, zkLink has a different logical structure split into two parts: zero-knowledge technology ensures the correctness of computation, while the validity of the verification process relies on a network composed of multiple oracles similar to a multi-sig group.

- Read more on [How zkLink supports direct interaction of multi-chains](/docs/Technology/About-Security#how-does-zklink-support-direct-interaction-of-multi-chains)

> **💡** Oracles in this content are not responsible for data transmission, but rather for the validity of cross-chain transactions - an analogy to the referee of a ball game while players on the field are mathematics and cryptography. Read more on [How zkLink supports direct interaction of multi-chains](/docs/Technology/About-Security#how-does-zklink-support-direct-interaction-of-multi-chains)

## Functionalities of zkLink
At the current stage, zkLink supports L2 Swap, L2 Mirror (Stable-coin Swap), L2 Liquidity, Fast Withdraw, and FastCrossChainSwap (L1-L1).
- Read more on [Product](/docs/Product/Overview)
- For technology implementation, read more on [Technical Solution](/docs/Technology/Technology)

## Shared Liquidity
Based on ZK-Rollup, zkLink has achieved to call Layer2 liquidity pool on Layer1, so that traders do not need to "deposit to zkLink" and zkLink smart contracts only require the access to Layer1 assets. For liquidity providers, providing a voucher token such as crv3pool, is equivalent to providing liquidity for Layer2 pools.

## Highlights

- Zero-knowledge technology guarantees the correctness of computation, while the oracle networks achieves the consistency of multi-chain states.

- Chain interoperation is complicated and unforeseeable. With the help of zero-knowledge technology, zkLink simplifies the process to a degree that everyone can understand and supervise it.

- A simple extra consensus would benefit public supervision, which, in  the long run, will fulfill a higher degree of security and privacy. Less is more, the conciseness of Bitcoin's POW is the best proof.
