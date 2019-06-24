import { Injectable, OnInit } from '@angular/core';
import { ITax } from '@app/services/schemas';
import { IRemoteData, Resources } from '@app/services/resources';
import { Subject } from 'rxjs';
import { IEvent, IServiceState, ServiceEvents } from '@app/types/common';


export interface ITaxes extends Subject<IEvent> {

  state: IServiceState;
  reload(): Promise<any>;

  list: ITax[];
  total: number;
}

const defaultState: IServiceState = {
  ready: false,
  error: false
};


@Injectable()
export class Taxes extends Subject<IEvent> implements ITaxes {

  public state: IServiceState = defaultState;

  public list: ITax[] = [];
  public total: number;

  private resources: IRemoteData;

  constructor(resources: Resources) {

    super();

    this.resources = resources;
    this.reload();
  }

  public async reload() {

    this.state = defaultState;

    try {

      this.list = await this.resources.taxes.getTaxes();
      this.total = this.list.reduce((sum: number, tax: ITax) => sum + parseFloat(tax.tax_percentage), 0);

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
