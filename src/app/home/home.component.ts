import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConnectionStatus, RpcService} from "../rpc.service";
import {TagChip} from "../types";
import {NotificationsService} from "../notifications.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [RpcService]
})
export class HomeComponent implements OnInit {

    public searchTokens: TagChip[] = [];

    public searchCount: number = 0;
    public searchExecuted: boolean = false;
    public blocks: any[] = [];

    public placeholder: string = 'You can add some more...';
    public secondaryPlaceholder: string = 'Document ids, free text...';

    constructor(private rpcService: RpcService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {

    }

    public runSearch() {

        let textSearch = [];
        this.searchCount = 0;
        this.searchExecuted = true;

        this.searchTokens.forEach(token => {
            textSearch.push(token.value);
        });
    }

    public clearSearch() {

        this.searchTokens = [];
        this.searchExecuted = false;
    }
}
