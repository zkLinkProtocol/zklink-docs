---
sidebar_position: 6
---

# API-AMM

---
### `POST` /api/balances

Returns the user's account info

#### Payload

```json
{"account_address":"0x3D809e414BA4893709c85f242Ba3617481Bc4126"}
```

#### Response

```json
{
    "code": "0",
    "data": [
        {
            "balance": "39994966500622468597513",
            "chain_id": 2,
            "symbol": "USDC",
            "coin_id": 3
        }
    ]
}
```
- balance: the number of tokens
- chain_id: the chainID of that token
- coin_id: tokenID, starting from 0 on each chain; usually gas token is encoded as 0.


### `GET` /api/token_pairs

Returns the list of supported liquidity pairs

#### Response

```json
{
    "code": "0",
    "data": [
        {
            "id": "4",
            "token_in_pool": 2,
            "amplifier": "85",
            "chains": [
                3,
                4
            ],
            "tokens": [
                3,
                2
            ],
            "lp_token": 130,
            "pool_name": "3:3-4:2",
            "address": "0x8d288552022345d58ab03260c9b17224ac50a2e8",
            "zklTokenId": 1,
            "apy": 0
        }
    ]
}
```


### `GET` /api/tokens

Returns the list of supported tokens

#### Response

```json
{
    "code": "0",
    "data": [
        {
            "id": 0,
            "address": "0x0000000000000000000000000000000000000000",
            "symbol": "MATIC",
            "decimals": 18,
            "stable": false,
            "fast_withdraw": false,
            "chain_id": 1
        }
    ]
}
```
- id: tokenID, starting from 0 on each chain with gas token encoded as 0 and LP tokens encoded from 128.
- stable: subject to the token configuration docs in github-zklink-static.
- fast_withdraw: subject to the token configuration docs in github-zklink-static.



### `POST` /api/tx

Returns to transaction record

#### Payload

```json
{"account_address":"0x3d809e414ba4893709c85f242ba3617481bc4126","tx_type":"CurveSwap","count":10}
```

- tx_type: 'Withdraw' | 'Transfer' | 'Deposit' | 'Swap' | 'AddLiq' | 'Liquidity' | 'RemoveLiquidity' | 'QuickSwap' | 'Mapping' | 'CurveQuickSwap' | 'CurveSwap' | 'L2CurveAddLiq' | 'L2CurveRemoveLiquidity'

#### Response

```json
{
    "code": "0",
    "data": [
        {
            "block_number": "36",
            "tx": {
                "ts": 1646035538,
                "fee": "18000000000000000",
                "type": "CurveSwap",
                "nonce": 6,
                "account": "0x3d809e414ba4893709c85f242ba3617481bc4126",
                "chainIn": 1,
                "tokenIn": 2,
                "adminFee": "7499998140881",
                "amountIn": "6000000000000000000",
                "chainOut": 4,
                "tokenOut": 3,
                "accountId": 1,
                "amountOut": "5984998516423407463",
                "signature": {
                    "pubKey": "a6986e4c8a4dd87a18c251fdc9f4961d9a19181facee1dc444d149a80997d022",
                    "signature": "72d12d4210e5ad0e3a15c85b55d02dff229c90b559acb8bceabb4337f8980a2d09a5e7100efb9f97c1a6a8d32df61df84238e5764570acefc824566125f7cc01"
                },
                "validFrom": 0,
                "validUntil": 4294967295,
                "pairAddress": "0xd26b50e9d4052bc0ea3ecc8706ef692d95be922b",
                "amountOutMin": "5979013517000000000"
            },
            "tx_hash": "0xaa6379daed44f69355f28169b2b8f57ecd0ec05fc99c858b1bdf9d6c2b6e88ea",
            "created_at": "2022-02-28T08:05:39.816Z",
            "from_account": "0x3d809e414ba4893709c85f242ba3617481bc4126",
            "to_account": "0xd26b50e9d4052bc0ea3ecc8706ef692d95be922b",
            "success": true,
            "fail_reason": null,
            "commited": true,
            "verified": false,
            "status": 1
        }
    ]
}
```
