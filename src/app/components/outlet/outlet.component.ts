import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, UrlSegment } from '@angular/router';
import { routeTransition } from '@app/utilities/transitions';

// @done&story: Fix child routes transitions, for now they do not work due to https://github.com/angular/angular/issues/15477

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
  animations: [routeTransition]
})
export class OutletComponent implements OnInit {

  constructor() { }

  onRouteTransitionStart() {
    // Required to avoid scroller blinking
    document.body.style.overflowX = 'hidden';
  }

  onRouteTransitionDone() {
    document.body.style.overflowX = '';
  }

  // It is required, otherwise router navigation will not start animation (every route must concrete identifier)
  getRouteName(outlet: RouterOutlet) {

    if (!outlet.isActivated) {
      return '';
    }

    let route = outlet.activatedRoute;

    return route.snapshot.data.id || route.routeConfig.path;
  }

  ngOnInit() {
  }

}
