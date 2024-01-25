import * as React from 'react'
import { type PublicClient, usePublicClient } from 'wagmi'
import { providers } from 'ethers'
import {Chain, type HttpTransport} from 'viem'

export function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient

    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback') {
        const jsonRpcProviders = (transport.transports as ReturnType<HttpTransport>[]).map(
            ({ value }) => new providers.JsonRpcProvider(value?.url, network),
        )
        if (jsonRpcProviders.length === 1) return jsonRpcProviders[0]
        return new providers.FallbackProvider(jsonRpcProviders)
    }
    return new providers.JsonRpcProvider(transport.url, network)
}

export function usePublicEthersProvider({ chainId }: { chainId: Chain['id'] }) {
    const publicClient = usePublicClient({ chainId })
    return React.useMemo(() => publicClientToProvider(publicClient), [publicClient])
}