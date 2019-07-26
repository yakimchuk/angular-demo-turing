import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Endpoint } from '@app/services/endpoint';
import { fade, slideTop } from '@app/utilities/transitions';
import { List } from '@app/types/common';
import { Product } from '@app/services/products';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideTop, fade]
})
export class HomeRouteComponent implements OnInit {

  public products: List<Product>;
  public error: ErrorEvent;
  public filter: PaginationFilter;

  private resources: Endpoint;
  private tour: JoyrideService;

  constructor(resources: Endpoint, tour: JoyrideService) {
    this.resources = resources;
    this.tour = tour;
  }

  ngOnInit() {
  }

  public openTour() {
    this.tour.startTour({
      steps: [
        'tourProjectDescription',
        'tourDepartmentsDescription',
        'tourProductsDescription',
        'tourProductDescription',
        'tourSearchDescription',
        'tourCartDescription',
        'tourAccountDescription',
        'tourEnding'
      ]
    });
  }

  public async reload(filter: PaginationFilter) {

    delete this.error;

    try {
      this.products = await this.resources.products.getProducts(filter);
    } catch (error) {
      this.error = error;
    }

  }

  public async onPagination(filter: PaginationFilter) {
    this.filter = filter;
    this.reload(this.filter);
  }

}
