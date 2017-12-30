import {Injectable} from '@angular/core';
import {Block, Transaction} from "./bitcoin-types";

@Injectable()
export class CacheService {

    private blocks: { [key: string]: Block; } = {};
    private transactions: { [key: string]: Transaction; } = {};

    constructor() {
    }

    public setBlock(blockHash: string, block: Block): Promise<void> {

        this.blocks[blockHash] = block;

        return Promise.resolve();
    }

    public getBlock(blockHash: string): Promise<Block> {

        if (blockHash in this.blocks) {
            return Promise.resolve(this.blocks[blockHash]);
        }

        return Promise.reject('Not in cache');
    }


    public setTransaction(txId: string, transaction: Transaction): Promise<void> {

        this.transactions[txId] = transaction;

        return Promise.resolve();
    }

    public getTransaction(txId: string): Promise<Transaction> {

        if (txId in this.transactions) {
            return Promise.resolve(this.transactions[txId]);
        }

        return Promise.reject('Not in cache');
    }

}
