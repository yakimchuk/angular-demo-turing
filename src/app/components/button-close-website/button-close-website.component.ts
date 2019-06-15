import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-close-website',
  templateUrl: './button-close-website.component.html',
  styleUrls: ['./button-close-website.component.scss']
})
export class ButtonCloseWebsiteComponent implements OnInit {

  constructor() { }

  public close() {
    history.go(-(history.length - 1));
  }

  ngOnInit() {
  }

}
