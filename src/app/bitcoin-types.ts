export type Vin = {
    txid: string;
    vout: number;
    scriptSig: ScriptSig;
    sequence: number;
}

export type Vout = {
    value: number
    n: number;
    scriptPubKey: ScriptPubKey;
}

export type ScriptSig = {
    asm: string;
    hex: string;
}

export enum TransactionType {
    PAY_TO_PUBLIC_KEY_HASH = "pubkeyhash",
    PAY_TO_SCRIPT_HASH = "scripthash",
}

export type ScriptPubKey = {
    asm: string;
    hex: string;
    reqSigs: number;
    type: TransactionType;
    addresses: string[];
}

export type Transaction = {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    locktime: number;
    vin: Vin[];
    vout: Vout[];
    hex: string;
    blockhash: string;
    confirmations: number;
    time: number;
    blocktime: number;
}

export type Block = {
    hash: string;
    confirmations: number;
    strippedsize: number;
    size: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    tx: Transaction[];
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: string;
    chainwork: string;
    previousblockhash: string;
    nextblockhash: string;
}

export enum ChainType {
    MAIN_NET = "main",
    TEST_NET = "test",
    REG_TEST = "reg",
}

export type SoftFork = {
    id: string;
    version: number;
    reject: {
        status: boolean
    }
}

export type Bip9SoftFork = {
    status: string;
    startTime: number;
    timeout: number;
    since: number;
}

export type Bip9SoftForks = {
    [key: string]: Bip9SoftFork;
}

export type BlockchainInfo = {
    chain: ChainType;
    blocks: number;
    headers: number;
    bestblockhash: string;
    difficulty: string;
    mediantime: number;
    verificationprogress: string;
    chainwork: string;
    pruned: boolean;
    softforks: SoftFork[];
    bip9_softforks: Bip9SoftForks
}