import { Injectable } from '@angular/core';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { Auth, AuthenticationService } from '@app/services/auth';
import { Order } from '@app/services/orders';
import { Subject } from 'rxjs';
import { IEvent, ServiceEvents } from '@app/types/common';

export interface UserPersonalData {
  name: string;
  email: string;
  phone: {
    day?: string;
    evening?: string;
    mobile?: string;
  };
}

export interface UserAddress {
  address1: string;
  address2: string;
  city: string;
  region: string;
  shippingRegionId: number;
  postalCode: string;
  country: string;
}

export interface UserModel extends UserPersonalData, UserAddress {
  id: number;
  creditCard: string;
}

export interface UserService extends Subject<IEvent> {

  // User data
  model?: UserModel;

  // User orders
  orders?: Order[];

  // Log out from the account
  // Must be here, as it is a user action
  logout(): Promise<any>;

  reload(): Promise<any>;
}

@Injectable()
export class User extends Subject<IEvent> implements UserService {

  private resources: EndpointGatewayService;
  private auth: AuthenticationService;

  constructor(resources: Endpoint, auth: Auth) {

    super();

    this.resources = resources;
    this.auth = auth;

    if (!this.auth.isAuthenticated()) {
      return;
    }

    // Asynchronous process, app must can handle any state of any data
    this.reload();
  }

  model: UserModel;
  orders: Order[] = [];

  async logout(): Promise<any> {

    // Exceptions must be handled outside
    // Cannot be handled as it is the main action of this method
    await this.auth.logout();

    delete this.model;
    delete this.orders;

    this.orders = [];
  }

  async reload() {

    // Exceptions must be handled outside
    this.model = await this.resources.users.get();
    this.orders = (await this.resources.orders.getCurrentUserOrders()).items;

    this.next({ name: ServiceEvents.Update });
  }

}
