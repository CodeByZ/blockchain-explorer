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

    public baseUrl: string = 'http://localhost:8080/nuxeo/';
    public username: string = 'Administrator';
    public password: string = 'Administrator';
    public searchText: string = '';
    public isLoggedIn: boolean = false;
    public isHealthy: boolean = false;

    constructor(private clientService: ClientServiceService, private router: Router,
                private modalBoxService: ModalBoxService, private windowRefService: WindowRefService,
                private nuxeoServerService: NuxeoServerService, private healthCheckService: HealthCheckService) {

        clientService.getLoginObservable().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            if (this.isLoggedIn) {
                this.baseUrl = this.clientService.getBaseUrl();
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

    public doLogin(): void {
        this.clientService.login(this.baseUrl, this.username, this.password).then(() => {
        });
    }

    public doLogout(): void {
        this.clientService.logout();
    }

    public runSearch() {
        this.clientService.fetchDocumentById(this.searchText);
    }

    public openBaseUrl() {
        this.windowRefService.nativeWindow.open(this.baseUrl, "_blank");
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
