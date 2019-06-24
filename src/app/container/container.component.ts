import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

  private device: DeviceDetectorService;
  public isOpenedMenu: boolean;

  constructor(device: DeviceDetectorService) {
    this.device = device;
    this.isOpenedMenu = this.isAlwaysVisibleMenu();
  }

  public isAlwaysVisibleMenu() {
    return this.device.isDesktop();
  }

  public onMenuStateChange(visibility: boolean) {
    this.isOpenedMenu = visibility;
  }

  ngOnInit() {
  }

}
