import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { StudentService } from './service/student.service';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { AppRoutingModule } from './app-routing.module';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    AddComponent,
    EditComponent,
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, AppRoutingModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
