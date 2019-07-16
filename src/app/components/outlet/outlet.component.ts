import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, UrlSegment } from '@angular/router';
import { routeTransition } from '@app/utilities/transitions';

// @todo: Fix child routes transitions, for now they do not work due to https://github.com/angular/angular/issues/15477

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
  animations: [routeTransition]
})
export class OutletComponent implements OnInit {

  constructor() { }

  onRouteTransitionStart() {
    document.body.style.overflowX = 'hidden';
  }

  onRouteTransitionDone() {
    document.body.style.overflowX = '';
  }

  getRouteName(outlet: RouterOutlet) {

    if (!outlet.isActivated) {
      return '';
    }

    return outlet.activatedRoute.routeConfig.path;
  }

  ngOnInit() {
  }

}
