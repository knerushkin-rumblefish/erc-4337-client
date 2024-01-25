import {TransferUserOperation} from "./TransferUserOperation.tsx";
import {BalanceFakeUSDSmartWallet} from "./BalanceFakeUSDSmartWallet.tsx";
import {MultiOwnersSmartAccountParams} from "./MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";
import React, {useState} from "react";
import {Hex} from "viem";

export const UserOperationsERC20: React.FC<MultiOwnersSmartAccountParams> = ({address, ...accountParams}) => {
    const [toAddress, setToAddress] = useState<Hex | undefined>()
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if(value.startsWith('0x') && value.length === 42) {
            setToAddress(value as Hex)
        }

        if(value.length === 0) {
            setToAddress(undefined)
        }
    }

    return <div style={{ margin: '48px', padding: '12px', border: '1px solid black' }}>
        <h3 style={{ color: 'blue' }}>User Operations ERC20</h3>
        <h2> To address: <input value={toAddress} onChange={handleChangeAddress} /> </h2>
        <BalanceFakeUSDSmartWallet address={address} {...accountParams} />
        {
            toAddress && (
                <>
                    <TransferUserOperation address={address} {...accountParams} toAddress={toAddress}/>
                </>
            )
        }
    </div>
}
