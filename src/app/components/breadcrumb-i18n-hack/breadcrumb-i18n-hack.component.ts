import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-i18n-hack',
  templateUrl: './breadcrumb-i18n-hack.component.html',
  styleUrls: ['./breadcrumb-i18n-hack.component.scss']
})
export class BreadcrumbI18nHackComponent implements OnInit {

  @Input('routeId') routeId: string = 'unknown';

  constructor() { }

  ngOnInit() {
  }

}
