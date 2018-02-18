import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

import 'rxjs/add/operator/map';
import {FormService} from '../form.service';
import {Deal} from '../models/deal.model';
import {CHEAPEST, FASTEST} from '../form.constants';

@Component({
  moduleId: module.id,
  selector: 'ts-form-input',
  templateUrl: 'form-input.component.html',
  styleUrls: ['form-input.component.css']
})

export class FormInputComponent implements OnInit {
  @Output() onFormResult = new EventEmitter<Deal[]>();
  @Input() departure: string;
  @Input() arrival: string;

  departures: Set<String>;
  arrivals: Set<String>;
  cheapest: string;
  fastest: string;
  type: string;
  isSubmitting: boolean;

  constructor(private formService: FormService) {
  }

  ngOnInit() {
    this.isSubmitting = false;
    this.cheapest = CHEAPEST;
    this.fastest = FASTEST;
    this.resetForm();
    this.formService.getCities()
      .then(response => {
        this.departures = response.depatures;
        this.arrivals = response.arrivals;
      });
  }

  search(event) {
    event.preventDefault();

    if (this.isSubmitting) { return; }

    console.log(this.departure, this.arrival, this.type);

    this.isSubmitting = true;
    this.formService.search(this.departure, this.arrival, this.type)
      .then(response => <Deal[]>response)
      .then(response => {
        console.log(response);
        this.onFormResult.emit(response);
        this.isSubmitting = false;
      });
  }

  setType(type) {
    this.type = type;
  }

  resetForm() {
    this.departure = null;
    this.arrival = null;
    this.type = CHEAPEST;
  }
}
