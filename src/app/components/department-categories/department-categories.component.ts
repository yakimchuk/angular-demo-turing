import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { fade, slideTop } from '@app/utilities/transitions';
import { Endpoint } from '@app/services/endpoint';
import * as _ from 'lodash';
import { Category } from '@app/services/categories';

@Component({
  selector: 'app-department-categories',
  templateUrl: './department-categories.component.html',
  styleUrls: ['./department-categories.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentCategoriesComponent implements OnChanges {

  @Input() public departmentId: number;

  public categories: Category[];
  public error: ErrorEvent;

  private resources: Endpoint;

  constructor(resources: Endpoint) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.categories = (await this.resources.categories.getDepartmentCategories({ departmentId: this.departmentId })).items;
    } catch (error) {
      this.error = error;
    }
  }

  ngOnChanges() {

    if (!_.isNumber(this.departmentId)) {
      return;
    }

    this.reload();
  }

}
