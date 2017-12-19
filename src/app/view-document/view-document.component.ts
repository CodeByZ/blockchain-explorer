import {Component, OnInit} from '@angular/core';
import {INuxeoDocument} from "@cc/kmp-client";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {ClientServiceService} from "../client-service.service";

@Component({
    selector: 'app-view-document',
    templateUrl: './view-document.component.html',
    styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

    private document: INuxeoDocument;
    private uuid: string;

    private sub: Subscription;

    constructor(private clientService: ClientServiceService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.uuid = params['uuid'];
            this.clientService.fetchDocumentById(this.uuid).then( document => {
                this.document = document;
            });
        });
    }

}
