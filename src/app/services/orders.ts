import { Injectable } from '@angular/core';
import { IRemoteData, Resources } from '@app/services/resources';

export enum OrderState {
  Unpaid = 0,
  Paid = 2
}

export interface IOrder {
  id: number;
  name: string;
  created: Date;
  shipped: Date;
  status: OrderState;
  cost: number;
}

export interface IOrderItem {
  productId: number;
  name: string;
  cost: number;
  quantity: number;
  subtotal: number;
}

export interface IOrders {
  create(cartId: string, shippingId: number, taxId: number): Promise<number>;
}

@Injectable()
export class Orders implements IOrders {

  private resources: IRemoteData;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  async create(cartId: string, shippingId: number, taxId: number) {
    return await this.resources.orders.create(cartId, shippingId, taxId);
  }

}
