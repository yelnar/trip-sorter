import {Component, OnInit, ViewChild} from '@angular/core';
import {COST, DURATION} from './form.constants';
import {Deal} from './models';
import {FormInputComponent} from './input/form-input.component';

@Component({
  moduleId: module.id,
  selector: 'ts-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})

export class FormComponent implements OnInit {
  @ViewChild(FormInputComponent) formInputComponent: FormInputComponent;

  deals: Deal[];
  total: object;

  constructor() {
  }

  ngOnInit() {
    this.total = {} ;
  }

  setDeals(deals: Deal[]) {
    this.deals = deals;
    this.total[COST] = deals.reduce((acc, curr) => {
      return acc + curr[COST];
    }, 0);
    this.total[DURATION] = this.parseDuration(
      deals.reduce((acc, curr) => {
        return acc + curr[DURATION];
      }, 0)
    );
  }

  private parseDuration(d: number): string {
    const h = this.twoDigits(Math.floor(d / 60));
    const m = this.twoDigits(d % 60);
    return h + 'h' + m;
  }

  private twoDigits(n: number): string {
    return ('0' + n).slice(-2);
  }

  resetDeals() {
    this.deals = null;
    // Reset form if needed
    // this.formInputComponent.resetForm();
  }
}
