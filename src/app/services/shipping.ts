import { Injectable } from '@angular/core';
import { IServiceState } from '@app/types/common';
import { IRemoteData, Resources } from '@app/services/resources';

export interface IShipping {

  state: IServiceState;
  areas: IShippingArea[];

  getAreas(): Promise<IShippingArea[]>;
  getVariantsByArea(areaId: number): Promise<IShippingVariant[]>;

  reload(): Promise<any>;

}

export interface IShippingArea {
  id: number;
  name: string;
}

export interface IShippingVariant {
  id: number;
  name: string;
  cost: number;
}

const defaultState: IServiceState = {
  ready: false,
  error: false
};

@Injectable()
export class Shipping implements IShipping {

  public state: IServiceState = defaultState;
  public areas: IShippingArea[] = [];

  private resources: IRemoteData;

  constructor(resources: Resources) {
    this.resources = resources;
    this.reload();
  }

  public async getAreas() {
    return await this.resources.shipping.getAreas();
  }

  public async getVariantsByArea(areaId: number) {
    return await this.resources.shipping.getVariantsByArea(areaId);
  }

  public async reload() {

    this.state = defaultState;

    try {
      this.areas = await this.getAreas();
    } catch {
      this.state.error = true;
    } finally {
      this.state.ready = true;
    }

  }

}
