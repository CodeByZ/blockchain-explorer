import {Component, Input, OnInit} from '@angular/core';
import {NotificationsService} from "../../notifications.service";

@Component({
    selector: 'document-id',
    templateUrl: './document-id.component.html',
    styleUrls: ['./document-id.component.scss']
})
export class DocumentIdComponent implements OnInit {

    @Input() private id: string;

    constructor(private notificationsService: NotificationsService) {
    }

    ngOnInit() {
    }

    public copyToClipboard(value: string) {
        this.notificationsService.info('Copied to clipboard', value);
    }

}
