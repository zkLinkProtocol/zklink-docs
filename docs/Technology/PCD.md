---
sidebar_position: 1
title: ' '

---

# Multi-Chain Liquidity Aggregation
---
zkLink initiates the [*protocol-controlled-debt (PCD)*](https://liquid.salon) in  multi-chain interoperability that aggregates the segmented liquidity from connected blockchains. The PCD mechanism is deployed via a contract on connected blockchains to safely mint any stablecoin / stablecoin LP into zUSD (a ERC-20 token), which is then directly mapped to the zkLink L2 network as vUSD (always pegged 1:1).

## Protocol Controlled Debt

As the collateral can only be stablecoins and stablecoin LPs, it is feasible for the protocol to take control of debts and collaterals: the protocol has the right to initiate a collateral sale  in order to buy back zUSD, in the case of non-liquidation.

> **✨** As an example: Alice holds zUSD and wants USDC. The protocol will sell the collaterals into USDC for Alice with a pre-set rule, and burn the zUSD received from Alice and cut the debt accordingly involved in the collateral sale.   

### Functionalities of PCD
- Users lend collateral to PCD protocol for a certain credit line of zUSD;
- Users borrow zUSD from the protocol;
- Debt holders (traders who loan zUSD from the PCD contract) repay the debt;
- Debt holders repossess the collateral;
- Users sell zUSD to the protocol and buy certain kinds of stablecoins (e.g., USDC, BUSD, HUSD);
- Liquidation of collateral when the price decreases.

### Liquidation & collateral value
- Current exchange rates of each supported asset are maintained by a price oracle;
- Anyone can trigger liquidation.

### Extra yield of collateral
PCD protocol supports extra yield earning for collaterals under the condition if the yield strategy:
- Can only ever grow in token amount;
- Can be deposited and withdrawn at will.

## zUSD Price Self-rebalance (An Arbitrage Model)
- When the price of zUSD is < $1, debt holders will be motivated to pay their debt on L1 by purchasing vUSD with other stablecoins deposited to L2. Thus the price of zUSD is inclined to increase;
- When the price of zUSD is > $1, investors will tend to open a position and borrow (mint) zUSD by collateralizing other stablecoins, and to further sell vUSD on L2 in exchange for other assets. Thus the price of zUSD is inclined to decrease.

## zUSD Circulation
- Debt holders pay debt with zUSD and withdraw collaterals at will;
- Non-debt-holders sell zUSD to the protocol for reserve-backed stablecoins (e.g., USDC, BUSD, etc.). PCD then sells the collaterals by pre-set rules for the demanded reserve-backed stablecoins. The debt involved in the trade will be accordingly cut for debt holders automatically by PCD. Since the collaterals can only be stablecoins, the price fluctuation in the collateral sale is negligible, and the zUSD sold will be burnt;
- The transaction fees of selling zUSD to the protocol are partly compensated to debt holders.

## vUSD
vUSD is the unified pricing currency on the zkLink L2 network and exists only on L2. vUSD is 1:1 mapped from zUSD, and eliminates the disparity among stablecoins from different L1 blockchains.
- vUSD can be transferred to any address;
- The total amount of vUSD is restricted by the ZK circuit to the same amount of zUSD;
- vUSD functions as the base token of any trading pair in zkLink L2 ecosystem that devotes to deeper liquidity;
- In a rare case that zUSD is insufficient for withdrawal on one L1, dApp operators and community can quickly rebalance the liquidity at a very low cost.

In general, zUSD abstracts different types of stablecoins into one on each L1 blockchain, which allows vUSD to provide a massive stablecoin liquidity pool on the zkLink L2 network.
