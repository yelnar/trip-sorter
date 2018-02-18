import {Component, Input, OnInit} from '@angular/core';
import {Deal} from '../../models/deal.model';

@Component({
  moduleId: module.id,
  selector: 'ts-form-output-route',
  templateUrl: 'form-output-route.component.html',
  styleUrls: ['form-output-route.component.css']
})

export class FormOutputRouteComponent implements OnInit {
  @Input() deal: Deal;

  constructor() {
  }

  ngOnInit() {
  }
}
