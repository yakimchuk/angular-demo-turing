import { Injectable } from '@angular/core';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';

export enum OrderState {
  Unpaid = 0,
  Paid = 2
}

export interface Order {
  id: number;
  name: string;
  created: Date;
  shipped: Date;
  status: OrderState;
  cost: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  cost: number;
  quantity: number;
  subtotal: number;
}

export interface OrdersService {
  create(options: { cartId: string, shippingVariantId: number, taxId: number }): Promise<number>;
}

@Injectable()
export class Orders implements OrdersService {

  private resources: EndpointGatewayService;

  constructor(resources: Endpoint) {
    this.resources = resources;
  }

  async create(options: { cartId: string, shippingVariantId: number, taxId: number }) {
    return await this.resources.orders.create(options);
  }

}
