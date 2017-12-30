import {
    ApplicationRef, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild, Renderer2
} from '@angular/core';
import {RpcService} from "../rpc.service";
import {
    ITreeOptions, TREE_ACTIONS, TreeComponent,
} from 'angular-tree-component';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {NotificationsService} from "../notifications.service";
import {Block} from "../bitcoin-types";
import {CacheService} from "../cache.service";

@Component({
    selector: 'blockchain-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    private hash: string;
    public block: Block;
    private sub: Subscription;

    constructor(private appRef: ApplicationRef, private changeDetectionRef: ChangeDetectorRef,
                private rpcService: RpcService, private zone: NgZone, private cacheService: CacheService,
                private notificationsService: NotificationsService,
                private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {

            this.hash = params['hash'];

            if (this.hash) {
                this.getBlock();
            }
        });
    }

    private getBlock() {

        this.cacheService.getBlock(this.hash)
            .then(block => {
                this.block = block;
            })
            .catch(err => {
                this.rpcService.getBlock(this.hash)
                    .then(block => {
                        this.block = block;
                    });
            })
            .catch(err => {
                this.notificationsService.error('Darn...', err);
            });
    }
}
