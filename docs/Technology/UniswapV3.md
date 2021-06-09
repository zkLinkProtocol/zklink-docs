---
sidebar_position: 5
---

# Uniswap V3

---

Uniswap V3 introduces concentrated liquidity to the existing AMM model, so that LPs can concentrate their capital within custom price ranges. Meanwhile, LPs can choose multiple fee tiers to be compensated for taking on varying degrees of risk.

By concentrating their liquidity, LPs can provide the same liquidity depth as V2 within specified price ranges while putting far less capital at risk. The capital saved can be held externally, invested in different assets, deposited elsewhere in DeFi, or used to increase exposure within the specified price range to earn more trading fees. In this way, the capital efficiency can increase dramatically by a factor of about 4,000.

Uniswap V3 offers more flexible fees (currently there are three separate fee tiers per pair — 0.05%, 0.30%, and 1.00%). This array of options ensures that LPs can tailor their margins according to expected pair volatility: LPs take on more risk in non-correlated pairs like ETH/DAI and, conversely, take on minimal risk in correlated pairs like USDC/DAI.

The adoption of price range has made the limit order function possible. Users can simulate limit order by providing liquidity in a very narrow price range. When the price hits the trigger-point, it is equivalent to completing a limit order transaction.

Compared to Uniswap V2, V3 has improved the TWAP oracle, making it possible to calculate any recent TWAP within the past ~9 days by storing the last 65,535 prices. Despite this major improvement, the gas cost for keeping oracles up to date has actually been reduced by ~50% relative to v2. The costs for calculating TWAPs in external smart contracts is significantly cheaper as well.

This upgrade has greatly enhanced the user experience of DEX; on top of this, zkLink also implements ZK-Rollup to reduce costs. zkLink v1 inherits the features of Uniswap V2, and v1.1 will use the features of Uniswap V3.