import {Component, OnInit} from '@angular/core';
import {ClientServiceService} from "../client-service.service";
import {Router} from "@angular/router";
import {WindowRefService} from "../window-ref.service";
import {NuxeoServerService} from "../nuxeo-server.service";
import {ModalBoxService} from "../modal-box.service";
import {PleaseWaitComponent} from "../please-wait/please-wait.component";
import {HealthCheckService} from "../health-check.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: []
})
export class HeaderComponent implements OnInit {

    public jsonRpcHost: string = '192.168.1.9';
    public jsonRpcPort: number = 1972;
    public username: string = 'bitcoinrpc';
    public password: string = 'rpc##PA%%wo1D';
    public searchText: string = '';
    public isConnected: boolean = false;
    public isHealthy: boolean = false;

    constructor(private clientService: ClientServiceService, private router: Router,
                private modalBoxService: ModalBoxService, private windowRefService: WindowRefService,
                private nuxeoServerService: NuxeoServerService, private healthCheckService: HealthCheckService) {

        clientService.getLoginObservable().subscribe(isConnected => {
            this.isConnected = isConnected;
            if (this.isConnected) {
                this.jsonRpcHost = this.clientService.getBaseUrl();
                router.navigate(['home']);
            }
            else {
                router.navigate(['welcome']);
            }
        });

        this.healthCheckService.getHealthObservable().subscribe(
            isHealthy => {
                this.isHealthy = isHealthy;
            }
        );
    }

    ngOnInit() {
        this.healthCheckService.start();
    }

    public connect(): void {
        this.clientService.connect(this.jsonRpcHost, this.username, this.password).then();
    }

    public disconnect(): void {
        this.clientService.disconnect();
    }

    public runSearch() {
        this.clientService.fetchDocumentById(this.searchText);
    }

    public openBaseUrl() {
        this.windowRefService.nativeWindow.open(this.jsonRpcHost, "_blank");
    }

    public restartServer() {
        this.nuxeoServerService.restartServer().then(() => {
            this.modalBoxService.showModal(PleaseWaitComponent, {
                title: 'Restarting Server',
                body: 'The server is now restarting. Please hang on until it comes back online.'
            });
        }).catch(err => {
            this.modalBoxService.showModal(PleaseWaitComponent, {
                title: 'Restart Failed',
                body: 'Restarting the server has failed. Reason: ' + err
            });
        })
    }

}
