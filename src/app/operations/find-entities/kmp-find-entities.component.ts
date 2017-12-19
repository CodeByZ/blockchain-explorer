import {Component, OnInit} from '@angular/core';
import {ClientServiceService} from "../../client-service.service";
import {INuxeoDocument} from "@cc/kmp-client";
import {TagChip} from "../../types";
import {environment} from "../../../environments/environment";
import {NotificationsService} from "../../notifications.service";

type PersonEnrichment = {
    id: string;
    documentType: string;
    firstName: string;
    lastName: string;
    middleName?: string;
};

type EnrichmentData = {
    keyword: string;
    results: PersonEnrichment[];
}

@Component({
    selector: 'kmp-find-entities',
    templateUrl: './kmp-find-entities.component.html',
    styleUrls: ['./kmp-find-entities.component.scss']
})
export class OperationFindEntitiesComponent implements OnInit {

    public parentIds: TagChip[] = [];
    public keywords: TagChip[] = [];
    public documentType: string = 'KMPPerson';
    private enrichmentData: EnrichmentData[] = [];
    private globalEntityDomain: INuxeoDocument = null;

    public searchCount: number = 0;
    public searchExecuted: boolean = false;


    public entityTypes = [
        {
            value: 'KMPPerson',
            display: 'Person'
        }
    ];

    constructor(private clientService: ClientServiceService, private notificationsService: NotificationsService) {

        this.entityTypes = environment.entityTypes;

        this.clientService.getOrCreateGlobalEntityDomain().then(domain => {
            this.globalEntityDomain = domain;
            this.parentIds.push({display: 'Global Entity Domain', value: domain.uid});
            this.parentIds.push({display: 'Root', value: 'c027d0c1-541d-410e-8585-d9cf645de5ce'});
        });

        this.keywords.push(this.createTagChip('Identifier Value 1'));
    }

    ngOnInit() {
    }

    public findEntities() {

        this.searchCount = 0;
        this.searchExecuted = true;

        this.searchCount++;
        this.clientService.findEntities(
            this.keywords.map(e => e.value),
            this.parentIds.map(e => e.value),
            this.documentType)
            .then(results => {
                this.enrichmentData = results.value.data;
                this.searchCount--;
            }).catch(err => {
                this.notificationsService.error('Uh oh...', err);
                this.searchCount--;
            });
    }

    public clearParentIds() {
        this.parentIds = [];
    }

    public clearKeywords() {
        this.keywords = [];
    }

    private createTagChip(name: string): TagChip {
        return {
            value: name,
            display: name
        };
    }

    public copyToClipboard(value: string) {
        this.notificationsService.info('Copied to clipboard', value);
    }
}
