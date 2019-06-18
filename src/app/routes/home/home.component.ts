import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Resources } from '@app/networking/resources';
import { ListResponse, Product } from '@app/networking/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public a: number = 2;

  public products: ListResponse<Product>;
  public error: ErrorEvent;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  ngOnInit() {
  }

  private async reload(filter: PaginationFilter) {

    try {
      this.products = await this.resources.products.get(filter);
    } catch (error) {
      this.error = error;
    }
  }

  public async onPagination(filter: PaginationFilter) {
    console.log('onPagination outer', filter);
    this.reload(filter);
  }

}
