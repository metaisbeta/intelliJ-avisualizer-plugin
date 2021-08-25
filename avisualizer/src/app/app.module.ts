import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PackageViewComponent } from './package-view/package-view.component';
import { AvisualizerMainViewComponent } from './avisualizer-main-view/avisualizer-main-view.component';
import { SchemaTableComponent } from './schema-table/schema-table.component';
import { SystemViewComponent } from './system-view/system-view.component';
import { ClassViewComponent } from './class-view/class-view.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PackageViewComponent,
    AvisualizerMainViewComponent,
    SchemaTableComponent,
    SystemViewComponent,
    ClassViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


