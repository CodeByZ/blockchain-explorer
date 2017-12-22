import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RpcService, ConnectionStatus} from "./rpc.service";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    private connectionStatus: ConnectionStatus;

    constructor(private clientService: RpcService) {

        clientService.getConnectedObservable().subscribe(status => {
            this.connectionStatus = status;
        });
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.connectionStatus === ConnectionStatus.CONNECTED;
    }
}
