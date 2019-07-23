import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Endpoint } from '@app/services/endpoint';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { ActivatedRoute } from '@angular/router';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { Category } from '@app/services/categories';
import { Product } from '@app/services/products';
import { List } from '@app/types/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [slideTop, fade, slideRight]
})
export class CategoryRouteComponent implements OnInit {

  public category: Category;
  public products: List<Product>;
  public error: boolean = false;
  public filter: PaginationFilter;

  private resources: Endpoint;
  private route: ActivatedRoute;

  constructor(
    resources: Endpoint,
    route: ActivatedRoute
  ) {
    this.resources = resources;
    this.route = route;
  }

  ngOnInit() {

    this.route.params.subscribe(() => {

      if (!this.filter) {
        return;
      }

      this.reload(this.filter);
    });

  }

  public async reload(filter: PaginationFilter) {

    // We do not need to handle errors here, they are handled in the user interface

    delete this.error;

    let categoryId = extractNaturalNumber(this.route.snapshot.paramMap.get('categoryId'), null);

    if (categoryId === null) {
      this.error = true;
      return;
    }

    try {

      let [ category, products ] = await Promise.all([
        this.resources.categories.getCategory({ categoryId }),
        this.resources.products.getProductsByCategory({ categoryId, ...filter })
      ]);

      this.category = category;
      this.products = products;

    } catch {
      this.error = true;
    }
  }

  public async onPagination(filter: PaginationFilter) {
    this.filter = filter;
    this.reload(this.filter);
  }

}
