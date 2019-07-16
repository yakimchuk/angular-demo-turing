import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Resources } from '@app/services/resources';
import { ICategory, IDepartment, IListResponse, IProduct } from '@app/services/schemas';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { ActivatedRoute } from '@angular/router';
import { extractNaturalNumber } from '@app/utilities/extractor';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [slideTop, fade, slideRight]
})
export class CategoryRouteComponent implements OnInit {

  public category: ICategory;
  public products: IListResponse<IProduct>;
  public error: boolean = false;
  public filter: PaginationFilter;

  private resources: Resources;
  private route: ActivatedRoute;

  constructor(resources: Resources, route: ActivatedRoute) {
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

    delete this.error;

    let categoryId = extractNaturalNumber(this.route.snapshot.paramMap.get('categoryId'), null);

    if (categoryId === null) {
      this.error = true;
      return;
    }

    try {

      let [ category, products ] = await Promise.all([
        this.resources.categories.getCategory(categoryId),
        this.resources.products.getProductsByCategory(categoryId, filter)
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
