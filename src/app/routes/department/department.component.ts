import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Endpoint } from '@app/services/endpoint';
import { fade, slideTop } from '@app/utilities/transitions';
import { ActivatedRoute } from '@angular/router';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { Department } from '@app/services/departments';
import { List } from '@app/types/common';
import { Product } from '@app/services/products';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentRouteComponent implements OnInit {

  public department: Department;
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

    let departmentId = extractNaturalNumber(this.route.snapshot.paramMap.get('departmentId'), null);

    if (departmentId === null) {
      this.error = true;
      return;
    }

    try {

      let [ department, products ] = await Promise.all([
        this.resources.departments.getDepartment({ departmentId }),
        this.resources.products.getProductsByDepartment({ departmentId, ...filter })
      ]);

      this.department = department;
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
