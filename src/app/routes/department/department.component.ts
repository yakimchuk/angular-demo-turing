import { Component, OnInit } from '@angular/core';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import { Resources } from '@app/services/resources';
import { IDepartment, IListResponse, IProduct } from '@app/services/schemas';
import { fade, slideTop } from '@app/utilities/transitions';
import { ActivatedRoute } from '@angular/router';
import { extractNaturalNumber } from '@app/utilities/extractor';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentRouteComponent implements OnInit {

  public department: IDepartment;
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

    let departmentId = extractNaturalNumber(this.route.snapshot.paramMap.get('departmentId'), null);

    if (departmentId === null) {
      this.error = true;
      return;
    }

    try {

      let [ department, products ] = await Promise.all([
        this.resources.departments.getDepartment(departmentId),
        this.resources.products.getProductsByDepartment(departmentId, filter)
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