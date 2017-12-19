import {
    ApplicationRef, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild, Renderer2
} from '@angular/core';
import {ClientServiceService} from "../client-service.service";
import {INuxeoDocument} from "@cc/kmp-client";
import {
    ITreeOptions, TREE_ACTIONS, TreeComponent,
} from 'angular-tree-component';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'underscore';
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
    selector: 'app-explorer',
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
                private clientService: ClientServiceService, private zone: NgZone,
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
                // Reveal document
                this.clientService.fetchDocumentById(this.uuid).then(document => {
                    this.clientService.fetchAncestors(document).then(ancestors => {
                        if (ancestors && ancestors.length) {
                            let chain = ancestors.map(ancestor => this.createNode(ancestor));
                            this.nodes = [chain[0]];
                            let currNode = this.nodes[0];
                            for (let i = 0; i < chain.length - 1; i++) {
                                let child = chain[i + 1];
                                currNode.children = [child];
                                currNode = child;
                            }
                            this.expandAllNextTick();
                            this.focusNodEByIdNextTick(this.uuid);
                        }
                    });
                });
            }
            else {
                // Open Root
                this.clientService.fetchRoot().then(rootDoc => {
                    this.nodes = [this.createNode(rootDoc, 'Root')];
                    this.fetchNodeChildren(this.nodes[0]).then(() => {
                        this.expandAllNextTick();
                    });
                });
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

    private createNode(document: INuxeoDocument, name?: string) {

        if (!name && document.path === '/') {
            name = 'Root';
        }

        return {
            id: document.uid,
            name: (name || document.title),
            document,
            children: null,
            class: this.getTreeNodeIconClass(document),
            loading: false,
        };
    }

    private getTreeNodeIconClass(document: INuxeoDocument): string {

        let nodeIconClass = this.treeIcons[document.type];
        if (!nodeIconClass) {
            const facets: string[] = document['facets'];
            if (_.contains(facets, 'Folderish')) {
                nodeIconClass = 'fa-folder-o';
            }
            else {
                nodeIconClass = 'fa-file-o';
            }
        }
        return nodeIconClass;
    }

    nodeClicked(event: any) {

        this.hideContextMenu();
        this.selectedDocument = event.node.data;

        if (this.selectedDocument.children) {
            return;
        }

        this.fetchSelectedNodeChildren();
    }

    private fetchSelectedNode() {

        let currNode = this.tree.treeModel.getNodeById(this.selectedDocument.id);
        currNode.data.loading = true;

        this.clientService.fetchDocumentById(this.selectedDocument.id)
            .then( document => {
                currNode.data.document = document;
                currNode.data.loading = false;
                currNode.data.expanded = true;
            })
            .catch (error => {
                currNode.data.loading = false;
                currNode.data.expanded = true;
                this.notificationsService.error('Whoa!', error);
            });
    }

    private fetchSelectedNodeChildren() {

        let currNode = this.tree.treeModel.getNodeById(this.selectedDocument.id);
        currNode.data.loading = true;

        this.fetchNodeChildren(this.selectedDocument)
            .then(() => {
                currNode.data.loading = false;
                currNode.data.expanded = true;
                this.expandCurrentNodeNextTick();
            })
            .catch(error => {
                currNode.data.loading = false;
                this.notificationsService.error('Whoa!', error);
            });
    }

    resetConfig() {

        this.config = JSON.parse(JSON.stringify(defaultConfig));
        localStorage.removeItem(this.localStorageName);
    }

    onDragEnd(columnindex: number, e: { gutterNum: number, sizes: Array<number> }) {

        console.log(columnindex, e);

        if (columnindex === -1) {
            // Set size for all visible columns
            this.config.columns.filter(c => c.visible === true)
                .forEach((column, index) => column.size = e.sizes[index]);
        }

        this.saveLocalStorage();
    }

    toggleDisabled() {

        this.config.disabled = !this.config.disabled;
        this.saveLocalStorage();
    }

    saveLocalStorage() {

        localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
    }

    private fetchNodeChildren(node: any): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            this.clientService.fetchChildren(node.document).then(documents => {
                node.children = documents.map(doc => {
                    return this.createNode(doc);
                });
                this.nodes = (<any>Object).assign([], this.nodes);
                resolve();
            });
        });
    }

    private getTreeNodeById(id: string): any {

        return this.tree.treeModel.getNodeById(id);
    }

    private refreshNode() {

        this.fetchSelectedNode();
        this.hideContextMenu();
    }

    private refreshChildren() {

        this.fetchSelectedNodeChildren();
        this.hideContextMenu();
    }

    private hideContextMenu() {

        this.contextMenu.nativeElement.classList.remove('visible');
    }
}
