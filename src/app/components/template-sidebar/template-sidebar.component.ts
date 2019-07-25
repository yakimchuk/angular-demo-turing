import { Component, OnInit } from '@angular/core';
import { ui } from '@app/config';
import { slideTop } from '@app/utilities/transitions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss'],
  animations: [slideTop]
})
export class TemplateSidebarComponent implements OnInit {

  public expanded: boolean = false;
  private router: Router;

  constructor(router: Router) {

    this.router = router;

    this.router.events.subscribe(event => {

      if (!(event instanceof NavigationEnd)) {
        return;
      }

      this.expanded = false;
    });
  }

  public isMobileDevice() {
    return window.innerWidth <= ui.mobile.maxWidth;
  }

  ngOnInit() {
  }

}
