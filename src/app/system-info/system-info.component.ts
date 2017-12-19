import {Component, OnInit} from '@angular/core';
import {DataTableData, DataTableElementStatus} from "../data-table/data-table.component";

@Component({
    selector: 'system-info',
    templateUrl: './system-info.component.html',
    styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {

    public versionData: DataTableData = {
      rows: [
          {
              name: 'KMP Server',
              value: '0.1.200.SNAPSHOT'
          },
          {
              name: 'Nuxeo Server',
              value: '3.11.0'
          },
          {
              name: 'Elastic Search',
              value: '0.2.33'
          },
          {
              name: 'PostgresSQL',
              value: '2.3.100'
          }
      ]
    };

    public resourcesData: DataTableData = {
        rows: [
            {
                name: 'CPU Usage',
                value: '98.4%',
                status: DataTableElementStatus.FATAL
            },
            {
                name: 'Free Disk Space',
                value: '120.35GB',
                status: DataTableElementStatus.WARNING
            },
            {
                name: 'Log Folder Size',
                value: '14.2GB',
                status: DataTableElementStatus.ERROR
            }
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }

}
