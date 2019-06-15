import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { fade, slideTop } from '@app/common/transitions';
import { Category } from '@app/networking/schemas';
import { Resources } from '@app/networking/resources';
import * as _ from 'lodash';

@Component({
  selector: 'app-department-categories',
  templateUrl: './department-categories.component.html',
  styleUrls: ['./department-categories.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentCategoriesComponent implements OnChanges {

  @Input('departmentId') departmentId: number;

  public categories: Category[];
  public error: ErrorEvent;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.categories = await this.resources.categories.byDepartment.get(this.departmentId);
    } catch (error) {
      this.error = error;
    }
  }

  ngOnInit() {

  }

  ngOnChanges() {

    if (!_.isNumber(this.departmentId)) {
      return;
    }

    this.reload();
  }

}
