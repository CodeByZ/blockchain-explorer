import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";

export enum DataTableElementType {
    STRING,
    NUMBER,
    PERCENTAGE
}

export enum DataTableElementStatus {
    OK,
    WARNING,
    ERROR,
    FATAL
}

export type DataTableElement = {
    name: string;
    dataType?: DataTableElementType;
    status?: DataTableElementStatus;
    value: string;
};

export type DataTableData = {
    rows: DataTableElement[];
}

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

    @Input() displayName: string;
    @Input() data: DataTableData;

    constructor() {
    }

    ngOnInit() {
    }

    public getRowClass(status: DataTableElementStatus) {

        if (status === DataTableElementStatus.WARNING) {
            return 'table-info';
        }
        else if (status === DataTableElementStatus.ERROR) {
            return 'table-warning';
        }
        else if (status === DataTableElementStatus.FATAL) {
            return 'table-danger';
        }

        return '';
    }

    public displayRowIcon(status: DataTableElementStatus) {

        if (isNullOrUndefined(status) || status === DataTableElementStatus.OK) {
            return false;
        }

        return true;
    }

}
