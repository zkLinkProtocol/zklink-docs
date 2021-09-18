---
sidebar_position: 1
---

# Highlights of Chain-to-chain Interoperability

---
Regarding chain interoperation solutions, here is a list of questions you might be interested in - click and be navigated to the answer.

- <span className="highlight">Security</span>: in the current blockchain world, security is alway the top priority. Liquidity providers should be convinced that their funds are safe, while traders need to know that they can acquire the right amount of tokens.

  - Read more on [zkLink security assumptions](/docs/Technology/About-Security#security-assumptions)
  - Read more on [Preventing attacks on cross-chain trades](/docs/Technology/About-Security#preventing-attacks-on-cross-chain-trades)

- <span className="highlight">Service Stability</span>: generally speaking, there is not much to concern for pure smart contracts. As for cross-chain projects with auxiliary off-chain systems, the system stability is always a big deal.

  - Read more on [High-availability architecture of zkLink Layer2](/docs/Technology/Technology#high-availability-architecture-of-zklink-layer2)

- <span className="highlight">Low cost</span>: as a derivative of ZK-Rollup solution, zkLink is born with scaling capability, which endows zkLink with low transaction cost.

- <span className="highlight">Liquidity aggregation</span>: the continuously emerging public chains and scaling solutions are isolating the liquidity of DeFi-verse as a whole, forming numerous asset silos. If a chain interoperation protocol could aggregate the fragmented liquidity from separated chains and Layer2 networks, it could provide a more user-friendly trading environment, creating huge values.

  - Read more on [Shared Liquidity](/docs/Technology/Overview#shared-liquidity) and [Partial Liquidity](/docs/Technology/Technology#partial-liquidity)

- <span className="highlight">Composability</span>: in the process of DeFi prosperity, composability gets the credit. A middleware to connect isolated chains oughts to be equipped with the capability to interact with other DeFi projects. zkLink V1 supports FastCrossChainSwap which achieves fast and secure L1 to L1 cross-chain solutions; zkLink will provide turing-complete cross-chain VM, solving multi-chain assets fragmentation problem thoroughly.

- <span className="highlight">Atomicity</span>: the full process of chain interoperation is expected to be completed within a short time at once. When transaction fails all funds should be reverted, which prevents the change-in-state from happening only partially.

  - Read more on [Multy-Chain AMM](/docs/Technology/Technology#a-multi-chain-amm)

- <span className="highlight">Compatibility</span>: most chain-ineroperation protocols support only EVM, whereas users are in need of a more compatible solution in a world with both EVM and other infrastructures. In virtue of ZK-Rollup, the only condition for a qualified chain connecting to zkLink is the capability of testifying zero-knowledge proves, meaning that zkLink is able to support any smart-contract-executable chains.

  - Read more on [ZK-Rollup](/docs/Technology/Technology#about-zkrollup)

- <span className="highlight">Extra consensus</span>: an additional consensus mechanism is a necessary component in chain-to-chain communication to guarantee the reliability of sending/receiving data from other chains. The whole process is supposed to be transparent enough for community members to monitor and find out unusual status, and to be simple enough to prevent inconsistent communication.

  - Read more on [The validity of cross-chain states](/docs/Technology/About-Security#the-validity-of-cross-chain-states)
