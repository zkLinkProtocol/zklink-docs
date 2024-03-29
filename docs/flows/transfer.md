---
sidebar_position: 6
title: ' '

---

# Transfer

---
Transfer token between any two zkLink L2 addresses.

![Transfer Flow](../../static/img/flow-transfer.jpg)

---
## Step 1: Transfer Request

The user initiates a transfer request from their zkLink L2 wallet, and signs it, calling a transfer function with the following parameters:

```python
transfer: {
		account_id: AccountId;
		from: Address;
		to: Address;
		token: TokenId;
		amount: BigUint;
		fee: BigUint;
		nonce: Nonce;
		ts: TimeStamp;
  }
```

| Name | Description |
| --- | --- |
| transfer.account_id | zkLink network account ID of the transaction initiator |
| transfer.from | Address of L2 account to transfer funds from |
| transfer.to | Address of L2 account to transfer funds to |
| transfer.token | Type of token for transfer. Also represents the token in which fee will be paid |
| transfer.amount | Amount of funds to transfer. |
| transfer.fee | Fee for this transaction. |
| transfer.nonce | Current account nonce |
| transfer.ts | The time stamp for this transaction |

---
## Step 2: Check and Execute
The zkLink service verifies the transfer request.

Once it passes, the zkLink service executes the transaction request and sends the token from the source address to the target address.

---
## Step 3: Commit
The transfer is included in a batch and committed to L1.

---
## Step 4: Prove
The zkLink L2 service generates a validity proof and separately uploads it to L1 for verification.

---
## Step 5: Verification
The zkLink L1 smart contract verifies the proof using zero knowledge and emits log( `final_root`).

---
## Step 6: Send Executed Transaction to L1
The transfer is settled with finality.
