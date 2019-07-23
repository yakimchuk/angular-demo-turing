import { Injectable } from '@angular/core';
import { IEvent, ServiceState, ServiceEvents } from '@app/types/common';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { Subject } from 'rxjs';

export interface ShippingService extends Subject<IEvent> {

  state: ServiceState;
  areas: ShippingArea[];

  getAreas(): Promise<ShippingArea[]>;
  getVariantsByArea(options: { areaId: number }): Promise<ShippingVariant[]>;

  reload(): Promise<any>;

}

export interface ShippingArea {
  id: number;
  name: string;
}

export interface ShippingVariant {
  id: number;
  name: string;
  cost: number;
}

const DEFAULT_SERVICE_STATE: ServiceState = {
  ready: false,
  error: false
};

@Injectable()
export class Shipping extends Subject<IEvent> implements ShippingService {

  public state: ServiceState = DEFAULT_SERVICE_STATE;
  public areas: ShippingArea[] = [];

  private resources: EndpointGatewayService;

  constructor(resources: Endpoint) {

    super();

    this.resources = resources;

    // Asynchronous process, app must can handle any state of any data
    this.reload();
  }

  public async getAreas() {
    // There must be external exception handling
    return (await this.resources.shipping.getAreas()).items;
  }

  public async getVariantsByArea(options: { areaId: number }) {
    // There must be external exception handling
    return (await this.resources.shipping.getVariantsByArea(options)).items;
  }

  public async reload() {

    this.state = DEFAULT_SERVICE_STATE;

    try {
      this.areas = await this.getAreas();
    } catch {
      this.state.error = true;
    } finally {
      this.state.ready = true;
    }

    this.next({
      name: ServiceEvents.Update
    });

  }

}
