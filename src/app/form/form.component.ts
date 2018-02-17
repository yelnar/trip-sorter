import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FormService} from './form.service';

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
  type: number;
  isSubmitting: boolean;

  ngOnInit() {
    this.isSubmitting = false;
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

    this.isSubmitting = true;
    console.log(this.formService.search(this.departure, this.arrival));
  }
}
