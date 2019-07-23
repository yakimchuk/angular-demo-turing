import { Component, OnInit } from '@angular/core';
import { fade, slideTop } from '@app/utilities/transitions';
import { Endpoint } from '@app/services/endpoint';
import { Department } from '@app/services/departments';

@Component({
  selector: 'app-departments-navigation',
  templateUrl: './departments-navigation.component.html',
  styleUrls: ['./departments-navigation.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentsNavigationComponent implements OnInit {

  public departments: Department[];
  public error: ErrorEvent;

  private resources: Endpoint;

  constructor(resources: Endpoint) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.departments = (await this.resources.departments.getDepartments()).items;
    } catch (error) {
      this.error = error;
    }
  }

  async ngOnInit() {
    this.reload();
  }

}
