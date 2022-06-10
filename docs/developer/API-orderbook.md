---
sidebar_position: 6
title: ' '

---

# API-Order Book

---
## Http Interface
The output format of http interface is:

```
{
    "success": true, // Whether calling interface was successful or not.
    "errMsg": string, //If calling interface was rejected, this field will contain the description of an error.
    "data": any //Interface data that varies.
}
```


### `GET` /getSymbols

Returns the list of order book trading pairs

#### Response

```json
{
    "success": true,
    "errMsg": null,
    "data": [
        {
            "symbolId": 0,
            "baseCurrency": 0,
            "quoteCurrency": 1
        }
    ]
}
```

- symbolId: the only unique identifier of a trading pair.
- baseCurrency: the subject matter of a trading pair. For example, the baseCurrency is BTC in the trading pair `BTC/USDT`.
- quoteCurrency: the pricing token of a trading pair. For example, the quoteCurrency is USDT in the trading pair `BTC/USDT`.


### `POST` /placeOrder

To place an order

####  Payload

```json
{
    "symbolId":0,
    "uid":1,
    "orderId":0,
    "price":"40300",
    "amount":"1.2",
    "orderAction":1,
    "slotId":0,
    "nonce":0,
    "validFrom":0,
    "validUntil":100,
    "pubKey":"123",
    "signature":"abc"
}
```

- symbolId: the only unique identifier of a trading pair.
- uid: the L2 account id of a user.
- orderId: the unique order id returned from the front-end.
- price: the limit price of the order.
- amount: the amount of token of the order.
- orderAction: a boolean with 0 encoded as sell order and 1 as buy order.

> Note: price and amount should be amplified to 18 digits before encoding in an order signature.

#### Response

```json
{
    "success": true,
    "errMsg": null,
    "data": null
}
```



### `GET` /getOrderBook/{symbolId}

To search order book by trading pairs

#### Response

```json
{
  "success": true,
  "errMsg": null,
  "data": {
    "symbolId": 0,
    "asks": [],
    "bids": [
      {
        "price": "40300",
        "amount": "1.2",
        "orders": 1
      }
    ]
  }
}
```

- symbolId: the unique id of a trading pair
- asks: the sell order
- bids: the buy order
  - price: limit price
  - amount: the token amount
  - orders: the amount of orders in this price



### `GET` /getLatestTick/{symbolId}

Returns the latest tick info


#### Response

```json
{
  "success": true,
  "errMsg": null,
  "data": {
    "symbolId":0,
    "price":"40000",
    "amount":"0.1",
    "takerAction":0
  }
}
```

- symbolId:the unique id of a trading pair
- price: the limit price
- amount: the token amount
- takerAction: a boolean with 0 encoded as sell order and 1 as buy order.

If null returns：

```json
{
    "success": false,
    "errMsg": "Latest tick not found",
    "data": null
}
```



### `GET` /getUserOrders/{uid}/{symbolId}

To search orders by trading pairs


#### Response

```json
{
    "success": true,
    "errMsg": null,
    "data": [
        {
            "orderId": 0,
            "price": "40300",
            "amount": "1.2",
            "filled": "0",
            "orderAction": 1,
            "uid": 1,
            "timestamp": 1643093333691,
            "slotId": 0,
            "nonce": 3
        }
    ]
}
```

- orderId: order id
- price: the limit price
- amount: the token amount
- filled: the amount of token that has been filled
- orderAction: a boolean with 0 encoded as sell order and 1 as buy order
- uid: user id
- timestamp: the timestamp of the order measured by millisecond
- slotId: the slot id
- nonce: the nonce in that slot



### `GET`  /getUserFreeze/{uid}/{currency}

Returns a user's token value frozen by pending orders.

#### Response

```json
{
    "success": true,
    "errMsg": null,
    "data": "100"
}
```



### `POST` cancelOrder

To cancel an order

#### Payload

```
{
    "symbolId":0,
    "uid":0,
    "orderId":0
}
```

