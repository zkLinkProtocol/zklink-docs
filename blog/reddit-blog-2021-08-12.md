# zkLink is probably the most unhackable cross-chain protocol: a thought from Polynetwork incident

when I heard that there’s a serious attack towards Polynetwork, my instinct told me immediately that it must be a failure of the consensus mechanism. The hackers’ address was widely spread throughout the crypto communities only minutes after the breaking news

`0xc8a65fadf0e0ddaf421f28feab69bf6e2e589963`

which I found marked already as `PolyNetwork Exploiter` when I checked on Etherscan.io. Everything moves so quickly.

1. I decided to investigate quickly on my own as I wanted to know what happened. 

    The 1st step is to check what happened to this address in the beginning. We can easily get the first tx information through the Etherscan.

    This is the first tx: 

    `https://etherscan.io/tx/0xb1f70464bd95b774c6ce60fc706eb5f9e35cb5f06e6cfe7c17dcda46ffd59581/advanced`

    The tx called the method `0xd450e04c` of contract on `0x838bf9e95cb12dd76a54c9f9d2e3082eaf928270`.
2. Then I wanted to check the codes of `0x838bf9e95cb12dd76a54c9f9d2e3082eaf928270`.
   
    But it was not open source. 

    This is a DeFi project of billions of dollars of TVL and they don't even audit the codes! Unbelievable.

3.	Afterwards, I checked its logs again and luckily a log appeared. Generally speaking, for a DeFi project with no open-source code, I have to take a guess how it works internally and herewith I start by viewing topics which is the trace left by EVM for execution.

    Topic is an event signature. 

    `0x8a4a2663ce60ce4955c595da2894de0415240f1ace024cfbff85f513b656bdae`

    ![topic-page](https://static-cf.zk.link/static/media/topics-poly.png)

4.	Now we got two useful information:

    func name signature: 0xd450e04c

    and event signature: 0x8a4a2663ce60….

5.	Next step, I came to the polynetwork repo, but at the time being I was not sure if this part of the code was running online. But we can skip it for another day.

    Before long, I found a code file with multiple events.

    `https://github.com/polynetwork/fisco
contract/blob/70428651b94e34d9ca25d2dffb712682a0dec8e4/contracts/core/cross_chain_manager/logic/EthCrossChainManager.sol`

    ![event](https://static-cf.zk.link/static/media/event-poly.png)

6.	I guess 0x8a4a2663ce60 must be one of them. 

    `ChangeBookKeeperEvent` and `VerifyHeaderAndExecuteTxEvent` more likely. Let's test it.

    `https://emn178.github.io/online-tools/keccak_256.html`

    This link provides a convenient Keccak-256 tool.

    ```js
    keccak("ChangeBookKeeperEvent(uint256,bytes)") = "e60d33488cba3977bf65766cd2f8ac9617f64bf3b3198aff6240ce5c7d43b690"
    
    keccak("VerifyHeaderAndExecuteTxEvent(uint64,bytes,bytes,bytes)") = "8a4a2663ce60ce4955c595da2894de0415240f1ace024cfbff85f513b656bdae"
    ```

    The match was successful. A piece of cake!

    Let's reconfirm the func name signature then.

    ```js
    keccak("verifyHeaderAndExecuteTx(bytes,bytes,bytes,bytes,bytes)")= "d450e04cbcabbe3e7feb999efcf07f333266f13e7107ce30a26fe454e6a4038a"
    ```

7.	I proceeded to check what verifyHeaderAndExecuteTx does. 

    ![multi](https://static-cf.zk.link/static/media/multi-sig.png)

    This part looked like some sort of multi-signature verification algorithm. 

    ![merkel](https://static-cf.zk.link/static/media/merkle-proof-poly.png)

    It seems like a proof of existence based on merkle.

    Considering that after verifyHeaderAndExecuteTx was executed, the hacker immediately executed the withdrawal operation and I figured out the possibilities of the problem:

    - A, the private key of the keeper from polynetwork is leaked.

    - B, the verification algorithm of multi-signature is wrong. The audit agency should be responsible if this case. 
    
    - C, the problem of the signature algorithm, not likely tho.


8.	Normally, I would now want to find out how the withdrawal operation took place, but I was no longer interested. 

    What was I thinking about? Whether similar things could ever happen to zkLink. 

    Let's take a moment to seriously think about 2 questions.

    - A, All those billions worth of assets are controlled by signatures of a few people? Is it possible for a multi-signature organization to make such a deadly mistake?
    - B. To approve the transfer of assets, it is merely needed to provide a merkle proof of existence. Are there any better ways?

    `Well, what will happen if the same attack took place on zkLink?` 

    `Nothing!` Strictly speaking, nothing serious will happen.

    On one hand, the whole service of zkLink could be suspended or shut down for a moment.
    
    On the other hand, no tokens on the platform will be affected. As in zkLink system, it is the mathematics that has the authority to determine the transfer of assets, instead of the validators(oracles), who can only convey "yes" or "no".

    There is no multi-signature organization which can determine the transfer of assets in zkLink system. All calculations are bounded by zero knowledge. 

    Motions for the transfer of funds are all initiated by transactions verified by zk, but the approval of the issues is executed by a network of multiple oracles.

    For zkLink, the status of the oracle network is similar to the keepers of the polynetwork. So, suppose the private key of the oracle network is leaked or the oracle network deliberately reports the wrong content (equivalent to something deliberately done by the keepers), then what will happen?

    The answer is simple: for Polynetwork, funds could be completely stolen (it is not a hypothesis for now).

    But for zklink, the most serious consequence is that the issue of fund transfer is not approved (L2 to L1), and all crypto holdings of the user is safe.

    > zkLink minimizes the rights of the consensus organization, even if the worst happens (the identity of the consensus organization is stolen by hackers, the real cause of the polynetwork attack), it will not threaten the security of funds.

    ![recursive](https://static-cf.zk.link/static/media/recursive-exp.png)

    > As a security design, zkLink simplifies the complex cross-chain communication logic to a “yes” or “no” question: whether the final roots generated from multiple chains are consistent with each other? zkLink introduces a multiple oracle network to only answer this “yes” or “no” question, and they cannot do anything else. The details of cross-chain interaction are all constrained by zero-knowledge proofs and no one can forge this process.

    In short, zero-knowledge technology guarantees the correctness of computation, while the oracle network supervises the consistency of multi-chain states.

    Chain interoperation is still complicated and unforeseeable. With the help of zero-knowledge technology, zkLink simplifies the process to a degree that everyone can understand and supervise it. 
    
    `Less is more. As you know, the conciseness of POW has made today's Bitcoin. `
