import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationsService {

    constructor(private toastr: ToastrService) {
    }

    public success(title: string, message: string) {
        this.toastr.success(message, title);
    }

    public warning(title: string, message: string) {
        this.toastr.warning(message, title);
    }

    public error(title: string, message: string) {
        this.toastr.error(message, title);
    }

    public info(title: string, message: string) {
        this.toastr.info(message, title);
    }
}
