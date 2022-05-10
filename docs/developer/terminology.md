---
sidebar_position: 6
---

# Terminology

---
zkLink is a zero-knowledge protocol that connects multiple chains to a unified L2 Rollup. Users can deposit tokens to this L2 from multiple chains, and the same kind of token from different chains is coded with one unique Token Id, which enable users to deposit from one chain and withdraw to the other - this is how cross-chain transactions are realized.

## L1
Blockchains such as Ethereum, Binance Smart Chain, Solana, etc. zkLink smart contracts are deployed on L1s, which users interact with. L2 downloads events from L1 that include change-in-states, and Validator submits Block and Proof to smart contracts to sync L2 states with L1.

### Contract
There are three kinds of smart contracts that zkLink deploys on L1s:
 * zkLink, that includes APIs such as deposit, withdraw, commitBlock
 * zkLinkPeriphery, that includes APIs such as acceptance
 * Governance, that includes APIs such as token listing

### Event
An event on L1 that requires L2 to process is named as `NewPriorityRequest`, which includes the following information:

| Name              | Description                |
|-----------------|-------------------|
| opType          | The type of Operation   |
| pubData         | The content of Operation      |
| expirationBlock | The expiration Block of Operation |

A PriorityRequest is the request that needs L2 to prioritize. When L2 captures the prior request from L1, L2 will first execute requests with higher priority in the queue. The L1 contract will be into `Exodus` mode if the priority request is not processed after `expirationBlock` on L1.

### PendingBalance
During block processing when the contract executes token exit requests such as FullExit, Withdraw, ForcedExit with token flow, if the transaction fails there would be pending balance information. For example, when the contract transits 100 USDT to Alice, if the transaction fails, `pendingBalance[Alice][USDT] += 100`. Failure causes might be:

 * the gas of the transaction exceeds 100,000. There is a gas limit for every transaction which is supposed to be more than enough for normal eth transactions and ERC20 token transactions.
 * transaction fails. For example, the contract address refuses eth transactions.

Users may invoke `withdrawPendingBalance` and withdraw tokens.

### Exodus Mode

When users' L1 priority request is not executed in time, `activeExodus` can be called to activate `Exodus` mode, when all L1 transactions, block executions from the Validator, and acceptance executions from the Accepter will be rejected.

In `Exodus` mode, users can cancel their un-processed deposits by calling `cancelOutstandingDepositsForExodusMode`, and get the L2 balance information by calling `performExodus` and providing `exitProof` to the contract.

Since cross-chain Root Hash verification is needed in block execution, when a chain is in `Exodus` mode, the rest chains will enter `Exodus` mode in sequence because they are not able to execute blocks. The algorithm for the available token amount via `performExodus` on a specific chain is:

```
// allAmount is the total amount of token on all chains
const allAmount = chainAmount[0] + chainAmount[1] + ... + chainAmount[n];
// userPercent is the percentage of the user's token amount
const userPercent = userAmount / allAmount;
// userExodus[i] is number of tokens that the users is able to withdraw on chain_i
const userExodus[i] = userPercent * chainAmount[i];
```
For example, Alice holds 100 USDT on L2, and there are 4 chains connected to L2 whose sum of USDT is 1000 (among which Ethereum holds 500). Thus Alice owns 10% of the total USDT. When Alice calls `performExodus` on Ethereum she will get 50 USDT, and will have to call `performExodus` on the other three chains to withdraw the rest 50 USDT.

### Cross-Chain Root Hash Verification
The contract needs to verify the root hash on the other chains, comparing them with its Root Hash to guarantee the consistency. zkLink acquires the Root Hash on other chains via oracles.



## L2
L2 (Layer2) in zkLink refers to ZK-Rollup service that includes a state machine. L1 events and L2 transactions will trigger the change in state on L2. L2 transactions refer to those from L2 APIs including Transfer, Withdraw, OrderMatching, etc. L2 state changes are regularly pushed to L1, and the rollup operator generates a zero knowledge proof that includes transactions and state changes during a certain period of time, then the validator uploads the proof to L1.

## Account

An account is a component of L2 state, that includes:


| Name          | Description                                                   |
|-------------|------------------------------------------------------|
| address     | the ETH address of this account                                      |
| pubKeyHash  | the pubKeyHash set by ChangePubKey, not the pubKeyHash of the address |
| nonce       | similar to the nonce of ETH address on L1 chains                               |
| balanceTree | there are 8 balanceSubtree in a balanceTree that correspond to 8 sub accounts    |
| orderTree   | there are 8 orderSubtree in an orderTree that correspond to 8 sub accounts|
| pool_info   | record AMM and Curve pool related info                          |

Two ways to create a new account:
  * Deposit from L1 and designate the target address
  * Initiate a transfer on L2 and designate the target address

