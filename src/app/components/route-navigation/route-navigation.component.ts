import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { RouteData } from '@app/routing';
import { slideRight, slideTop } from '@app/utilities/transitions';

interface Breadcrumb {
  id?: string;
  resolver?: string;
  url: string;
}

@Component({
  selector: 'app-route-navigation',
  templateUrl: './route-navigation.component.html',
  styleUrls: ['./route-navigation.component.scss'],
  animations: [slideRight, slideTop]
})
export class RouteNavigationComponent implements OnInit {

  public breadcrumbs: Breadcrumb[] = [];

  private route: ActivatedRoute;
  private router: Router;

  constructor(
    route: ActivatedRoute,
    router: Router
  ) {

    this.route = route;
    this.router = router;

    this.router.events.subscribe(event => {

      if (!(event instanceof NavigationEnd)) {
        return;
      }

      this.breadcrumbs = this.getBreadcrumbs(route);
    });
  }

  public goToParent() {

    let breadcrumbs: Breadcrumb[] = this.getBreadcrumbs(this.route);

    if (breadcrumbs.length < 2) {
      return;
    }

    // @todo: There must be a message if there is a problem with router
    this.router.navigateByUrl(breadcrumbs.slice(-2)[0].url);
  }

  private getBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {

    let breadcrumbs = [];
    let url = '';

    route.snapshot.data.breadcrumbs.forEach((breadcrumb: Breadcrumb) => {

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
