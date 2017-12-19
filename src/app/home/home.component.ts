import {Component, OnInit} from '@angular/core';
import {ClientServiceService} from "../client-service.service";
import {INuxeoDocument} from "@cc/kmp-client";
import {DocumentComponent} from "../document/document.component";
import {TagChip} from "../types";
import {NotificationsService} from "../notifications.service";
import * as _ from 'underscore';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [ClientServiceService]
})
export class HomeComponent implements OnInit {

    public searchTokens: TagChip[] = [];

    public documents: INuxeoDocument[] = [];
    public searchCount: number = 0;
    public searchExecuted: boolean = false;

    public placeholder: string = 'You can add some more...';
    public secondaryPlaceholder: string = 'Document ids, free text...';

    constructor(private clientService: ClientServiceService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {

        this.clientService.getOrCreateDomain('Global Entity Domain').then(document => {
            this.searchTokens = [{
                value: document.uid,
                display: 'Global Entity Domain'
            }];
        });
    }

    public runSearch() {

        let idsSearch = [];
        let textSearch = [];
        this.searchCount = 0;
        this.searchExecuted = true;
        this.documents = [];

        this.searchTokens.forEach(token => {
            if (DocumentComponent.DOCUMENT_UUID_REGEX.test(token.value)) {
                idsSearch.push(token.value);
            }
            else {
                textSearch.push(token.value);
            }
        });

        if (idsSearch.length) {
            this.searchCount++;
            this.handleDocsPromiseResponse(this.clientService.fetchDocumentsByIds(idsSearch));
        }

        if (textSearch.length) {
            this.searchCount++;
            this.handleDocsPromiseResponse(this.clientService.fullTextSearch(textSearch));
        }
    }

    private handleDocsPromiseResponse(documentsPromise: Promise<INuxeoDocument[]>) {

        documentsPromise.then(documents => {
            this.searchCount--;
            for (let doc of documents) {
                if (!_.findWhere(this.documents, {uid: doc.uid})) {
                    this.documents.push(doc);
                }
            }
        }).catch( err => {
            this.notificationsService.error('Uh oh...', err);
            this.searchCount--;
        });
    }

    public clearSearch() {

        this.searchTokens=[];
        this.documents = [];
        this.searchExecuted = false;
    }
}
