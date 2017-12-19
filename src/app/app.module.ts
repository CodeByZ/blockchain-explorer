import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {AccordionModule, AlertModule, ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {DocumentComponent} from './document/document.component';
import {MapToIterablePipe} from './map-to-iterable.pipe';
import {ModalModule} from 'ngx-bootstrap/modal';
import {WindowRefService} from './window-ref.service';
import {NuxeoServerService} from "./nuxeo-server.service";
import {HttpModule} from "@angular/http";
import {PleaseWaitComponent} from './please-wait/please-wait.component';
import {ModalBoxService} from "./modal-box.service";
import {CanActivateViaAuthGuard} from "./can-activate-via-auth.guard";
import {ClientServiceService} from "./client-service.service";
import {LocalStorageService} from "./local-storage.service";
import {HealthCheckService} from "./health-check.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OperationFindEntitiesComponent} from './operations/find-entities/kmp-find-entities.component';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DocumentsListComponent} from './documents-list/documents-list.component';
import {ExplorerComponent} from './explorer/explorer.component';
import {TreeModule} from 'angular-tree-component';
import {AngularSplitModule} from 'angular-split';
import {ToastrModule} from 'ngx-toastr';
import {GlobalErrorHandler} from './error-handler';
import {NotificationsService} from "./notifications.service";
import {HttpInterceptorService} from "./http-interceptor.service";
import { ViewDocumentComponent } from './view-document/view-document.component';
import {ClipboardModule} from "ngx-clipboard/dist";
import {FilterPipeModule} from "ngx-filter-pipe";
import { ContainsFilterPipe } from './contains-filter.pipe';
import { DocumentIdComponent } from './document/document-id/document-id.component';
import { DocumentPropertyComponent } from './document/document-property/document-property.component';
import {ContextMenuModule} from "ngx-contextmenu";
import { SystemInfoComponent } from './system-info/system-info.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
    {'path': '', 'redirectTo': '/', 'pathMatch': 'full'},
    {'path': 'welcome', 'component': WelcomeComponent},
    {'path': 'home', 'component': HomeComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'document', 'component': DocumentComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'kmp-find-entities', 'component': OperationFindEntitiesComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'explore', 'component': ExplorerComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'explore/:uuid', 'component': ExplorerComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'view-document/:uuid', 'component': ViewDocumentComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'system-info', 'component': SystemInfoComponent, canActivate: [CanActivateViaAuthGuard]},
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomeComponent,
        HomeComponent,
        DocumentComponent,
        MapToIterablePipe,
        PleaseWaitComponent,
        OperationFindEntitiesComponent,
        DocumentsListComponent,
        ExplorerComponent,
        ViewDocumentComponent,
        ContainsFilterPipe,
        DocumentIdComponent,
        DocumentPropertyComponent,
        SystemInfoComponent,
        DataTableComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        AccordionModule.forRoot(),
        ButtonsModule.forRoot(),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            autoDismiss: true,
            preventDuplicates: false,
            tapToDismiss: true,
            progressBar: true,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            timeOut: 2500,
        }),
        ContextMenuModule.forRoot({
            useBootstrap4: true,
        }),
        ClipboardModule,
        TagInputModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        TreeModule,
        AngularSplitModule,
        FilterPipeModule,
    ],
    entryComponents: [
        PleaseWaitComponent
    ],
    providers: [
        NuxeoServerService, WindowRefService, ModalBoxService, LocalStorageService, ContainsFilterPipe,
        ClientServiceService, HealthCheckService, CanActivateViaAuthGuard, NotificationsService, MapToIterablePipe,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
