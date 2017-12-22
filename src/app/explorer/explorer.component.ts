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

const defaultConfig: any = {
    columns: [
        {
            visible: true,
            size: 25,
        },
        {
            visible: true,
            size: 75,
        },
    ],
    disabled: false
};

@Component({
    selector: 'blockchain-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    @ViewChild(TreeComponent) private tree: TreeComponent;
    @ViewChild('contextMenu') private contextMenu: ElementRef;

    private localStorageName: string = 'explorer-splitter';
    private config: any = {};
    public selectedDocument: any = null;
    private treeIcons = {};
    public nodes = [];

    private uuid: string;
    private sub: Subscription;

    private offsetX: number = 30;
    private offsetY: number = -16;

    treeOptions: ITreeOptions = {
        displayField: 'name',
        idField: 'id',
        actionMapping: {
            mouse: {
                dblClick: (tree, node, $event) => {
                    if (node.hasChildren) {
                        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event)
                    }
                },
                contextMenu: (tree, node, $event) => {
                    $event.preventDefault();
                    this.contextMenu.nativeElement.classList.add('visible');
                    this.renderer.setStyle(this.contextMenu.nativeElement, 'left', `${this.offsetX + $event.clientX}px`);
                    this.renderer.setStyle(this.contextMenu.nativeElement, 'top', `${this.offsetY + $event.clientY}px`);
                }
            },
        },
        animateExpand: false,
    };

    constructor(private appRef: ApplicationRef, private changeDetectionRef: ChangeDetectorRef,
                private rpcService: RpcService, private zone: NgZone,
                private notificationsService: NotificationsService,
                private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {

        this.treeIcons = environment.treeIcons;
    }

    ngOnInit() {

        if (localStorage.getItem(this.localStorageName)) {
            this.config = JSON.parse(localStorage.getItem(this.localStorageName));
        }
        else {
            this.resetConfig();
        }

        this.sub = this.route.params.subscribe(params => {
            this.uuid = params['uuid'];

            if (this.uuid) {
                // block id
            }
            else {
                // Open Root
            }
        });
    }

    private expandAllNextTick() {

        this.appRef.tick();
        this.tree.treeModel.expandAll();
    }

    private expandCurrentNodeNextTick() {
        this.appRef.tick();
        this.tree.treeModel.getActiveNode().expandAll();
    }

    private focusNodEByIdNextTick(id: string) {

        this.appRef.tick();
        let node = this.tree.treeModel.getNodeById(id);
        node.focus();
        this.selectedDocument = node.data;
    }

    private createNode(id: string, name: string, data: any) {

        return {
            id: id,
            name: name,
            data: data,
            children: null,
            className: this.getTreeNodeIconClassName(data),
            loading: false
        };
    }

    private getTreeNodeIconClassName(nodeData: any): string {

        return this.treeIcons[nodeData.type] || 'fa-file-o';
    }

    nodeClicked(event: any) {

        this.hideContextMenu();
        this.selectedDocument = event.node.data;
    }

    private fetchSelectedNode() {

        let currNode = this.tree.treeModel.getNodeById(this.selectedDocument.id);
        currNode.data.loading = true;
        //
        // this.rpcService.getBlock(this.selectedDocument.id)
        //     .then(document => {
        //         currNode.data.document = document;
        //         currNode.data.loading = false;
        //         currNode.data.expanded = true;
        //     })
        //     .catch(error => {
        //         currNode.data.loading = false;
        //         currNode.data.expanded = true;
        //         this.notificationsService.error('Whoa!', error);
        //     });
    }

    resetConfig() {

        this.config = JSON.parse(JSON.stringify(defaultConfig));
        localStorage.removeItem(this.localStorageName);
    }

    toggleDisabled() {

        this.config.disabled = !this.config.disabled;
        this.saveLocalStorage();
    }

    saveLocalStorage() {

        localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
    }

    private getTreeNodeById(id: string): any {

        return this.tree.treeModel.getNodeById(id);
    }

    private refreshNode() {

        this.fetchSelectedNode();
        this.hideContextMenu();
    }

    private refreshChildren() {

        this.hideContextMenu();
    }

    private hideContextMenu() {

        this.contextMenu.nativeElement.classList.remove('visible');
    }
}
