import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { RouteData } from '@app/routing';
import { slideRight, slideTop } from '@app/utilities/transitions';
import * as _ from 'lodash';

interface Breadcrumb {
  id?: string,
  resolver?: string,
  url: string
}

@Component({
  selector: 'app-route-navigation',
  templateUrl: './route-navigation.component.html',
  styleUrls: ['./route-navigation.component.scss'],
  animations: [slideRight, slideTop]
})
export class RouteNavigationComponent implements OnInit {

  private route: ActivatedRoute;
  private router: Router;

  public data: RouteData;
  public breadcrumbs: Breadcrumb[] = [];

  constructor(route: ActivatedRoute, router: Router) {

    this.route = route;
    this.router = router;

    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      this.data = route.root.firstChild.snapshot.data as RouteData;
      this.breadcrumbs = this.getBreadcrumbs(route);

    });

  }

  public goToParent() {

    let breadcrumbs: Breadcrumb[] = this.getBreadcrumbs(this.route);

    if (breadcrumbs.length < 2) {
      return;
    }

    this.router.navigateByUrl(breadcrumbs.slice(-2)[0].url);
  }

  private getBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {

    let breadcrumbs = [];
    let url = '';

    route.snapshot.data.breadcrumbs.forEach(function (breadcrumb: Breadcrumb) {

      let model = {
        ...breadcrumb
      };

      let match = model.url.match(/:(\w+)$/);

      if (match) {

        let paramName = match[1];

        if (!paramName) {
          return;
        }

        let params = route.snapshot.params;

        if (!params[paramName]) {
          return;
        }

        let value = params[paramName];

        model.url = model.url.replace(`:${paramName}`, value);
      }

      if (model.url.length > 0) {
        url = [url, model.url].join('/');
      }

      model.url = url;

      breadcrumbs.push(model);
    });

    return breadcrumbs;
  }

  ngOnInit() {
  }

}
