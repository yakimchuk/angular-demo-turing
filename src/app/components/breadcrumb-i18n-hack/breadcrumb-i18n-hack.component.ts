import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { slideRight } from '@app/utilities/transitions';
import { ActivatedRoute } from '@angular/router';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';

@Component({
  selector: 'app-breadcrumb-i18n-hack',
  templateUrl: './breadcrumb-i18n-hack.component.html',
  styleUrls: ['./breadcrumb-i18n-hack.component.scss'],
  animations: [slideRight]
})
export class BreadcrumbI18nHackComponent implements OnInit, OnChanges {

  @Input() public routeId: string = 'unknown';
  @Input() private resolverId: string;

  private route: ActivatedRoute;
  private resources: EndpointGatewayService;

  public routeName: string;
  public error: boolean;

  constructor(
    route: ActivatedRoute,
    resources: Endpoint
  ) {
    this.route = route;
    this.resources = resources;
  }


  // Resolvers are dynamically called (by combined method name)
  // Methods below may change by different reasons, so they are not copy-pasted

  private async productResolver() {

    let id = this.route.snapshot.params.productId;

    try {
      return (await this.resources.products.getProduct({ productId: id })).name;
    } catch {
      return null;
    }
  }

  private async departmentResolver() {

    let id = this.route.snapshot.params.departmentId;

    try {
      return (await this.resources.departments.getDepartment({ departmentId: id })).name;
    } catch {
      return null;
    }
  }

  private async categoryResolver() {

    let id = this.route.snapshot.params.categoryId;

    try {
      return (await this.resources.categories.getCategory({ categoryId: id })).name;
    } catch {
      return null;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {

    if (!this.resolverId) {
      return;
    }

    delete this.error;

    try {

      let methodName = `${this.resolverId}Resolver`;

      if (!this[methodName]) {
        throw new Error(`Resolver is not implemented`);
      }

      let name = await this[methodName]();

      if (name === null) {
        throw new Error(`Resolver provided an empty name`);
      }

      this.routeName = name;

    } catch {
      this.error = true;
    }
  }

  ngOnInit() {
  }

}