If the target address does not linked to any account, a new account will be created. The pubKeyHash must be set be before making any operation to the account, which is executed via ChangePubKey. If the address is an EOA address with a private key, the pubKeyHash will be the pubKey Hash of the L2 private key; if the address is a contract address generated by create2 with no private key, the pubKeyHash will be one of the salt input parameters during creating create2.

L2 private key is derived from the private key of EOA address:

```
EOA account private key (L1) -> sign the specific message -> signature as the seed to create L1 private key -> L2 private key -> L2pubKey -> pubKeyHash(L2address)
```
A user can control the account by the private key of EOA account. The L2 private key can be created again if lost, and change the pubKeyHash that controls the account via ChangePubKey. If the EOA account private key is lost, the user can still control the account with L2 private key.


For a contract address, there are two scenarios:
* If the address is created via create2 and complies with EIP-1271, assets on it can still be transferred or withdrawn by providing correct signature.
* For other contract addresses without a private key, there is no way to transfer assets but users can still withdraw tokens to L1 by ForcedExit.


The nonce of an account is to avoid double processing. Every L2 transaction is linked with a nonce that is consistent with the nonce of the according account. When the L2 transaction is finalized the account nonce will be added by 1.

There are 8 sub-accounts under each account that record token balance. For example, Alice holds 100 USDT in sub_account_0 and 200 ZKL in sub_account_1. The purpose of sub-accounts is to reduce the risk of concurrent operations. Without sub-accounts, Alice can transit her USDT to another account AFTER placing a ZKEX order selling USDT for BTC, which will fail when ZKEX tries to uploads this OrderMatching to L2 because there is no sufficient USDT in her account.

zkLink will tag a sub-account with a certain application, such as sub_account_1 for ZKEX. Users still hold full control of their sub-accounts with signature required for any sub-account operation. However, zkLink may restrict the operator of sub accounts, for example, sub_account_1 transactions can only be submitted by ZKEX in the following process:

```
Alice signs the sub_account_1 transaction -> ZKEX receives the transaction request with signature -> ZKEX sends the transaction to zkLink -> update the sub_account_0 of Alice
```

Sub_account_0 is not tagged to any specific application, which anyone can send transactions to.

```
Alice signs a sub_account_0 transaction -> the signed transaction is sent to zkLink -> sub_account_0 of Alice is updated
```

It is worth noticing that the sub-account mechanism can only solve L2 concurrent operations, and users can still withdraw tokens in their sub-accounts from L2 via FullExit from L1. zkLink will notify the application operators of sub-accounts (except for sub_account_0) before FullExit request is processed.


## Token

There are two concept in the definition of Token: Fungible Token(ERC20) and Non-Fungible Token(NFT). Currently zkLink only supports Fungible Token. Each kind of Token is encoded with a unique Token ID on L2. There are other attributes of tokens on L1 contracts:


| Name           | Description          |
|--------------|-------------|
| tokenId      | tokenId on L2  |
| paused       | true encoded as 'not deposit-able' |
| tokenAddress | token address     |

> 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE is encoded as gas fees.

Since the contract address of a token can be changed, zkLink allows Governor to change the contract address of tokens. zkLink allows Governor to forbid token deposit, but token withdrawal can be processed at any time.  

zkLink supports nonstandard ERC20 token, which refers to those that transaction fees might be charged to transfer-out or  transfer-in. For example, when Alice transfers 100 tokens to Bob, for nonstandard ERC20 tokens, 101 tokens might deducted from Alice's account (1% transaction fees included). In all cases the increase of L2 balance is subject to L1 contract: for example, Alice deposits 100 nonstandard ERC20 token but zkLink contract receives only 95, Alice's L2 account balance will be added by 95.

The same kind of token on different chains is encoded with the same tokenId on L2, such as USDT on Ethereum and USDT on BSC, despite their different chains and contract address, they share the same L2 tokenId.


## Transaction

Users update account states by transactions, such as pubKeyHash. Transactions are classified into two categories:
* L1 transaction, by calling L1 contract to generate an event;
* L2 transaction, by calling L2 API to send a transaction.

### L1 Transaction

A `NewPriorityRequest` event is generated with a L1 transaction, when L2 receives the request it will update the account state. There are two kinds of L1 transactions:
* Deposit
* FullExit

zkLink will prioritize all L1 transactions, and guarantees that zkLink will rollup all transactions and upload them to L1 even if the transaction does not change account status. Otherwise when a L1 transaction times out the contract will be in Exodus mode.

`totalOpenPriorityRequests` records the number of pending L1 transactions. On some public chains with high TPS and low gasPrice, a huge amount of invalid L1 transactions can be initiated that brings great pressure to L2 service since generating a Proof requires a certain computational cost. To avoid such DDOS attack, the amount of transactions is restricted on L1 that varies on different chains with the default value being 4096.

