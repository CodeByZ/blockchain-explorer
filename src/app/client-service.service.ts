import {NgZone} from '@angular/core';
import {Injectable} from '@angular/core';
import * as Nuxeo from 'nuxeo';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "./local-storage.service";
import {INuxeoDocument} from '@cc/kmp-client';
import {environment} from "../environments/environment";

@Injectable()
export class ClientServiceService {

    private nuxeoClient: Nuxeo;
    private loggedIn = new BehaviorSubject<boolean>(false);
    private baseURL: string;
    private username: string;
    private password: string;
    private source = 'SERVER_1';
    private AUTOMATION_ENDPOINT: string = 'api/v1/automation/';

    constructor(public zone: NgZone, private localStorage: LocalStorageService) {

        this.AUTOMATION_ENDPOINT = environment.automationEndpoint;

        localStorage.getItem('credentials').then(credentials => {

            if (credentials) {
                const credsObj = JSON.parse(credentials);
                this.connect(credsObj.baseURL, credsObj.username, credsObj.password);
            }
        });
    }

    public disconnect() {

        this.zone.run(() => {
            this.localStorage.removeItem('credentials');
            this.loggedIn.next(false);
        });
    }

    public connect(baseURL: string, username: string, password: string): Promise<void> {

        this.username = username;
        this.password = password;
        this.baseURL = baseURL;

        this.nuxeoClient = new Nuxeo({
            baseURL: this.baseURL,
            auth: {
                method: 'basic',
                username,
                password,
            }
        });

        return new Promise((resolve, reject) => {

            let self = this;
            this.nuxeoClient.connect()
                .then(client => {
                    self.zone.run(() => {
                        self.nuxeoClient.schemas("*");
                        self.loggedIn.next(true);
                        this.localStorage
                            .setItem('credentials', JSON.stringify({username, password, baseURL}))
                            .then(resolve);
                    });
                })
                .catch(function (error) {
                    console.error(error);
                    reject();
                });
        });
    }

    public fetchDocumentById(documentId: string): Promise<INuxeoDocument> {

        return new Promise((resolve, reject) => {
            this.nuxeoClient.operation('KMP.FetchDocument')
                .param('source', 'SERVER_1')
                .param('id', documentId)
                .execute()
                .then(function (doc: INuxeoDocument) {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public fetchDocumentsByIds(documentIds: string[]): Promise<INuxeoDocument[]> {

        return new Promise<INuxeoDocument[]>((resolve, reject) => {
            let documentIdsString = documentIds.map( id => "'" + id + "'").join(',');
            let query = `SELECT * FROM Document WHERE ecm:uuid IN (${documentIdsString})`;
            this.nuxeoClient.repository().query({query})
                .then(function (data) {
                    resolve(data.entries);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public fetchParent(document: INuxeoDocument): Promise<INuxeoDocument> {

        return new Promise<INuxeoDocument>((resolve, reject) => {
            this.nuxeoClient.operation('Document.GetParent')
                .input(document)
                .execute()
                .then(function (parent: INuxeoDocument) {
                    resolve(parent);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public async fetchAncestors(document: INuxeoDocument): Promise<INuxeoDocument[]> {

        let ancestors: INuxeoDocument[] = [document];

        while (document && document.path !== '/') {
            document = await this.fetchParent(document);
            if (document) {
                ancestors.unshift(document);
            }
        }

        return new Promise<INuxeoDocument[]>((resolve, reject) => {
            resolve(ancestors);
        });
    }

    public fetchRoot(): Promise<INuxeoDocument> {

        return new Promise((resolve, reject) => {
            this.nuxeoClient.repository().fetch('/')
                .then(function (doc: INuxeoDocument) {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public fetchChildren(document: INuxeoDocument): Promise<INuxeoDocument[]> {

        return new Promise((resolve, reject) => {
            this.nuxeoClient.operation('Document.GetChildren')
                .input(document)
                .execute()
                .then(function (data: any) {
                    resolve(data.entries);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public findEntities(keywords: string[], parentIds: string[], entityType: string = 'KMPPerson'): Promise<any> {

        return new Promise((resolve, reject) => {
            this.nuxeoClient.operation('KMP.FindEntities')
                .param('source', 'SERVER_1')
                .param('keywords', keywords)
                .param('parentIds', parentIds)
                .param('entityType', entityType)
                .execute()
                .then(function (docs: INuxeoDocument[]) {
                    resolve(docs);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public getOrCreateGlobalEntityDomain(): Promise<INuxeoDocument> {

        return this.getOrCreateDomain('Global Entity Domain');
    }

    public getOrCreateDomain(name: string): Promise<INuxeoDocument> {

        return new Promise<INuxeoDocument>((resolve, reject) => {
            this.nuxeoClient.operation('KMP.GetOrCreateDomain')
                .param('source', 'SERVER_1')
                .param('name', name)
                .execute()
                .then(function (doc: INuxeoDocument) {
                    resolve(doc);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public fullTextSearch(searchString: string | string[]): Promise<INuxeoDocument[]> {

        return new Promise<INuxeoDocument[]>((resolve, reject) => {

            let searchTest = '';
            if (searchString instanceof Array) {
                searchTest = searchString.join(' OR ');
            }
            else {
                searchTest = searchString;
            }

            let query = `SELECT * FROM Document WHERE ecm:fulltext LIKE '${searchTest}'`;
            this.nuxeoClient.repository().query({query})
                .then(function (data) {
                    resolve(data.entries);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    public isLoggedIn(): boolean {

        return this.loggedIn.getValue();
    }

    public getLoginObservable(): Observable<boolean> {

        return this.loggedIn.asObservable();
    }

    public getBaseUrl(): string {

        return this.baseURL;
    }
}
