import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../environments/environment';
import {ClientServiceService} from "./client-service.service";

@Injectable()
export class NuxeoServerService {

    private RUN_COMMAND_URL: string = '/run-command/';
    private CONTEXT_PATH: string = '';
    private baseURL: string = '';

    constructor(private http: Http, private clientService: ClientServiceService) {

        this.CONTEXT_PATH = environment.contextPath;

        clientService.getLoginObservable().subscribe(isLoggedIn => {
            this.baseURL = isLoggedIn ? this.clientService.getBaseUrl() : '';
        });
    }

    public restartServer(): Promise<any> {

        return this.http.post(this.baseURL + this.CONTEXT_PATH + this.RUN_COMMAND_URL, {
            operation: 'restart',
            arguments: ['test1', 'test2']
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
            .toPromise();
    }
}
