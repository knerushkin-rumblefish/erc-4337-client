import { useEffect, useState} from "react";
import {useEthersSigner} from "../useEthersSigner.tsx";
import { typechain } from "@rumblefishdev/devilwallet-contracts";
import {ConnectionParams} from "../MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";

export function usePaymaster({paymasterAddress, chainId }: {paymasterAddress: string} & ConnectionParams) {
    const [paymaster, setPaymaster] = useState<typechain.WhitelistPaymaster>()
    const signer = useEthersSigner({chainId});

    useEffect(() => {
        if (signer) {
            const Paymaster = typechain.WhitelistPaymaster__factory.connect(paymasterAddress, signer)
            setPaymaster(Paymaster)
        }
    }, [signer]);

    return { paymaster }
}
