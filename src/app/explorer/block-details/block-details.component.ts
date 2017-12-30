import {Component, Input, OnInit} from '@angular/core';
import {Block, Transaction} from "../../bitcoin-types";
import {NotificationsService} from "../../notifications.service";
import {CacheService} from "../../cache.service";
import {RpcService} from "../../rpc.service";

@Component({
    selector: 'block-details',
    templateUrl: './block-details.component.html',
    styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {

    @Input() public block: Block;
    public transactions: { [key: string]: Transaction; } = {};
    public txLoading: { [key: string]: Boolean; } = {};

    constructor(private rpcService: RpcService, private cacheService: CacheService,
                private notificationsService: NotificationsService) {
    }

    ngOnInit() {

    }

    public isTxCached(txId: string): boolean {

        return txId in this.transactions;
    }

    public isTxLoading(txId: string): boolean {

        return txId in this.txLoading;
    }

    public getTransaction(txId: string) {

        if (txId in this.transactions) {
            return;
        }

        this.txLoading[txId] = true;

        this.cacheService.getTransaction(txId)
            .then(transaction => {
                this.transactions[txId] = transaction;
            })
            .catch(err => {
                this.rpcService.getTransaction(txId)
                    .then(transaction => {
                        this.transactions[txId] = transaction;
                    })
                    .catch(err => {
                        this.notificationsService.error('Darn...', err);
                        return Promise.reject(err);
                    });
            })
            .then( () => {
                delete this.txLoading[txId];
            })
    }
}
