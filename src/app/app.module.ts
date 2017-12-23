import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {AccordionModule, AlertModule, ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {MapToIterablePipe} from './map-to-iterable.pipe';
import {ModalModule} from 'ngx-bootstrap/modal';
import {WindowRefService} from './window-ref.service';
import {PleaseWaitComponent} from './please-wait/please-wait.component';
import {ModalBoxService} from "./modal-box.service";
import {CanActivateViaAuthGuard} from "./can-activate-via-auth.guard";
import {RpcService} from "./rpc.service";
import {LocalStorageService} from "./local-storage.service";
import {HealthCheckService} from "./health-check.service";
import {HttpClientModule} from "@angular/common/http";
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExplorerComponent} from './explorer/explorer.component';
import {TreeModule} from 'angular-tree-component';
import {AngularSplitModule} from 'angular-split';
import {ToastrModule} from 'ngx-toastr';
import {GlobalErrorHandler} from './error-handler';
import {NotificationsService} from "./notifications.service";
import {ClipboardModule} from "ngx-clipboard/dist";
import {FilterPipeModule} from "ngx-filter-pipe";
import {ContainsFilterPipe} from './contains-filter.pipe';
import {ContextMenuModule} from "ngx-contextmenu";
import {BlockchainInfoComponent} from './blockchain-info/blockchain-info.component';

const routes: Routes = [
    {'path': '', 'redirectTo': '/', 'pathMatch': 'full'},
    {'path': 'welcome', 'component': WelcomeComponent},
    {'path': 'home', 'component': HomeComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'explore', 'component': ExplorerComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'explore/:uuid', 'component': ExplorerComponent, canActivate: [CanActivateViaAuthGuard]},
    {'path': 'blockchain-info', 'component': BlockchainInfoComponent, canActivate: [CanActivateViaAuthGuard]},
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomeComponent,
        HomeComponent,
        MapToIterablePipe,
        PleaseWaitComponent,
        ExplorerComponent,
        ContainsFilterPipe,
        BlockchainInfoComponent,
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
            timeOut: 4000,
        }),
        ContextMenuModule.forRoot({
            useBootstrap4: true,
        }),
        ClipboardModule,
        TagInputModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TreeModule,
        AngularSplitModule,
        FilterPipeModule,
    ],
    entryComponents: [
        PleaseWaitComponent
    ],
    providers: [
        WindowRefService, ModalBoxService, LocalStorageService, ContainsFilterPipe, RpcService,
        HealthCheckService, CanActivateViaAuthGuard, NotificationsService, MapToIterablePipe,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