#### Deposit

A deposit transaction includes depositETH and depositERC20 that deposits tokens from L1 to L2. The number of tokens added to L2 balance is subject to the number increased on L1 contract. Deposits of the same kind of token on different chains (such as USDT on Ethereum and USDT on BSC) will be accumulated.

For example, Alice deposits 100 USDT from Ethereum, and 100 USDT from BSC, her L2 account will own 200 USDT.


#### FullExit

When users do not trust the service operator on zkLink, they can initiate FullExit and withdraw L2 tokens to L1. A user may initiate FullExit to other accounts but nothing will happen.

Note: when the number of a token on a L2 account exceeds the its balance on a certain chain, for example, Alice owns 200 USDT on L2 but there are only 100 USDT on zkLink contract on Ethereum. In this rare case FullExit will still succeed, but Alice can only withdraw 100 USDT to Ethereum, and has to initiate FullExit from other chains to withdraw the rest 100 USDT.

### L2 Transaction
L2 transactions include:
* ChangePubKey
* Transfer
* Withdraw
* ForcedExit
* OrderMatching

#### ChangePubKey
The pubKeyHash must be set before doing any operation with L2 account. To increase security level, ChangePubKey should also be verified on L1 in the following ways:
* ECDSA for EOA addresses. Users signs the new pubKeyHash with the private key of EOA address and the contract will verify whether the signature address is consistent with the account address.
* Create2 for ChangePubKey transaction initiated from L2. The account address must be created by create2 and the parameter 'salt' must include the pubKeyHash. This method can only be applied to accounts with no operation processed. i.e., nonce = 0.
* OnChain with two steps:
  * Step 1, call `setAuthPubkeyHash` on L1 contract to set up a new pubKeyHash;
  * Step 2, initiate a ChangePubKey transaction on L2 and choose the transaction type to OnChain. This method does not require any signature.

For an EOA address, the cost for ECDSA is the lowest; for an contract address that is created by zkLink create2, Create2 is the most cost-friendly way; For the rest addresses only OnChain is feasible.  


#### Transfer
In an EOA address, tokens can be transferred from one sub-account to a sub-account of another account.

```
from(accountId, subAccountId) => to(address, subAccountId)
```
If the to_address does not exist, a new account will be creased. Different sub0accounts can transfer to each other with the only limit that the sub-accounts under one account involved in a transaction can not be the same.

#### Withdraw

In an EOA address, L2 tokens in a sub-account can be withdrawn to L1 with a specified address and amount. zkLink will check if the amount of token exceeds the sum of L1 tokens. If yes, the transaction will be denied.

There are two forms of withdraw transactions:
* withdraw
* fast withdraw

The process of a withdraw transaction is:  

```
Alice initiates a withdraw -> zkLink rollups multiple transactions -> Commits block -> Prove block -> Exec block -> Alice receives tokens
```

The process of a fast withdraw transaction is:  

```
Alice initiates a withdraw -> zkLink rollups multiple transactions -> Commits block -> Prove block -> Exec block -> the broker receives the token -> the broker transfers to Alice from L1 -> Alice receives tokens
```

Since the broker can transfer to Alice immediately once the broker receives Alice's L2 request, the transaction speed of a fast_withdraw is much faster than a withdraw transaction. There will be acceptance fee for the broker. For example, Alice initiates a fast_withdraw request with 10,000 USDT and sets the acceptance fee to be 2%, Alice will receive 9,980 USDT and pay the rest 20 USDT to the broker.

The broker is required to transfer to the user's L1 account immediately once the request is received and transfers 9,980 USDT to Alice. When Alice's Withdraw transaction is finalized on L2, the broker will receive 10,000 USDT in the pending balance. If no broker is available for Alice's fast_withdraw request, this fast_withdraw request will be executed as a withdraw transaction.

#### ForcedExit

If an account address is a contract address and can not set up a pubKeyHash, token withdrawal from this address to L1 can only be executed via a ForcedExit transaction. Any account can initiate this transaction whose transaction fee will be paid by the initiator. Similar to FullExit, the available token amount is restricted by the L1 balance of this token on each chain.

#### OrderMatching

OrderMatching is used for atomic exchange between two different accounts that includes the following information:


| Name         | Description             |
|------------|----------------|
| submitter  | the account that submits the transaction        |
| taker      | the information of the taker order           |
| maker      | the information of the maker order           |
| baseToken  | the base token of this transaction, such as BTC  |
| quoteToken | the quote token of this transaction, such as USDT |
| price      | the price in the transaction            |
| amount     | the token amount in the transaction           |

The submitter collects the order making information, matches taker and maker orders, and submits OrderMatching transactions. Any account can be a submitter. The submitter will be charged with L2 transaction fees.

