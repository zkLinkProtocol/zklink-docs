---
sidebar_position: 6
title: ' '

---

# Security Design

---
zkLink's security design focuses on ensuring the correctness of off-chain states and the validity of transactions. 

The protocol uses zk-SNARK proofs to verify the validity of off-chain states and a lightweight oracle network (a group of juries) to judge the consistency of the final roots across connected layer1 blockchains and layer2 networks.

## Two Key Components
The two major components that ensure the security of the protocol:
1. Verification of multi-chain transactions;
2. Judgment on the consistency of the final roots among the connected chains.

## Verification of Multi-Chain Transactions
Building upon the classic zkRollup design, zkLink extends its capabilities by accepting external state inputs from multiple sources, specifically by allowing deposit transactions from various chains. Assets from different chains are unified and recorded on a single rollup state tree, eliminating any transaction obstacles that may arise due to differing source chains and greatly enhancing transaction convenience. All changes occurring on this extended state tree generate zero-knowledge proofs and are submitted to each connected chain for verification, ensuring that all transactions are executed correctly.

However, multiple external state inputs pose new challenges for the on-chain verification of rollup validity. For instance, each Layer1 smart contract can only verify deposit transactions originating from its own chain, and it cannot verify the existence of deposit transactions from other chains. Therefore, it is necessary to ensure that all connected chains receive strictly consistent state tree change information.

## Consistency of State Tree Final Root
zkLink introduces a light oracle network to check the consistency of state tree change information, which passes the final root of one chain to the other and compares if the two 32-byte-hash final roots match - only when true will the layer2 block be accepted and finality of the batched transactions achieved. Note that any reputable third party can join the light oracle network to safeguard the consistency of multi-chain states. For instance, A makert maker that has deployed capital to the zkLink contract may choose to run a oracle service themself to fully eliminate the conspiracy risk.


In the long term, it is possible that one of the versions of the zkLink protocol will run solely on the Ethereum rollups and Ethereum mainnet, which would result in the cancellation of the light oracle network and simply the consistency check, as Ethereum itself can safely transmit the final roots to the rollups.

![oracles](../../static/img/tech/oracles.png)

## Checks and Balances Design

To summarize the above, zkLink employs a check and balance security design. Multi-chain transactions are verified by ZK-SNARKs, which generate the final root (rollup state roots). The lightweight oracle network (a group of juries) then passes the final roots from chain to chain and the contract compares the final roots to judge the consistency between them. By separating the verification and judgment processes, zkLink guarantees that no single party controls asset security, minimizing the probability of being compromised, whether that comes from external hacks or internal malicious activity.


## Anti-Attacks
By analyzing the transaction processes of recent cross-chain security breaches, we can categorize them into two types: attacks targeting the computation process or the consensus process.

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

In zkLink, the extra consensus is carried out by independent and reputable third parties (oracle network), with the rights of this role minimized, as explained in [zkLink's checks and balances design](/docs/Technology/About-Security#checks-and-balances-design).

Even if hackers manage to spoof or steal the identity of the consensus community, they can never fake a transaction, instead the only damage they can ever cause is rejecting the transaction requests from Layer2 to Layer1, doing no harm at all to assets or account status.
