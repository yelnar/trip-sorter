import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {FormModule} from './form/form.module';
import {WidgetModule} from './widget/widget.module';

import {FormService} from './form/form.service';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormModule,
    WidgetModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
