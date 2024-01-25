import React, {useEffect, useState} from 'react'

import {useERC20, useFakeUSD} from "./useFakeUSD.tsx";
import {useAccountSigner} from "./useAccountSigner.tsx";
import {MultiOwnersSmartAccountParams} from "./MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";


export const BalanceFakeUSDSmartWallet: React.FC<MultiOwnersSmartAccountParams> = ({address: erc20Address, ...accountParams}) => {
    const [balance, setBalance] = useState<string>('0')
    const [address, setAddress] = useState<string>('0x')

    const { erc20 } = useERC20({ address: erc20Address, chainId: accountParams.chainId })
    const accountSigner = useAccountSigner(accountParams)


    useEffect(() => {
        async function balanceOf() {
            if (erc20 && accountSigner) {
                const address = await accountSigner.getAddress()
                setAddress(address)
                const balance = await erc20.balanceOf(address)
                setBalance(balance.toString())
            }
        }

        balanceOf()
    }, [erc20, accountSigner])


    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "24px 0 24px 0" }}>
            <b>Fake USD Balance of SmartWallet {address}</b>
            <span>{balance}</span>
        </div>
    )
}
