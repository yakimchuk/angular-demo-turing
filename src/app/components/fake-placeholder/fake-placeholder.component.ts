import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake-placeholder',
  templateUrl: './fake-placeholder.component.html',
  styleUrls: ['./fake-placeholder.component.scss']
})
export class FakePlaceholderComponent implements OnInit {

  @Input('type') type: string = 'line';
  @Input('progress') progress: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
