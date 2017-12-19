import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {environment} from "../environments/environment";
import {NotificationsService} from "./notifications.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private healthCheckEndpoint = '';

    constructor(private notificationsService: NotificationsService) {

        this.healthCheckEndpoint = environment.healthCheckEndpoint.toLowerCase();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({headers: req.headers.set("headerName", "headerValue")});

        return next.handle(authReq)
            .catch((error, caught) => {
                if (!error.url.toLowerCase().endsWith(this.healthCheckEndpoint)) {
                    this.notificationsService.error('Request Error', error.message);
                }
                return Observable.throw(error);
            }) as any;
    }

}
