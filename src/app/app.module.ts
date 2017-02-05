import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { BackendComponent } from './backend/backend.component';
import { BackendService } from "./backend/backend.service";
import { OverallComponent } from './overall/overall.component';
import { CurrentlyComponent } from './currently/currently.component';
import { HostListComponent } from './host_list/host-list.component';

const appRoutes: Routes = [
  { path: 'currently', component: CurrentlyComponent },
  { path: 'hosts', component: HostListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    OverallComponent,
    CurrentlyComponent,
    HostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Angular2FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgxDatatableModule
  ],
  providers: [
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
