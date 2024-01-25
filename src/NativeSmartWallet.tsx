import {BalanceNativeSmartWallet} from "./BalanceNativeSmartWallet.tsx";
import {MultiOwnersSmartAccountParams} from "./MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";

export const NativeSmartWallet: React.FC<MultiOwnersSmartAccountParams> = (accountParams) => {
    return <div style={{ margin: '48px', padding: '12px', border: '1px solid black' }}>
        <h3 style={{ color: 'blue' }}>Native Smart Wallet</h3>
        <BalanceNativeSmartWallet {...accountParams} />
    </div>
}