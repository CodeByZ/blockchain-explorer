import {Component, Input, OnInit} from '@angular/core';
import {INuxeoDocument} from "@cc/kmp-client";

@Component({
    selector: 'kmp-documents-list',
    templateUrl: './documents-list.component.html',
    styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {

    @Input() documents: INuxeoDocument[];

    constructor() {
    }

    ngOnInit() {
    }

}
