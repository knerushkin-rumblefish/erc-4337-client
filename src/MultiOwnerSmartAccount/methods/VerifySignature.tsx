import React, {useState} from 'react'
import {
    type TransactionRequest,
} from "@ethersproject/providers";

import {useAccountSigner} from "../../useAccountSigner.tsx";
import {Hex} from "../../account-abstraction/UserOperation.ts";
import {useMultiOwnerSmartAccount} from "../useMultiOwnerSmartAccount.tsx";
import {MultiOwnersSmartAccountParams} from "../MultiOwnersSmartAccount.types.ts";

export const VerifySignature: React.FC<MultiOwnersSmartAccountParams> = ({ chainId }) => {
    const [hash, setHash] = useState<string>('')
    const [signature, setSignature] = useState<string>('')
    const accountSigner = useAccountSigner({ chainId })

    const { multiOwnerSmartAccount } = useMultiOwnerSmartAccount({ chainId })

    const handleVerifySignature = async () => {
        if (multiOwnerSmartAccount && hash && signature && accountSigner) {
            const address = await accountSigner.getAddress()

            const transferData = multiOwnerSmartAccount.interface.encodeFunctionData('grantOwnership', [newOwner])
            const transferUserOperation: TransactionRequest = {
                data: transferData as Hex,
                to: address,
            }
            const userOperationTransaction = await accountSigner.sendTransaction(transferUserOperation)

            console.log('user operation grant ownership', userOperationTransaction)

            setNewOwner('')
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "24px 0 24px 0" }}>
            <b>user operation: grant permission</b>
            <input
                type="text"
                value={newOwner}
                onChange={e => setNewOwner(String(e.target.value))}
            />
            <input
                type="text"
                value={newOwner}
                onChange={e => setNewOwner(String(e.target.value))}
            />
            <button onClick={handleVerifySignature}>Verify Signature</button>
        </div>
    )
}
