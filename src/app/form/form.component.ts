import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FormService} from './form.service';
import {CHEAPEST, FASTEST} from './form.constants';

@Component({
  moduleId: module.id,
  selector: 'ts-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})

export class FormComponent implements OnInit {
  constructor(private formService: FormService) {
  }

  departures: Set<String>;
  arrivals: Set<String>;
  departure: string;
  arrival: string;
  cheapest: string;
  fastest: string;
  type: string;
  isSubmitting: boolean;

  ngOnInit() {
    this.isSubmitting = false;
    this.cheapest = CHEAPEST;
    this.fastest = FASTEST;
    this.type = CHEAPEST;
    this.formService.getCities()
      .then(response => {
        this.departures = response.depatures;
        this.arrivals = response.arrivals;
      });
  }

  search(event) {
    event.preventDefault();

    if (this.isSubmitting) { return; }
    if (!this.departure || !this.arrival) { return; }

    console.log(this.departure, this.arrival, this.type);

    this.isSubmitting = true;
    this.formService.search(this.departure, this.arrival, this.type)
      .then(response => {
        console.log(response);
        this.isSubmitting = false;
      });
  }

  setType(type) {
    this.type = type;
  }
}
