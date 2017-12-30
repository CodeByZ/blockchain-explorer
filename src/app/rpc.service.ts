import {NgZone} from '@angular/core';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "./local-storage.service";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Block, BlockchainInfo, Transaction} from "./bitcoin-types";
import {CacheService} from "./cache.service";

export enum ConnectionStatus {
    DISCONNECTED,
    CONNECTING,
    CONNECTED,
}

export type ConnectResponse = {
    connected: boolean;
    message: string;
}

@Injectable()
export class RpcService {

    private connectedSubject = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.DISCONNECTED);

    private connectEndpoint: string = environment.endpoints.connect;
    private disconnectEndpoint: string = environment.endpoints.disconnect;
    private getBlockchainInfoEndpoint: string = environment.endpoints.getBlockchainInfo;
    private getBlockEndpoint: string = environment.endpoints.getBlock;
    private getTransactionEndpoint: string = environment.endpoints.getRawTransaction;
    private rpcProxyBaseUrl: string = environment.rpcProxyBaseUrl;

    private host: string;
    private port: number;

    private static LOGIN_DETAILS_STORAGE_KEY: string = 'loginDetails';

    constructor(public zone: NgZone, private httpClient: HttpClient, private localStorage: LocalStorageService, private cacheService: CacheService) {

        localStorage.getItem(RpcService.LOGIN_DETAILS_STORAGE_KEY)
            .then(details => {
                if (details) {
                    const {host, port, username, password} = JSON.parse(details);
                    this.connect(host, port, username, password).then();
                }
            });
    }

    public connect(host: string, port: number, username: string, password: string): Promise<ConnectResponse> {

        this.host = host;
        this.port = port;

        return new Promise((resolve, reject) => {

            this.connectedSubject.next(ConnectionStatus.CONNECTING);

            this.httpClient
                .post(this.rpcProxyBaseUrl + this.connectEndpoint,
                    {host, port, username, password}).toPromise()
                .then((response: ConnectResponse) => {
                    this.connectedSubject.next(ConnectionStatus.CONNECTED);
                    this.zone.run(() => {
                        this.localStorage
                            .setItem(
                                RpcService.LOGIN_DETAILS_STORAGE_KEY,
                                JSON.stringify({host, port, username, password}))
                            .then(() => {
                                resolve(response);
                            });
                    });
                })
                .catch(error => {
                    this.connectedSubject.next(ConnectionStatus.DISCONNECTED);
                    reject(error);
                });
        });
    }

    public disconnect(): Promise<ConnectResponse> {

        return new Promise((resolve, reject) => {

            this.httpClient
                .get(this.rpcProxyBaseUrl + this.disconnectEndpoint, {}).toPromise()
                .then((response: ConnectResponse) => {
                    this.localStorage.removeItem(RpcService.LOGIN_DETAILS_STORAGE_KEY).then(() => {
                        this.connectedSubject.next(ConnectionStatus.DISCONNECTED);
                        resolve(response);
                    });
                })
                .catch(error => {
                    this.connectedSubject.next(ConnectionStatus.CONNECTED);
                    console.error(error);
                    reject(error);
                });
        });
    }

    public getBlockchainInfo(): Promise<BlockchainInfo> {

        return this.httpClient
            .get<BlockchainInfo>(this.rpcProxyBaseUrl + this.getBlockchainInfoEndpoint, {})
            .toPromise();
    }

    public getBlock(blockId: string): Promise<Block> {

        return this.httpClient
            .get<Block>(this.rpcProxyBaseUrl + this.getBlockEndpoint + '/' + blockId, {})
            .toPromise()
            .then(block => {
                return this.cacheService
                    .setBlock(block.hash, block)
                    .then(() => block)
            });
    }


    public getTransaction(txId: string): Promise<Transaction> {

        return this.httpClient
            .get<Transaction>(this.rpcProxyBaseUrl + this.getTransactionEndpoint + '/' + txId, {})
            .toPromise()
            .then(transaction => {
                return this.cacheService
                    .setTransaction(txId, transaction)
                    .then(() => transaction)
            });
    }

    public getConnectedObservable(): Observable<ConnectionStatus> {

        return this.connectedSubject.asObservable();
    }

    public getProxyBaseUrl(): string {

        return this.rpcProxyBaseUrl;
    }
}
