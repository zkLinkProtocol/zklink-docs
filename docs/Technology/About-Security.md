---
sidebar_position: 6
---

# Security

---


zklink uses a unified off-chain L2 state to monitor and record the information transmitted between separate chains and Layer2 networks.

Inherited from classic ZK-Rollup, all L2 state changes will be uploaded to the corresponding Layer1 network. From the perspective of a single chain, zero-knowledge is capable to ensures that all state changes are the result of accurately running the circuit. However, when it comes to cross-chain transactions, zero-knowledge fails to testify whether cross-chain data (data coming from the other chain) is authentic - even if it might satisfy the constraints of circuit, it is not necessarily TRUE. So how does zklink solve this problem of data authenticity?

Read more on [How does zkLink guarantee the authenticity of cross-chain data?](/docs/Technology/About-Security#how-does-zklink-guarantee-the-authencity-of-cross-chain-data)

## Security assumptions
The security of zkLink system is under the assumptions below:

- The proper operation of public chains and VM-compatible scaling protocols connected. The purpose of zkLink is to connect chains together, wherein the "bucket effect" exists in zkLink systemic risk, which means that the minimum commitment of zkLink security is determined by the one with the lowest security level among the many chains connected. Of course, the decision on connecting or removing a chain should be seriously considered and made collectively by the community.
- zklink, Chainlink and other oracles are obligated to the DeFi community by acting in good faith in all decisions taken, and will reject and report any bad action.

## How does zkLink support direct interaction of multi-chains?
![recursive](../../static/img/tech/recursive.png)
Zero-knowledge can turn the verification of a complicated logic into a simple proposition - it is one of the fundamental characteristics of ZK technology, and zkLink makes full use of it.

Based on the classic ZK-Rollup design, zkLink conducts an additional `recursive proof`, whose data comes from the two chains interacting with each other. After a valid recursive proof, the current states of different chains are interrelated mathematically, which is constrained by the circuit. We will open up the circuit related to zero-knowledge for third parties to verify it easily.

Once the recursive proof is executed, the two independent systems will be having a mutual final_root.

## How does zkLink guarantee the authencity of cross-chain data?
There is no need for zkLink to verify every details from the massive amounts of data. The recursive ZK-SNARKs endow the data and the final_root with an unidirectional causality like a hash function. Once the final_root is settled, there would be no person or organization capable of faking the source data of this final_root.

What an exciting feature - it signifies that we have turned a complicated and uncertain problem into an extremely simple task - comparing whether the two or more final_roots are uniform or not.

We utilize an oracle for data transmission, letting the smart contract to testify the consistency of final_roots. There are a number of oracles to choose from thanks to the development of DeFi-verse.

![oracles](../../static/img/tech/oracles.png)
** According to the features of each Layer1 network, the choice of oracle can be different.


We have multiple Oracle networks working together, forming a community like a multi-sig. More than one oracles can further improve the security level, while the change of members in each oracle network can be voted on by zkLink DAO. Such a big decision should be made under prudent consideration so that there would be a cooling-off period for every community members to be notified.


## How nodes are operated?
Just like Loopring, zkSync, zkSwap, and other successful scaling solutions based on ZK-Rollup, the node of zkLink is also operated by the team.

You may think of zkLink as a centralized project, but you are only partly right - in very small part. How?

On the security side, zkLink system is `COMPLETELY` decentralized, eliminating the risk of malicious behavior from operators or validators - not because they don't want to, but because they are not able to - thanks to zero knowledge technology.

Under the premise of open-source circuit, every off-chain execution must comply with the circuit's specifications. Just like the regulatory framework of a company, circuit is how zkLink world functions. Any illegal operations would be exposed during `zk verify`, which is processed by the smart contract with the verify key stored in. Both the algorithm of `zk verify` and `verify key` will be published online. As long as the circuit has been rigorously audited without any malicious logic, the ZK-based system can be considered as safe and sound.

For more information regarding the security of ZK technology, please refer to  *An Incomplete Guide to Rollups* by Vitalik Buterin (https://vitalik.ca/general/2021/01/05/rollup.html).


## zkLink is equipped with stronger anti-attack capability

In crypto world, most attacks can be attributed to two major factors: security vulnerabilities in computation process, or in consensus mechanism.

### In the Computation Process
Diving deeper into the recent cross-chain security incidents, we can conclude that most of them are resulted by coding bugs or system failure, i.e., the correctness of computation, rather than consensus mechanism. Here are some of the cases:

* [Umbrella Network — Update on Chainswap Hack](https://medium.com/umbrella-network/umbrella-network-update-on-chainswap-hack-628d1aaaa873)
* [Anyswap Multichain Router V3 Exploit Statement](https://anyswap.medium.com/anyswap-multichain-router-v3-exploit-statement-6833f1b7e6fb)
* [First attack on THORChain](https://www.reddit.com/r/THORChain/comments/oa0kss/first_attack_on_thorchain_fixed_already/)
* ['Critical Issues' With Thorchain After 2nd Hack in a Week](https://decrypt.co/76694/critical-issues-with-thorchain-after-2nd-hack-week)

zkLink, guarded by zero-knowledge technology, is robust to this kind of attack comparing to other open-source systems. Before Layer2 transactions being uploaded to respective Layer1 smart contract, an extra recursive proof with data derived from both chains will be conducted on the basis of the traditional ZK-Rollup solution. The result of this execution is a mutual final_root of the two interacting chains, which guarantees that the new state is the consequence of circuit being correctly computed. Of course, zkLink circuit will be opened up for public supervision sooner than mainnet launch.

When zkLink faces the same kind of attacks above, the improper data would be blocked out by the sequencer, i.e., zkLink team, who adopts more sophisticated traditional web security defense techniques than those open-source Layer1 protocols wherein the permission of validation is open through competition.

### Attack in Consensus
But what if hackers have managed to break through the authentication of validator? Reviewing the most recent [PolyNetwork Hack](https://decrypt.co/78163/polynetwork-suffers-record-breaking-600-3m-hack) where a bug on consensus stage was thought to blame, we now know that extra consensus does not equal to absolute security, in the way that private key of consensus members might be compromised which leads to malicious behavior from the latter.

What will happen if the same thing occurs to zkLink? Nothing - at most the service would be shut down for some time. The authority of zkLink consensus community (a network composed of multiple third-party oracles similar to a multi-sig organization in other projects) is limited to minimum, as explained in [overview](/docs/Technology/Overview). Even if the identity of consensus community is stolen, hackers can never "fake a transaction", instead the only damage they can ever cause is rejecting the transaction requests from Layer2 to Layer1, doing no harm at all to assets or account status.

### The Stable Triangle
The highlight of zkLink security lies in the idea of "Checks and Balances" by analogy with the three wings of a functioning government: executive, judicial and legislative, respectively being the sequencer, oracle network, and DAO. The sequencer transmits the result of running the circuit to Layer1 smart contracts, while the oracle network has the power to approve or halt it. On top of it, the change of members in each oracle network or the sequencer can be voted on by zkLink DAO.

Such separation of powers is well designed to guard against economic attack from both outside hackers and inside governors, by ensuring that no branch would grab too much power. In this fashion, zkLink is equipped with higher security level and stronger anti-attack capability. We guarantee that traders can retrieve tokens losslessly under any extreme circumstances.


## Highlights

- Zero-knowledge technology guarantees the correctness of computation, while the oracle networks achieves the consistency of multi-chain states.

- Chain interoperation is complicated and unforeseeable. With the help of zero-knowledge technology, zkLink simplifies the process to a degree that everyone can understand and supervise it.

- A simple extra consensus would benefit public supervision, which, in  the long run, will fulfill a higher degree of security and privacy. Less is more, the conciseness of Bitcoin's POW is the best proof.
