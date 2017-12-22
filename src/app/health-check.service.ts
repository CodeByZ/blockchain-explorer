import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {environment} from "../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';

@Injectable()
export class HealthCheckService {

    private pollIntervalMs: number = +environment.healthCheckPollIntervalMs;
    private healthCheckEndpoint: string = environment.endpoints.healthCheck;
    private rpcProxyBaseUrl: string = environment.rpcProxyBaseUrl;

    private healthySubject = new BehaviorSubject<boolean>(true);

    constructor(private http: HttpClient) {
    }

    public start() {

        IntervalObservable.create(this.pollIntervalMs)
            .subscribe(() => {
                return this.http.get(this.getHealthUrl())
                    .subscribe(
                        data => {
                            this.healthySubject.next(true);
                        },
                        error => {
                            this.healthySubject.next(error.status === 200);
                        });
            });
    }

    public getHealthObservable(): Observable<boolean> {

        return this.healthySubject.asObservable();
    }

    public getHealthUrl(): string {

        return this.rpcProxyBaseUrl + this.healthCheckEndpoint;
    }

}
