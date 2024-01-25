import {useEthersSigner} from "../useEthersSigner.tsx";
import {useEffect, useState} from "react";
import { typechain } from "@rumblefishdev/devilwallet-contracts";
import {useAccountSigner} from "../useAccountSigner.tsx";
import {MultiOwnersSmartAccountParams} from "./MultiOwnersSmartAccount.types.ts";
import {usePublicEthersProvider} from "../usePublicEthersProvider.tsx";

export function useMultiOwnerSmartAccount(multiOwnersSmartAccountParams: MultiOwnersSmartAccountParams) {
    const { chainId, externalAccountAddress} = multiOwnersSmartAccountParams
    const [multiOwnerSmartAccount, setMultiOwnerSmartAccount] = useState<typechain.MultiOwnerSmartAccount>()
    const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false)
    const [nonce, setNonce]  = useState<string| undefined>()

    const signer = useEthersSigner({ chainId });
    const provider = usePublicEthersProvider({ chainId })
    const accountSigner = useAccountSigner(multiOwnersSmartAccountParams);

    useEffect(() => {
        async function connectMultiOwnerSmartAccount () {
            if (accountSigner) {
                const accountAddress = await accountSigner.getAddress()
                console.log('useMultiOwnerSmartAccount account address', accountAddress)
                if (signer && accountAddress) {
                    const accountCode = await provider.getCode(accountAddress)
                    console.log('useMultiOwnerSmartAccount accountCode', accountCode)
                    const isAccountCreated = accountCode.length > 2
                    console.log('useMultiOwnerSmartAccount isAccountCreated', isAccountCreated)
                    setIsAccountCreated(isAccountCreated)
                    if (isAccountCreated) {
                        const multiOwnerSmartAccount = typechain.MultiOwnerSmartAccount__factory.connect(accountAddress, signer)

                        const nonce = await multiOwnerSmartAccount.getNonce()
                        setNonce(nonce.toString())
                        setMultiOwnerSmartAccount(multiOwnerSmartAccount)
                    }
                }
            }
        }

        connectMultiOwnerSmartAccount()
    }, [accountSigner, signer, setMultiOwnerSmartAccount, chainId, externalAccountAddress, setIsAccountCreated]);


    return { multiOwnerSmartAccount, isAccountCreated, nonce }
}
