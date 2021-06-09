---
sidebar_position: 3
---

# State and Operation

---


zkLink will launch 2 versions of testnet. zkLink v1 will adopt Uniswap V2 features and zkLink v1.1 will adopt Uniswap V3 features and will support NFT transactions.

#### zkLink v1.0 State Tree
![Figure 3: zkLink v1.0 State][v1.0]

#### zkLink v1.1 State Tree
![Figure 4: zkLink v1.1 State][v1.1]

#### Deposit

A deposit is initiated by users on Layer1, who transfer the standard ERC20 or ERC721 tokens to the Layer1 Rollup contract deployed by zkLink. The Layer1 Monitor is continuously monitoring relevant change-in-state on Layer1, and a validator will update the root nodes of the State Tree, and will generate zero-knowledge proofs in the ZK Prove System. After which, Layer1 Monitor will send these proofs along with the previous and current root to the Rollup Contract. The Layer1 contract will verify that a deposit actually happens and that the zero knowledge proofs are valid.

![Figure 5: Deposit][deposit]

#### Deposit To
Unlike the deposit operation, it allows users to designate the target address, which is necessary in multi-chain interactions.

#### Withdraw
Users initiate a withdrawal on Layer2, and submit signed transactions to the validator. The state modification will be triggered (as shown in the figure below) and the root nodes of the State Tree will be updated. After ZK Prove System generates the zero-knowledge proofs, Layer1 Monitor will upload the old and new state root as well as the zero-knowledge proofs to Rollup contract. The Layer1 contract will verify that a deposit actually happens and that the zero knowledge proofs are valid.

![Figure 6: Withdraw][withdraw]

#### Withdraw To
Unlike the withdrawal operation, designated withdrawal allows users to designate the target address during the operation, which is necessary in multi-chain interactions.

#### Transfer
A transfer only happens on Layer2, and its subject can be either ERC20 or ERC721 tokens. Once a signed transaction is sent to the validator, who will then update the account state on Layer2 and the root nodes of the state tree. After ZK Prove System generates the zero-knowledge proofs, the latter will be passed to Layer1 Rollup contract for verification.

![Figure 7: Transfer][transfer]

#### Add Liquidity
Adding liquidity is initiated by users on Layer2. zkLink v1 protocol refers to Uniswap V2 when adding liquidity. So, the users' remittance when contributing tokenA and tokenB will depend on their ratio in the liquidity pool. zkLink v1.1 protocol refers to Uniswap V3 so that users can determine the upper and lower limits of their customized price range; the corresponding position token is generated to represent this price range.

![Figure 8: Add Liquidity][addliquidity]

#### Remove Liquidity
Removing liquidity is the opposite of adding liquidity. The biggest difference between v1.1 and v1.0 is how commission fees are collected. v1.1 credits the commission fees to the LP's account at each transaction; while in v1.0, commission fees are reflected as tokens in the liquidity pool and can only be retrieved when liquidity is removed.

![Figure 9: Remove Liquidity][removeliquidity]

#### Market Order Transactions
Market order transactions are initiated by users on Layer2, and are limited to ERC20 tokens for the time being. When a signed transaction is sent to the validator, it will update the account state on Layer2 and the root nodes of the state tree. After ZK Prove System generates zero-knowledge proofs, they will be passed to Layer1 Rollup contract for verification.

![Figure 10: Swap][swap]

#### Limit Order Transactions
zkLink v1.1 protocol refers to Uniswap V3 in adding liquidity, making it possible to simulate limit order transactions. Users can simulate the limit order by providing liquidity in a very narrow price band. When the price hits the boundary of the price range set by the user, it is equivalent to completing a limit order transaction.

#### Others
The technical models for "adding/removing liquidity for cross-chain assets" and "direct trading of cross-chain assets" will be disclosed at a future date.






