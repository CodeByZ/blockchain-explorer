import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {environment} from "../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ClientServiceService} from "./client-service.service";

@Injectable()
export class HealthCheckService {

    private static POLL_INTERVAL_MS: number = 500;
    private healthCheckEndpoint: string = '';
    private baseURL: string = '';

    private healthy = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private clientService: ClientServiceService) {

        HealthCheckService.POLL_INTERVAL_MS = environment.healthCheckPollIntervalMs;
        this.healthCheckEndpoint = environment.healthCheckEndpoint;

        clientService.getLoginObservable().subscribe(isLoggedIn => {
            this.baseURL = isLoggedIn ? this.clientService.getBaseUrl() : '';
        });
    }

    public start() {

        IntervalObservable.create(HealthCheckService.POLL_INTERVAL_MS)
            .subscribe(() => {
                return this.http.get(this.baseURL + this.healthCheckEndpoint)
                    .subscribe(
                        data => {
                            this.healthy.next(true);
                        },
                        error => {
                            this.healthy.next(error.status === 200 ? true : false);
                        });
            });
    }

    public startLocal() {

        IntervalObservable.create(HealthCheckService.POLL_INTERVAL_MS)
            .subscribe(() => {
                return this.http.get(this.healthCheckEndpoint)
                    .subscribe(
                        data => {
                            this.healthy.next(true);
                        },
                        error => {
                            this.healthy.next(false);
                        });
            });
    }

    public isHealthy(): boolean {
        return this.healthy.getValue();
    }

    public getHealthObservable(): Observable<boolean> {
        return this.healthy.asObservable();
    }

}
