import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteData } from '@app/routing';
import { slideRight } from '@app/utilities/transitions';

interface Breadcrumb {
  id: string,
  url: string
}

@Component({
  selector: 'app-route-navigation',
  templateUrl: './route-navigation.component.html',
  styleUrls: ['./route-navigation.component.scss'],
  animations: [slideRight]
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

    this.router.navigateByUrl(breadcrumbs.slice(-2).slice(1)[0].url);
  }

  // Taken from https://medium.com/@bo.vandersteene/angular-5-breadcrumb-c225fd9df5cf
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {

    const id = route.routeConfig ? route.routeConfig.data['id'] : 'unknown';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;

    const breadcrumb = {
      id: id,
      url: nextUrl
    };

    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];

    if (route.firstChild) {
      return this.getBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

  ngOnInit() {
  }

}
