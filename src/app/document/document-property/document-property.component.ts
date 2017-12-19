import {Component, Input, OnInit} from '@angular/core';
import {NotificationsService} from "../../notifications.service";

@Component({
    selector: 'document-property',
    templateUrl: './document-property.component.html',
    styleUrls: ['./document-property.component.scss']
})
export class DocumentPropertyComponent implements OnInit {

    @Input() public propertyValue: string;

    constructor(private notificationsService: NotificationsService) {
    }

    ngOnInit() {
    }

    public copyToClipboard(value: string) {
        this.notificationsService.info('Copied to clipboard', value);
    }
}
