import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {NotificationsService} from "./notifications.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private notificationsService: NotificationsService = null;

    constructor(private injector: Injector) {

    }

    handleError(error) {

        if (!this.notificationsService) {
            this.notificationsService = <NotificationsService>this.injector.get(NotificationsService);
        }

        const message = error.message ? error.message : error.toString();

        this.notificationsService.error(message, 'Oops...');

        throw error;
    }

}