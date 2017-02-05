import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';


import { AppComponent } from './app.component';
import { BackendComponent } from './backend/backend.component';
import { BackendService } from "./backend/backend.service";
import { OverallComponent } from './overall/overall.component';


@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    OverallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Angular2FontAwesomeModule
  ],
  providers: [
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
