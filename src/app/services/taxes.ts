import { Injectable } from '@angular/core';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { Subject } from 'rxjs';
import { IEvent, ServiceState, ServiceEvents } from '@app/types/common';

export interface Tax {
  id: number;
  name: string;
  percent: number;
}

export interface TaxesService extends Subject<IEvent> {

  state: ServiceState;
  list: Tax[];

  reload(): Promise<any>;
}

const DEFAULT_SERVICE_STATE: ServiceState = {
  ready: false,
  error: false
};


@Injectable()
export class Taxes extends Subject<IEvent> implements TaxesService {

  public state: ServiceState = DEFAULT_SERVICE_STATE;

  public list: Tax[] = [];

  private resources: EndpointGatewayService;

  constructor(resources: Endpoint) {

    super();

    this.resources = resources;

    // Asynchronous process, app must can handle any state of any data
    this.reload();
  }

  public async reload() {

    delete this.state.error;
    delete this.state.ready;

    try {

      // Exceptions cannot be handled, taxation will be broken without this list
      this.list = (await this.resources.taxes.getTaxes()).items;

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
