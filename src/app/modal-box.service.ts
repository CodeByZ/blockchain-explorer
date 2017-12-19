import {Component, ComponentRef, Injectable, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Injectable()
export class ModalBoxService {

    constructor(private modalBoxService: BsModalService) {

    }

    public showModal(component: Function, params: any): BsModalRef {

        let bsModalRef: BsModalRef = this.modalBoxService.show(component);
        for (let key of Object.keys(params)) {
            bsModalRef.content[key] = params[key];
        }
        return bsModalRef;
    }

}
