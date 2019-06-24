import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Resources } from '@app/services/resources';
import { IListResponse, IProduct } from '@app/services/schemas';
import { fade, slideTop } from '@app/utilities/transitions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideTop, fade]
})
export class HomeComponent implements OnInit {

  public products: IListResponse<IProduct>;
  public error: ErrorEvent;
  public filter: PaginationFilter;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  ngOnInit() {
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
