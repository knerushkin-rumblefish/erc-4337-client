import React, {useState} from 'react'
import {
    type TransactionRequest,
} from "@ethersproject/providers";

import {useERC20} from "./useFakeUSD.tsx";
import {BigNumber} from "ethers";
import {useAccountSigner} from "./useAccountSigner.tsx";
import {Hex} from "./account-abstraction/UserOperation.ts";
import {FAKE_USD_ADDRESS} from "./constants.ts";
import {UserOperationsERC20Params} from "./UserOperationsERC20.types.ts";
import {useMultiOwnerSmartAccount} from "./MultiOwnerSmartAccount/useMultiOwnerSmartAccount.tsx";

export const TransferUserOperation: React.FC<UserOperationsERC20Params> = ({ toAddress, address: erc20Address, ...accountParams}) => {
    const [amount, setAmount] = useState<number>(0)
    const { erc20 } = useERC20({address: erc20Address, chainId: accountParams.chainId })
    const accountSigner = useAccountSigner(accountParams)
    const {multiOwnerSmartAccount: smartAccount, nonce} = useMultiOwnerSmartAccount({address: erc20Address, ...accountParams})

    console.log('[TransferUserOperation] smartAccount', smartAccount)
        console.log('[TransferUserOperation] nextNonce', nonce)

    const handleTransfer = async () => {
        console.log('[TransferUserOperation] fakeUSD', erc20)
        console.log('[TransferUserOperation] accountSigner', accountSigner)
        if (erc20 && accountSigner) {
            const accountAddress = await accountSigner.getAddress()

            console.log('[TransferUserOperation] accountAddress', accountAddress)

            const amountBN = BigNumber.from(amount).mul(BigNumber.from(10).pow(18))

            const transferData = erc20.interface.encodeFunctionData('transfer', [toAddress, amountBN])
            const transferUserOperation: TransactionRequest = {
                data: transferData as Hex,
                to: FAKE_USD_ADDRESS,
                va
            }

            const userOperationTransaction = await accountSigner.sendTransaction(transferUserOperation)
            console.log('[TransferUserOperation] userOperationTransaction', userOperationTransaction)

            setAmount(0)
        }
    }

    //0xaFe354bA3E06F58793772D10d6f8765EeA766Cc4
    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "24px 0 24px 0" }}>
            <b>user operation: transfer to {toAddress}</b>
            <input
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
            />
            <button onClick={handleTransfer}>transfer</button>
        </div>
    )
}
