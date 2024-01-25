import React, {useEffect, useState} from 'react'

import {useAccountSigner} from "./useAccountSigner.tsx";
import {MultiOwnersSmartAccountParams} from "./MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";


export const BalanceNativeSmartWallet: React.FC<MultiOwnersSmartAccountParams> = (accountParams) => {
    const [balance, setBalance] = useState<string>('0')
    const [address, setAddress] = useState<string>('0x')

    const accountSigner = useAccountSigner(accountParams)


    useEffect(() => {
        async function balanceOf() {
            if (accountSigner) {
                const address = await accountSigner.getAddress()
                setAddress(address)
                const balance = await accountSigner.getBalance()
                setBalance(balance.toString())
            }
        }

        balanceOf()
    }, [accountSigner])


    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "24px 0 24px 0" }}>
            <b>Native Balance of SmartWallet {address}</b>
            <span>{balance}</span>
        </div>
    )
}