---
sidebar_position: 6
title: ' '

---

# Commit Block


zkLink L2 state machine is driven by two types of events:

- On-chain events on L1
- L2 transactions

Unlike protocols such as zkSync, which only receive events from a single L1 chain, zkLink accepts events from multiple L1 chains, which brings up an issue: each L1 contract can only verify the correctness of events from its own chain, and has no ability to verify the events of other L1s. For example, a validator can forge a deposit from BSC in a block uploaded to Ethereum, and Ethereum has no ability to verify whether this deposit is true.

To solve this problem, zkLink introduces an independent inter blockchain general messaging service that transmits a hash value cross different chains. Each L1 contract verifies events related to its L1 chain, and also informs other L1s of the events it verifies. By collecting all the event verified by other chains, an L1 contract is able to know whether the block data uploaded by the validator is correct.

## **Full Commit**

Events that need to be verified on-chain include: Deposit, ChangePubKey, Withdraw, ForcedExit, and FullExit, among which, Deposit and FullExit are initiated from L1, and the related data is also stored on L1. An on-chain event contains an attribute called chainId, indicating which chain the event is from.

Let’s assume that there are 2 chains connected to zkLink L2: Ethereum and BSC, and the validator commits the following pubdata in the block:

```

[op0][op1][op2][op3][op4][op5][op6]
The Ethereum OPs are: op0,op3,op4
The BSC OPs are: op1,op2,op5,op6
Among that, op0,op2,op4, and op5 belong to events that need to be verified on-chain, where op0 is a Deposit and op5 is a FullExit.

```

According to chainId, Ethereum will only verify op0, op3, and op4; also, since op0 is a Deposit, it also needs to be cross checked with the account info. BSC works in the same way. The verification process outputs an offsetsCommitment, indicating the position of the verified op in pubdata. For example, the offsetsCommitment output of this case (regardless the chunk number of op) is [1,0,1,0,1,1,0], where 1 means that this is an event that needs to be verified on-chain, otherwise it is 0.

The block commitment can be calculated with pubdata and offsetsCommitment:

```

// This is pseudo code, and the actual calculation process also needs to include some other block information
commitment = sha256(pubdata+offsetsCommitment)

```

The cross-chain general messaging service needs to transmit this commitment between different L1s.

Next, we discuss the ability of the validator to play maliciously:

- Can the validator input a Polygon Deposit to the state machine?

    No, because the state machine specifies which chains the events are from can be accepted as input.

- Can the validator forge a BSC Deposit to the state machine?

    No, because the Deposit will be uploaded to the L1 contract and cross-checked with the contract record.

- Can the validator forge a BSC Deposit to the state machine but not include this deposit in the committed block?

    No, although the block can be committed, the prove process will fail because the committed data is different from the prove pubdata.

- Can the validator omit the on-chain verification of a non-priority request in the submitted block, such as Withdraw?

    No, although the block can be committed, the prove process will fail because the committed data is different from the prove offsetsCommitment.

- Is it possible to have two identical state machines and to forge a BSC deposit in the Ethereum state machine?

    No, although the block can be committed on Ethereum, the pubdata is different with it on BSC, resulting in inconsistent commitment which would not pass the cross-chain block verification.


Thus we can conclude that validator is unable to cheat with block verification via the cross-chain general messaging service. However, in the process above, the block pubdata committed to Ethereum contains a lot of noice unrelated to Ethereum transactions, which leads to a high cost of committing blocks on Ethereum.

## **Compressed Commit**

To solve the cost problem mentioned above, zkLink introduces a brand-new block commit method: compressed block commit. The pubdata uploaded to Ethereum is truncated, non-Ethereum related op will be deleted (even some Ethereum related OPs like Transfer will be deleted)

```

//Ethereum block pubdata only contains
[op0][op4]
```

But with some extra data:

```cpp
struct CompressedBlockExtraInfo {
	bytes32 publicDataHash; // pubdata hash of all chains
	bytes32 offsetCommitmentHash; // all chains pubdata offset commitment hash
	bytes32[] onchainOperationPubdataHashs; // onchain operation pubdata hash of the all other chains
}
```

Now the commitment becomes:

```cpp
// This is pseudo code, and the actual calculation process also needs to include some other block information

commitment=sha256(sha256(pubdata)+sha256(offsetsCommitment))
```

In non-compressed model, the block commitment has to  be calculated with pubdata, thus Validator is unable to forge pubdata, otherwise zk_prove will fail. However, in compressed model, commitment can be calculated with the extra data that Validator submits, thus Validator can forge pubdata and provide the correct publicDataHash. We continue to discuss the ability of the validator to play maliciously:

- Is it possible to cook op4 (for example, a Withdraw), such as changing the owner into another address?

    Yes, because the Ethereum contract cannot verify an OP such as Withdraw during commitment, i.e., cannot verify is the data in this OP is part of pubdata. But BSC contract has this info, since BSC contract records full pubdata.


So apart from the commitment, the cross-chain general messaging service also needs to pass on the pubdata hash of on-chain OPs from all the chains connected. The calculation on BSC is:

```cpp
ethOnchainPubdataHash = keccak256(keccak256(op0)+op4)
bscOnchainPubdataHash = keccak256(keccak256(op2)+op5)
onchainPubdataHash = keccak256(ethOnchainPubdataHash+bscOnchainPubdataHash)
```

