
# Bridge

---


Fast Bridge is a multi-chain token mapping instrument on top of zkLink's high-performance and secure chain-to-chain infrastructure, boosting DeFi projects with their multi-chain deployment.


> **🥇** <span className="highlight">Features</span>
- The security of mapping tokens is guarded by zero-knowledge technology from being maliciously minted.
- Different from the bridges controlled by a multi-sig community, new token-offering request would only be executed once it passes ZK verification.


<div className="cancel-md-margin cancel-img">

![background](../../static/img/bridge.jpg)

</div>

## Mechanism
For most project developers, multi-chain deployment is an important strategy to to attract the widest range of potential users. But, for users, the inter-communication problem could hinder their enthusiasm to hold or trade with project-native tokens; and for projects, obstruct the re-balance of their account on each chains. Under such a background, zkLink bridge provides access to the same asset from a foreign chain.

Just as *Fast Cross Chain Swap*, the Bridge is built on zkLink's Layer2 infrastructure: when a user burns the certain amount of tokens on zkLink Layer1 smart contract, with necessary information of this transactions passed to Layer2 engine, going through the same process as Fast Cross Chain Swap (data commitment, zk verify, oracle consensus, and execute; read more on [How zkLink works](/docs/Technology/Technology). If the two  `final_roots` are consistent, Layer2 engine will approve this transaction before the right amount of token being minted and transferred to the user. Different from most cross-chain bridges where assets security relies on the "bridge" itself, in virtue of zero-knowledge technology, zkLink bridge can achieve the same security level the source and destination chains in the way that zkLink protocol is equipped with on-chain data availability, and can rollback to the correct account status in case of attacks.

The most obvious distinction between Fast Cross Chain Swap and Bridge is how users interact with zkLink Layer1 smart contracts. During Fast Cross Chain Swap, users transit tokens to zkLink smart contract on the source chain, and vice versa on the target chain; while for Bridge, zkLink smart contracts take the responsibility of burning tokens one side and minting on the other.

![background](../../static/img/bridgeUI.jpg)
