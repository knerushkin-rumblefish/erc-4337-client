import {ConnectionParams} from "./MultiOwnerSmartAccount/MultiOwnersSmartAccount.types.ts";

export type ERC20Params = ConnectionParams & { address: string, toAddress: string }
