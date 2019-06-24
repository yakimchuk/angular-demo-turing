import { Component, OnInit, HostBinding } from '@angular/core';
import { fade, slideTop } from '@app/utilities/transitions';
import { Resources } from '@app/services/resources';
import { IDepartment } from '@app/services/schemas';

@Component({
  selector: 'app-departments-navigation',
  templateUrl: './departments-navigation.component.html',
  styleUrls: ['./departments-navigation.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentsNavigationComponent implements OnInit {

  public departments: IDepartment[];
  public error: ErrorEvent;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.departments = await this.resources.departments.getDepartments();
    } catch (error) {
      this.error = error;
    }
  }

  async ngOnInit() {
    this.reload();
  }

}
