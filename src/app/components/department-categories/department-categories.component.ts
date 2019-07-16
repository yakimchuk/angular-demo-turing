import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { fade, slideTop } from '@app/utilities/transitions';
import { ICategory } from '@app/services/schemas';
import { Resources } from '@app/services/resources';
import * as _ from 'lodash';

@Component({
  selector: 'app-department-categories',
  templateUrl: './department-categories.component.html',
  styleUrls: ['./department-categories.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentCategoriesComponent implements OnChanges {

  @Input('departmentId') public departmentId: number;

  public categories: ICategory[];
  public error: ErrorEvent;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.categories = await this.resources.categories.getDepartmentCategories(this.departmentId);
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
