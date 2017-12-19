import {Component, Input, OnInit} from '@angular/core';
import {INuxeoDocument} from "@cc/kmp-client";
import {NotificationsService} from "../notifications.service";
import {ContainsFilterPipe} from "../contains-filter.pipe";
import {MapToIterablePipe} from "../map-to-iterable.pipe";

@Component({
    selector: 'kmp-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

    @Input() document: INuxeoDocument;
    @Input() collapsed: boolean = false;

    public static DOCUMENT_UUID_REGEX = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;

    public valueFilter: string = null;
    public propertyFilter: string = null;

    public flatProperties: string[] = [
        'uid',
        'parentRef',
        'path',
        'lastModified',
        'entity-type',
        'repository',
        'facets',
        'isCheckedOut',
        'isVersion',
        'state',
        'type',
    ];

    constructor(private notificationsService: NotificationsService, private containsFilter: ContainsFilterPipe) {
    }

    ngOnInit() {
    }

    public isUuid(something: string) {
        return DocumentComponent.DOCUMENT_UUID_REGEX.test(something);
    }

    public copyToClipboard(value: string) {
        this.notificationsService.info('Copied to clipboard', value);
    }

    public getFilteredProperties(properties: string[], filter): string[] {
        return this.containsFilter.transform(properties, filter);
    }

    public getPropertiesAsArray(objWithProps: any) {
        return Object.keys(objWithProps);
    }

    public valueContains(value: string, contains: string) {
        if (!contains) {
            return true;
        }
        if (!value) {
            return false;
        }
        return value.toString().toLowerCase().indexOf(contains.toLowerCase()) >= 0
    }

    public toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }
}
