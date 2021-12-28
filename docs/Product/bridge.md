
# Token Bridge

---

Fast Bridge is a multi-chain token mapping instrument on top of zkLink's high-performance and secure chain-to-chain infrastructure, boosting DeFi projects with their multi-chain deployment.

Designed for users to transport the same tokens from one Layer 1 chain to another. After protocols integrate zkLink’s SDK, Token Bridge acts as a multi-chain token mapping instrument for their users.


> **🥇** <span className="highlight">Features</span>
- The security of mapping tokens is guarded by zero-knowledge technology from being maliciously minted.


<div className="cancel-md-margin cancel-img">

![background](../../static/img/bridge.jpg)

</div>

## Mechanism
For most project developers, multi-chain deployment is an important strategy to attract the widest range of potential users. But, for users, the inter-communication problem could hinder their enthusiasm to hold or trade with project-native tokens; and for projects, obstruct the re-balance of their account on each chain. Under such a background, zkLink bridge provides access to the same asset from a foreign chain.

Just as *Cross Chain Swap*, zkLink Token Bridge is built on zkLink's Layer2 infrastructure: when a user burns a certain amount of tokens on zkLink Layer1 smart contract, the necessary information of this transaction will be passed to Layer2 engine, and goes through the same process as Fast Cross Chain Swap (data commitment, zk verify, oracle consensus, and execute; read more on [How zkLink works](/docs/Technology/Technology). If the two  `final_roots` are consistent, Layer2 engine will approve this transaction before the right amount of token is minted and transferred to the user. Different from most cross-chain bridges where assets security relies on the "bridge" itself, in virtue of zero-knowledge technology, zkLink Token Bridge can achieve the same security level of the source and destination chains in the way that zkLink protocol is equipped with on-chain data availability, and can rollback to the correct account status in case of attacks.

The most obvious distinction between Cross Chain Swap and Token Bridge is how users interact with zkLink Layer1 smart contracts. In a Cross Chain Swap transaction, users transit tokens to zkLink smart contract on the source chain, and vice versa on the target chain; while for Token Bridge transactions, zkLink smart contracts take the responsibility of burning tokens on one side and minting on the other.

![background](../../static/img/bridgeUI.jpg)
