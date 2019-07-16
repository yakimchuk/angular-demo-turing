import { Component, OnInit } from '@angular/core';
import { routeTransition } from '@app/utilities/transitions';
import {
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-template-content',
  templateUrl: './template-content.component.html',
  styleUrls: ['./template-content.component.scss'],
  animations: [routeTransition]
})
export class TemplateContentComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
