import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';

enum ErrorComponentMode {
  Row = 'row',
  Column = 'column'
}

@Component({
  selector: 'app-component-error',
  templateUrl: './component-error.component.html',
  styleUrls: ['./component-error.component.scss']
})
export class ComponentErrorComponent implements OnInit {

  @Input('mode') mode: ErrorComponentMode = ErrorComponentMode.Column;

  constructor() { }

  ngOnInit() {
  }

}
