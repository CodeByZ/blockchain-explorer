import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConnectionStatus, RpcService} from "../rpc.service";
import {TagChip} from "../types";
import {NotificationsService} from "../notifications.service";
import {Subscription} from "rxjs/Subscription";
import {Block} from "../bitcoin-types";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [RpcService]
})
export class HomeComponent implements OnInit {

    public searchTokens: TagChip[] = [];

    public searching: boolean = false;
    public searchExecuted: boolean = false;
    public blocks: any[] = [];

    public placeholder: string = 'You can add some more...';
    public secondaryPlaceholder: string = 'Enter block id(s)...';

    constructor(private rpcService: RpcService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {

        let searchTokens: TagChip[] = [];

        searchTokens.push({
            display: "000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254",
            value: "000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254"
        });

        searchTokens.push({
            display: "000000005ddf5639bd049b9579d2ff5d1060ed1020a72f927db9c18b106e81b4",
            value: "000000005ddf5639bd049b9579d2ff5d1060ed1020a72f927db9c18b106e81b4"
        });

        this.searchTokens = searchTokens;
    }

    public runSearch() {

        let blockIds = [];
        this.searchExecuted = true;

        this.searchTokens.forEach(token => {
            blockIds.push(token.value);
        });

        this.searching = true;

        Promise
            .all(blockIds.map(id => {
                return this.rpcService.getBlock(id);
            }))
            .then(blocks => {
                this.blocks = blocks;
            })
            .catch( err => {

            }).then(() => {
                this.searching = false;
            });
    }

    public clearSearch() {

        this.searchTokens = [];
        this.searchExecuted = false;
    }
}
