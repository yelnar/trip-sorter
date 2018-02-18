import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FormComponent} from './form.component';
import {FormInputComponent} from './input/form-input.component';
import {FormOutputComponent} from './output/form-output.component';
import {FormOutputRouteComponent} from './output/route/form-output-route.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FormComponent],
  declarations: [FormComponent, FormInputComponent, FormOutputComponent, FormOutputRouteComponent],
  providers: [],
})
export class FormModule {
}
