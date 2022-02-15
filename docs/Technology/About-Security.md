---
sidebar_position: 6
---

# Security Design

---
In most multi-chain interoperability protocols, asset security relies on a group of nodes within a POS network, of which the security assumption is based on token values of the POS network.

The security assumption of zkLink is based on mathematical verification instead of economic assumption. We use zk-SNARK that mathematically verifies cross-chain transactions with circuits and an oracle network (a group of juries) that judges the accuracy of the roots generated from the verification process.

## Two Key Components
The two major concerns during cross-chain data transmission are:
1. Verification of cross-chain transactions;
2. Judgment on the consistency of the data on the target and destination chains.

One of the main features of ZK-Rollup is data availability on Layer1. For a single-chain ZK-Rollup solution, a SNARK ensures that all state changes are the result of accurately running the circuit. However, in terms of cross-chain transactions, zero-knowledge alone cannot enforce the consistency of cross-chain states (final roots in different chains matching each other). The operator can submit two final roots in different chains that both satisfy the constraints, allowing them to perform a double spend.

Most cross-chain protocols rely on a group of nodes within a POS network (a multi-sig committee) to ensure verification correctness and data consistency, which means that both would break should the committee be compromised. The security assumption is based on the sum of token values of this POS network.

In zkLink, zero-knowledge proofs ensure computation correctness (removing the possibility of attack unless the underlying proving system is broken), and the oracle network ensures data consistency. As zkLink employs multiple permissionless oracle networks, data consistency in practice is more secure than in the multi-sig case.


## Security Assumptions
The security of zkLink system is under the assumptions below:

- The security of public chains and VM-compatible scaling protocols connected. The purpose of zkLink is to connect chains together, wherein the "bucket effect" makes the minimum commitment of zkLink security is determined by the one with the lowest security level among the many chains connected. Of course, the decision on connecting or disconnecting a chain should be seriously considered and made collectively by the community.
- zkLink, Chainlink and other oracles are obligated to the DeFi community by acting in good faith in all decisions taken, and will reject and report any malicious action.

## The Verification of Cross-chain Transactions
![recursive](../../static/img/tech/recursive.png)
SNARKs allow collapsing verification of arbitrarily large computations into checking an equation with a small number of variables. ZK-Rollup leverages this property to minimize the amount of data needed for the judgment of the verification process.

On top of the classic ZK-Rollup design, zkLink conducts an additional recursive verification process with `zk_proofs` from both chains. After that, the two independent systems will have a mutual final_root. Then, just like a classic ZK-Rollup solution, zkLink uploads all transaction parameters and the final_root to Layer1 contracts for on-chain data availability.

The `zk_verify` function will approve the recursive ZK-SNARK before the Layer1 smart contract emits log (`final_root`).

Once the final_root is calculated, it is impossible to fake the source data, since it and the final_root exhibit a nonlinear and unidirectional causality in a hash function. Any slight change in the source data would cause an entirely different final_root.

Thus, the verification problem now becomes comparing whether the two or more final_roots from each chain are consistent or not (no need to verify every detail of the massive amount of transaction data). This process is simple enough for everyone to accomplish, making it possible for a light oracle network to compare the final_roots.


## The Judgment on the Consistency of Final_roots
In most chain interoperability projects, the consistency of multi-chain status is checked and signed by a multi-sig group, meaning the assets security depends on the reliability of the committee, and the vulnerability of the verification program.

Instead of running our own program, zkLink introduces a light oracle network to complete this task, which passes the final_root of one chain to the other and also compares if the two 32-byte-hash final_roots match - only when will the block be accepted.


![oracles](../../static/img/tech/oracles.png)
** Depending on the features of each Layer1 network, the choice of oracles can be different.

We have multiple Oracles working together, forming a light network similar to a multi-sig community. More than one oracle can further improve the security level, while zkLink DAO will vote on the change of members in each oracle network.


## The Checks and Balances Design

In zkLink’s check and balance security design, the cross-chain transactions are verified by ZK-SNARK, which generates the final roots (rollup state roots).

The oracle network (a group of juries) then passes the final roots from chain to chain and compares the final roots to judge the consistency between them.

By separating the verification and the judgment process, zkLink guarantees that no single party controls asset security, and thus minimizes the probability of being compromised, whether that coming from external hacks or internal malicious activity.


## Preventing Attacks

By studying the transaction processes of recent cross-chain security hacks, we sort them into two types: attacks in the computation process, or in the consensus process. With a different logical design, zkLink mitigates risks in both scenarios.

### Vulnerability in the computation process
Diving deeper into the recent cross-chain security incidents, we can conclude that most of them are caused by vulnerability in the computation process, i.e., the correctness of computation, rather than consensus mechanism. Here are some of the cases:

* [Umbrella Network — Update on Chainswap Hack](https://medium.com/umbrella-network/umbrella-network-update-on-chainswap-hack-628d1aaaa873)
* [Anyswap Multichain Router V3 Exploit Statement](https://anyswap.medium.com/anyswap-multichain-router-v3-exploit-statement-6833f1b7e6fb)
* [First attack on THORChain](https://www.reddit.com/r/THORChain/comments/oa0kss/first_attack_on_thorchain_fixed_already/)
* ['Critical Issues' With Thorchain After 2nd Hack in a Week](https://decrypt.co/76694/critical-issues-with-thorchain-after-2nd-hack-week)

zkLink, guarded by zero-knowledge technology, is robust to this kind of attack comparing to other open-source systems. Before Layer2 transactions are approved and uploaded to respective Layer1 smart contract, an extra recursive proof with data derived from both chains will be generated based on established ZK-Rollup protocols.

The result of this execution is a mutual `final_root` of the two interacting chains, which guarantees the new state is the result of the circuit being correctly computed. Of course, zkLink circuit will be opened up for public supervision sooner than mainnet launch.

If hackers try to manipulate data uploaded to Layer1, it would be rejected by the sequencer. The zkLink dev team adopt a more sophisticated traditional web security defense technique than those open-source Layer1 protocols where the permission of validation is open through competition.

### Vulnerability in the consensus process
Reviewing the most recent [PolyNetwork Hack](https://decrypt.co/78163/polynetwork-suffers-record-breaking-600-3m-hack), what if hackers have managed to break through the authentication of validator? If hackers manage to break the private key of a consensus member, they might potentially gain the privilege to manipulate funds on a smart contract - including the ability to transfer assets to themselves.

However, if the same thing happens on zkLink, at most, the service would be stopped for a short time.

The authority of the zkLink consensus community (a network composed of multiple third-party oracles similar to a multi-sig group in other projects) is limited in it's authority to a minimum, as explained in [overview](/docs/Technology/Overview).

Even if hackers manage to spoof or steal the identity of the consensus community, they can never fake a transaction, instead the only damage they can ever cause is rejecting the transaction requests from Layer2 to Layer1, doing no harm at all to assets or account status.
