---
sidebar_position: 6
title: ' '

---

# Withdraw to L1

---
zkLink supports dApp users to withdraw funds to any blockchains connected, regardless of the origin of the token.


> 💡 E.g., a user deposit a certain number of USDC from Ethereum to zkLink, and they can withdraw USDC to Starknet, without navigating outside zkLink to find a third-party token bridge.

![Withdrawal Flow](../../static/img/flow-withdraw.jpg)

---
## Step 1: Withdrawal Request

The user initiate a withdrawal request from his/her zkLink L2 wallet, and sign it, calling a withdraw function with the following parameters:

```python
withdraw: {
	  chain_id: ChainId;
		account_id: AccountId;
		from: Address;
		to: Address;
		token: TokenId;
		amount: BigUint;
		fee: BigUint;
		nonce: Nonce;
  }
```

| Name | Description |
| --- | --- |
| withdraw.chain_id | The chain ID of the target chain |
| withdraw.account_id | zkLink network account ID of the transaction initiator |
| withdraw.from | Address of L2 account to withdraw funds from |
| withdraw.to | Address of L1 account to withdraw funds |
| withdraw.token | Type of token for withdrawal. Also represents the token in which fee will be paid |
| withdraw.amount | Amount of funds to withdraw. |
| withdraw.fee | Fee for this transaction. |
| withdraw.nonce | Current account nonce |

---
## Step 2: Check and execute

zkLink service verifies the transfer request:

- valid signature
- the token amount in the user’s L2 wallet minus pending balance is greater than the amount of the withdrawal request
- the request has not expired
- the request has never been executed before

---
## Step 3&4: Commit and prove

The withdrawal transaction is included in a batch and committed to L1.

zkLink L2 service generates a validity proof and uploads it separately to L1 for verification.

---
## Step 5: Verification

zkLink L1 smart contract verifies the `r_proof` using zero knowledge, and emits log( `final_root`).

---
## Step 6: Send executed_tx to L1

---
## Step 7: Transfer token to L1 address

The right amount of tokens will be transferred from the zkLink L1 contract to the target L1 address. The withdrawal transaction from L2 to L1 is then finalized.
