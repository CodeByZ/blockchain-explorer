import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ClientServiceService} from "./client-service.service";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    private isLoggedIn: boolean = false;

    constructor(private clientService: ClientServiceService) {
        clientService.getLoginObservable().subscribe(loggedInState => {
            this.isLoggedIn = loggedInState;
        });
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn;
    }
}