Maker and taker orders include the same information:

| Name             | Description             |
|----------------|----------------|
| account_id     | the account id           |
| sub_account_id | the sub-account id          |
| slot_id        | the slot of the order         |
| nonce          | the nonce of the order        |
| base_token_id  | the token id of the base token     |
| quote_token_id | the token id of the quote token     |
| amount         | the amount of the base token |
| price          | the base token price  |
| is_sell        | whether it is a buy order or a sell order        |
| time_range     | time range     |
| signature      | signature      |

OrderMatching can realize order book transactions that supports multiple order making, cancellation, and partial fulfillment. If the nonce used during order making is the user's account nonce, only one order can be made and the user can only make the next order after the last one is fully fulfilled. To support multiple order making, zkLink introduces order nonce.

There are 16 order slots in each sub-account, with each slot linked with a nonce, for example:

| Slot0 | Slot1 | Slot2 | Slot3 | Slot4 | Slot5 | Slot6 | Slot7 | ... | Slot15 |
|-------|-------|-------|-------|-------|-------|-------|-------|:----|:-------|
| 0     | 2     | 4     | 0     | 7     | 9     | 23    | 1     |     | 122    |

A user can choose any vacant slot to make an order. A vacant slot refers to the slot that is not taken by any order. For example, if slot5 is vacant, the nonce of the order can be set as 5 (similar to account nonce). 16 slots means that a user can make up to 16 orders, which meets most users' needs.

To support partial fulfillment, each slot will record the current amount of the rest orders. For example, in slot5 the total amount of the current order is 1,000 USDT and 800 of them have been fulfilled. When other OrderMatching transactions match this oder, at most 200 USDT can be fulfilled.

Apart from nonce and the rest amount, the slot also records the sig hash to the order for the purpose of cross check.


#### Transaction Fees
L2交易需要支付一定的手续费。需要补充的细节：

* 哪些token可以作为手续费
* 手续费率
* 交易中由哪个账户支付手续费




## Block(on-chain)

A block contains all L1 and L2 transactions. The same block data is submitted to all chains connected, and the contract on each chain only needs to process transactions related only its chain. To reduce the cost for the Validator to submit blocks, zkLink will publish Rollup pubdata to the chain with minimum cost.


Theoretically, anyone may submit a block, but to avoid status conflict, only the Validator can submit blocks.

### Structure
| Field                    | type  | Length(bytes) | Remarks                                   |
|-----------------------|-------|-----------|--------------------------------------|
| block_number          | U32   | 32        | block number                         |
| fee_account_id        | U32   | 32        | layer2 collect-fee account           |
| old_state_hash        | U256  | 256       | the new state root of previous block |
| new_state_hash        | U256  | 256       | the newest state root of this block  |
| timestamp             | U64   | 64        | block timestamp                      |
| onchain_op_commitment | Bytes | flexible  | record offset commitment             |
| public_data           | Bytes | flexible  | layer2 compressed transaction        |

### Block Commitment
1. hash1 = *sha256*( **block_number** + **fee_account_id** )
2. hash2 = *sha256*( hash1 + **old_state_hash** )
3. hash3 = *sha256*( hash2 + **new_state_hash** )
4. hash4 = *sha256*( hash3 + **timestamp** )
5. ***blockCommitment*** = *sha256*( hash4 + **onchain_op_commitment** + **public_data** )

## Role
### User

A user refers to a zkLink user who can `Deposit`, `FullExit`, `withdrawPendingBalance`, and `setAuthPubkeyHash` on L1 when the user can not `ChangePubKey` on L2.

When a user finds the L1 transaction is not executed in time, the user can also execute `activateExodusMode` to activate `Exodus` mode to process `performExodus` and `cancelOutstandingDepositsForExodusMode` for refund.

A user can initiate L2 transactions via L2 APIs.

### Accepter

An accepter can accept users' fast_withdraw transactions who has access to zkLink fast_withdraw requests and transfers to users via `accept` API in L1 contracts. The fast_withdraw transaction must be finalized before the withdrawal request is executed on L1.


### Validator

A validator can call some of L1 APIs such as `commitBlocks`, `proveBlocks`, `revertBlocks`, `executeBlocks` to manage blocks.

### Governor

A governor can call some of L1 APIs such as `addToken`, `addTokens`, `setTokenPaused`, `setTokenAddress` to manage token list information, can manage validator list by calling `setValidator`, and can change the governor by calling `changeGovernor`.

### Oracle

The oracle is used to pass multi-chain root hash to L1.

### Service Operator

The service operator is the operator of zkLink L2 service that:
* captures L1 events
* executes L2 transactions
* runs the state machine
* batches blocks
* generates witness(ProveData)
* submits proofs and all transactions to L1


### Prover
The prover generates zero knowledge proofs.
