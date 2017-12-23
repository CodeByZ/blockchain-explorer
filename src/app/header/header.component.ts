import {ConnectionStatus, RpcService} from "../rpc.service";
import {ModalBoxService} from "../modal-box.service";
import {HealthCheckService} from "../health-check.service";
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationsService} from "../notifications.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: []
})
export class HeaderComponent implements OnInit {

    public host: string = '192.168.1.7';
    public port: number = 1972;

    public username: string = 'bitcoinrpc';
    public password: string = 'rpc##PA%%wo1D';

    public connectedStatus: ConnectionStatus;
    public isHealthy: boolean = false;

    constructor(private rpcService: RpcService, private router: Router, private modalBoxService: ModalBoxService,
                private healthCheckService: HealthCheckService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {

        this.rpcService.getConnectedObservable()
            .subscribe(status => {

                this.connectedStatus = status;

                if (this.connectedStatus === ConnectionStatus.CONNECTED) {
                    this.router.navigate(['home']).then();
                }
                else {
                    this.router.navigate(['welcome']).then();
                }
            });

        this.healthCheckService.getHealthObservable().subscribe(
            isHealthy => {
                this.isHealthy = isHealthy;
            }
        );

        this.healthCheckService.start();
    }

    public connect(): void {

        this.rpcService.connect(this.host, this.port, this.username, this.password).catch( err => {
            this.notificationsService.error('Failed to Connect', err.error.message);
        });
    }

    public disconnect(): void {

        this.rpcService.disconnect().then();
    }

    public isConnected(): boolean {

        return this.connectedStatus === ConnectionStatus.CONNECTED;
    }

    public isConnecting(): boolean {

        return this.connectedStatus === ConnectionStatus.CONNECTING;
    }
}