#### Response

```
{
    "success": true,
    "errMsg": null,
    "data": null
}
```



## Websocket Interface

Websocket interface is used to receive trading info and push orderbook updates. To establish a websocket connection with a server:

```
websocket = Stomp.client("ws://host:port/websocket");
websocket.connect();
```

You may refer to the examples in [client.html](https://github.com/zkLinkProtocol/zklink-exchange/blob/master/client.html).

### Subscribe /tick/{symbolId}

To receive the dealing info of a trading pair.


```
{
    "symbolId":0,
    "price":"40000",
    "amount":"0.1",
    "takerAction":0
}
```

- symbolId:the unique id of a trading pair
- price: the limit price
- amount: the token amount
- takerAction: a boolean with 0 encoded as sell order and 1 as buy order.


### Subscribe /orderBook/{symbolId}
To receive the orderbook updates by trading pairs. The data is the same as `getOrderBook`.

The front-end catches orderbook info for the first time by http interface, and updates the orderbook by `subscribe`orderbook.


## Encoding

Encoding of an order

| name           | rule                         |
| -------------- | -----------------------------|
| MSG_TYPE       | 0xff                         |
| account_id     | 4 bytes                      |
| slot_id        | 1 bytes                      |
| nonce          | 4 bytes                      |
| base_token_id  | 2 bytes                      |
| quote_token_id | 2 bytes                      |
| price          | 15 bytes                     |
| is_sell        | 1 bytes                      |
| amount         | refer to SDK                 |
| valid_from     | 8 bytes                      |
| valid_until    | 8 bytes                      |



> valid_from is pre-set to be 0; valid_until is pre-set to be 9007199254740991.

OrderMatching

| name         | rule                                  |
| :----:       | :----:                                |
| MSG_TYPE     | 0x0f                                  |
| account_id   | 4 bytes                               |
| address      | 20 bytes                              |
| nonce        | 4 bytes                               |
| orders_hash  | rescue_hash to maker order and taker order |
| fee_token_id | 2 bytes                               |
| fee          | refer to SDK                          |

The pseudocode of rescue_hash is：

```java
bytes order1 = maker code
bytes order2 = taker code
bytes padding = zero fill(until the length of hash reaches 178)
bytes orders_hash = rescue_hash(order1+order2+padding)
```

Coding examples：

```Java
L2Order order0 = L2Order.builder()
                .accountId(1)
                .slotId(0)
                .nonce(0)
                .baseTokenId(1)
                .quoteTokenId(2)
                .price(BigDecimal.valueOf(1).movePointRight(18).toBigInteger()) // 1e18
                .amount(BigInteger.valueOf(10)) // 10
                .isSell(1)
                .timeRange(new TimeRange(0, 9007199254740991L))
                .build();
// ff00000001000000000000010002000000000000000de0b6b3a76400000100000001400000000000000000001fffffffffffff

L2Order order1 = L2Order.builder()
                .accountId(2)
                .slotId(0)
                .nonce(0)
                .baseTokenId(1)
                .quoteTokenId(2)
                .price(BigDecimal.valueOf(1).movePointRight(18).toBigInteger()) // 1e18
                .amount(BigInteger.valueOf(10)) // 10
                .isSell(0)
                .timeRange(new TimeRange(0, 9007199254740991L))
                .build();
// ff00000002000000000000010002000000000000000de0b6b3a76400000000000001400000000000000000001fffffffffffff

L2Swap swap = L2Swap.builder()
                .submitterId(3)
                .submitterAddress("0x1a80df7777d5f542875b881eec2be4362b9dcfc2")
                .maker(order0)
                .taker(order1)
                .nonce(0)
                .feeToken(1)
                .fee(BigInteger.ZERO) // 0
                .build();
// 0f000000031a80df7777d5f542875b881eec2be4362b9dcfc200000000dc98a6bb8726b9cad4a21737fa8c9bd0e24c174e0b71b5c273d7328d506b6200010000
```
