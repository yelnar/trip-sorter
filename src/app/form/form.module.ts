import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FormComponent} from './form.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FormComponent],
  declarations: [FormComponent],
  providers: [],
})
export class FormModule {
}
