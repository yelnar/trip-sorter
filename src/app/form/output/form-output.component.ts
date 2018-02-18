import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Deal} from '../models/deal.model';
import {COST, DURATION} from '../form.constants';

@Component({
  moduleId: module.id,
  selector: 'ts-form-output',
  templateUrl: 'form-output.component.html',
  styleUrls: ['form-output.component.css']
})

export class FormOutputComponent implements OnInit {
  @Output() onFormReset = new EventEmitter();
  @Input() deals: Deal[];
  @Input() total: object;

  cost: string;
  duration: string;

  constructor() {
  }

  ngOnInit() {
    this.cost = COST;
    this.duration = DURATION;
  }

  reset() {
    this.onFormReset.emit();
  }
}
