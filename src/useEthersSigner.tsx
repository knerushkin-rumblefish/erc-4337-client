import * as React from 'react'
import { type WalletClient, useWalletClient } from 'wagmi'
import { providers } from 'ethers'

export function walletClientToSigner(walletClient: WalletClient) {
    console.log('useEthersSigner walletClient', walletClient)
    const { chain, transport } = walletClient

    console.log('useEthersSigner chain', chain)
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport, network)

    console.log('useEthersSigner provider', provider)

    return provider.getSigner()
}


export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId })

    console.log('useEthersSigner chainId', chainId)
    console.log('useEthersSigner walletClient', walletClient)
    return React.useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient],
    )
}
