import { Component, OnInit, HostBinding } from '@angular/core';
import { fade, slideTop } from '@app/common/transitions';
import { Resources } from '@app/networking/resources';
import { Department } from '@app/networking/schemas';

@Component({
  selector: 'app-departments-navigation',
  templateUrl: './departments-navigation.component.html',
  styleUrls: ['./departments-navigation.component.scss'],
  animations: [slideTop, fade]
})
export class DepartmentsNavigationComponent implements OnInit {

  public departments: Department[];
  public error: ErrorEvent;

  private resources: Resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    try {
      this.departments = await this.resources.departments.get();
    } catch (error) {
      this.error = error;
    }
  }

  async ngOnInit() {
    this.reload();
  }

}
