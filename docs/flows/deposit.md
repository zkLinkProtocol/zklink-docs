---
sidebar_position: 6
title: ' '

---

# Deposit to L2

---
Developers of each dApp built on top of the zkLink L2 ecosystem define their own business logic. To use these applications, a user must deposit to the zkLink L2 wallet.

A user first initiates a deposit request to the on-chain zkLink smart contract. A Layer1_Watcher on zkLink Layer2 network is constantly monitoring L1 smart contract logs, and synchronizing the parameters of each request. zkLink service will update the user account once it receives the request and checks it.

![Deposit Flow](../../static/img/flow-deposit.jpg)

---
## Step 1: Deposit Request

Once the user signs the deposit transaction, a deposit function is called with the following parameters:

```python
deposit: {
    from_chain_id: ChainId;
		from: Address;
		token: TokenId;
		amount: BigUint;
		to: Address;
		serial_id: u64;
		eth_hash: H256;
  }
```

| Name | Description |
| --- | --- |
| deposit.from_chain_id | The chain ID of sender |
| deposit.from | Address of the transaction initiator's L1 account |
| deposit.token | Type of deposited token |
| deposit.amount | Amount of tokens deposited. |
| deposit.to | Address of zkLink L2 account that the deposit funds is transferred to. |
| deposit.serial_id | serial id for unique tx_hash |
| deposit.eth_hash | serial id for unique tx_hash |

> 💡 Users can use their deposit on zkLink ecosystem immediately once the transaction is committed the zkLink. There is no need to wait until the verification process is finished.


---
## Step 2: Emit event log (params)

After 10 blocks’ confirmation, the zkLink L2 service receives the deposit request with all the parameters.

---
## Step 3: Check and execute

The zkLink service verifies the validity of the deposit request to ensure:

- valid signature
- there is enough token in the pending balance that is locked in the L1 vault
- the request has never been executed before

Once it passes, the user’s zkLink L2 account state will be updated.

---
## Step 4&5: Commit and prove

The deposit transaction is included in a batch and committed to L1.

zkLink L2 service generates a validity proof and uploads it separately to L1 for verification.

---
## Step 6: Verification

zkLink L1 smart contract verifies the `r_proof` using zero knowledge, and emits log( `final_root`).

---
## Step 7: Send executed_tx to L1

Remove the according amount from the pending balance. The deposit transaction is settled with finality.
