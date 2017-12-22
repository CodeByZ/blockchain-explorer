import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectionStatus, RpcService} from "../rpc.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    public connectedStatus: ConnectionStatus;
    private rpcConnectionSubscription: Subscription;

    constructor(private rpcService: RpcService) {
    }

    ngOnInit() {

        this.rpcConnectionSubscription = this.rpcService.getConnectedObservable()
            .subscribe(status => {
                this.connectedStatus = status;
            });
    }

    ngOnDestroy() {

        this.rpcConnectionSubscription.unsubscribe();
    }

    public isConnecting(): boolean {

        return this.connectedStatus === ConnectionStatus.CONNECTING;
    }
}
