import {Component} from '@angular/core';
import {HttpInterceptorService} from "ng-http-interceptor";
import {NotificationsService} from "./notifications.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent {

    constructor(private httpClient: HttpClient, private notificationsService: NotificationsService) {
        //
        // httpInterceptor.request().addInterceptor((data, method) => {
        //     console.log(method, data);
        //     return data;
        // });
        //
        // httpInterceptor.response().addInterceptor((res, method) => {
        //     return res.do(resp => {
        //         console.log('resp', resp);
        //         notificationsService.info('Response', resp.toString());
        //     });
        // });

    }

    ngOnInit() {

        console.log(`%c
          ______          _       ______        _______ 
         / _____)        | |     (____  \\      (_______)
        | /      ___   _ | | ____ ____)  )_   _   __    
        | |     / _ \\ / || |/ _  )  __  (| | | | / /    
        | \\____| |_| ( (_| ( (/ /| |__)  ) |_| |/ /____ 
         \\______)___/ \\____|\\____)______/ \\__  (_______)
                                         (____/     
        `, 'color: #01bf05');
    }
}