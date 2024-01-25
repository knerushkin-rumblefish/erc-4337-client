import {useEffect, useState} from 'react'

import {useEthersSigner} from "../useEthersSigner.tsx";
import {
    ConnectionParams,
} from "../MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";

export const useEOA = ({ chainId }: ConnectionParams) => {
    const [eoaAddress, setEOAddress] = useState<string>('')

    const eoaSigner = useEthersSigner({ chainId })


    useEffect(() => {
        async function getEOAaddress(){
            if (eoaSigner) {
                const eoaAddress = await eoaSigner.getAddress()

                setEOAddress(eoaAddress)
            }
        }

        getEOAaddress()
    }, [eoaSigner]);

    return { address: eoaAddress }
}