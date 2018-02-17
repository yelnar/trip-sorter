import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
    FormModule,
    WidgetModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