On Ethereum, we also include the onchainOperationPubdataHashs of CompressedBlockExtraInfo in the calculation:

```cpp
ethOnchainPubdataHash = keccak256(keccak256(op0)+op4)
bscOnchainPubdataHash = onchainOperationPubdataHashs[BSC_CHAIN_ID]
onchainPubdataHash = keccak256(ethOnchainPubdataHash+bscOnchainPubdataHash)
```

By inter-communicating the onchainPubdataHash,  on Ethereum, the Validator will not be able to change, forge or omit any on-chain OP. In the contract, cross-chain verification is applied with the syncHash that is calculated from blockCommitment and onchainPubdataHash.

```cpp
syncHash = keccak256(commitment, onchainPubdataHash)
```

## Security Issues during cross-chain verification

If every block is verified via the cross-chain general messaging service, it is true that the Validator will not be able to forge pubdata under compressed model; but the cost would be too high. Can we perform cross-chain verification at certain intervals instead of verifying every block? The answer is no. Consider the following scenario:

### Example

**Conditions**

- ETH: compressed commit
- BSC: uncompressed commit

**Initialization**

- the state machines on ETH and BSC are two separate ones
- the block#0 on Ethereum and BSC is identical, i.e., the initial state of the two state machines is identical

**Block 1**

- Alice deposits 1000 USDT on ETH.
- ETH state machine forges a deposit of 500 USDT by Bob on BSC.
- ETH state machine forges a withdraw of 500 USDT by Bob to Ethereum L1.

ETH state machine:

| User | USDT |
| --- | --- |
| Alice | 1000 |
| Bob | 0 |
| ETH reserve | 500 |
| BSC reserve | 500 |

BSC state machine:

| User | USDT |
| --- | --- |
| Alice | 1000 |
| Bob | 0 |
| ETH reserve | 1000 |
| BSC reserve | 0 |

At this point, the stateHash of the two state machines will be different, i.e.,

```cpp
eth_state_hash_1 != bsc_state_hash_1
```

ETH forges on-chain pubdata and constructs extraInfo according to the BSC state machine. The StoredBlockInfo on the two chains are:

```cpp
// eth
const storedBlockInfo = {
    blockNumber:1,
    priorityOperations:1,
    pendingOnchainOperationsHash:eth_pending_onchain_hash_1,
    timestamp:1680610760,
    stateHash:bsc_state_hash_1,// the actual value is eth_state_hash_1
    commitment:bsc_commitment_1,// the actual value is eth_commitment_1
    syncHash:eth_sync_hash_1_fake // the actual value is eth_sync_hash_1，but the calculation includes the onchainPubdataHash from ETH
  // resulting in eth_sync_hash_1_fake != bsc_sync_hash_1
}

// bsc
const storedBlockInfo = {
    blockNumber:1,
    priorityOperations:0,
    pendingOnchainOperationsHash:empty_hash,
    timestamp:1680610760,
    stateHash:bsc_state_hash_1,
    commitment:bsc_commitment_1,
    syncHash:bsc_sync_hash_1
}
```

**Block 2**

Neither state machine has changed. The BSC state machine is still used to construct on-chain data on Ethereum, resulting in the consistent syncHash on both chains.

```cpp
// eth
const storedBlockInfo = {
    blockNumber:2,
    priorityOperations:0,
    pendingOnchainOperationsHash:empty_hash,
    timestamp:1680610761,
    stateHash:bsc_state_hash_2,
    commitment:bsc_commitment_2,
    syncHash:bsc_sync_hash_2
}

// bsc
const storedBlockInfo = {
    blockNumber:2,
    priorityOperations:0,
    pendingOnchainOperationsHash:empty_hash,
    timestamp:1680610761,
    stateHash:bsc_state_hash_2,
    commitment:bsc_commitment_2,
    syncHash:bsc_sync_hash_2
}
```

Block 2 can be successfully synchronized across chains, which means cross-chain synchronization cannot ensure the correctness of Block 1 unless every block is synchronized across chains.

### Solution

A new formula is adopted for the calculation of syncHash:

```cpp
syncHash = keccak256(preBlock.syncHash, commitment, onchainPubdataHash)
```

Continuing with the previous example, the syncHash calculation for the two chains during the commitment of Block 2 is as follows:

```cpp
// eth
eth_sync_hash_2 = keccak256(eth_sync_hash_1_fake, bsc_commitment_2, empty_hash)

// bsc
bsc_sync_hash_2 = keccak256(bsc_sync_hash_1, bsc_commitment_2, empty_hash)
```

Since eth_sync_hash_1_fake is different from bsc_sync_hash_1, eth_sync_hash_2 and bsc_sync_hash_2 are also different, and thus the cross-chain block verification will not pass.

## Disabling zk verification in compressed mode

The security assumption of zkLink is that Validator and general messaging service cannot conspire with each other. Based on this premise, a new architecture is proposed:

- Cancel zk verification on the chains under compressed commitment mode.
- Continue zk verification on the chain under full commitment mode.
- Allow cross-chain verification to occur after a certain number of blocks.

If the general messaging service is honest, can the Validator still cheat? We believe not, because cross-chain verification ensures that the data committed in compressed mode must be the same as that committed in full mode, while zk verification in full commit mode ensures the correctness of data.
