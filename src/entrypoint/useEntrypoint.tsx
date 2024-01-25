import { useEffect, useState} from "react";
import {useEthersSigner} from "../useEthersSigner.tsx";
import { typechain } from "@rumblefishdev/devilwallet-contracts";
import {ConnectionParams} from "../MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";

export function useEntrypoint({entrypointAddress, chainId }: {entrypointAddress: string} & ConnectionParams) {
    const [entrypoint, setEntrypoint] = useState<typechain.EntryPoint>()
    const signer = useEthersSigner({chainId});

    useEffect(() => {
        if (signer) {
            const Entrypoint = typechain.EntryPoint__factory.connect(entrypointAddress, signer)
            setEntrypoint(Entrypoint)
        }
    }, [signer]);


    return { entrypoint }
}
