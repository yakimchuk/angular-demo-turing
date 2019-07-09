import { Injectable } from '@angular/core';
import { IRemoteData, Resources } from '@app/services/resources';
import { Auth, IAuth } from '@app/services/auth';
import { IOrder } from '@app/services/orders';
import { Subject } from 'rxjs';
import { IEvent, ServiceEvents } from '@app/types/common';

export interface IUserProfile {
  name: string;
  email: string;
  phone: {
    day?: string;
    evening?: string;
    mobile?: string;
  };
}

export interface IUserAddress {
  address1: string;
  address2: string;
  city: string;
  region: string;
  shippingRegionId: number;
  postalCode: string;
  country: string;
}

export interface IUserModel extends IUserProfile, IUserAddress {
  id: number;
  creditCard: string;
}

export interface IUser extends Subject<IEvent> {

  model?: IUserModel;
  orders?: IOrder[];

  logout(): Promise<any>;
  reload(): Promise<any>;

}

@Injectable()
export class User extends Subject<IEvent> implements IUser {

  private resources: IRemoteData;
  private auth: IAuth;

  constructor(resources: Resources, auth: Auth) {

    super();

    this.resources = resources;
    this.auth = auth;

    if (this.auth.isAuthorized()) {
      this.reload();
    }

  }

  model: IUserModel;
  orders: IOrder[] = [];

  async logout(): Promise<any> {

    await this.auth.logout();

    delete this.model;
    delete this.orders;

    this.orders = [];
  }

  async reload() {

    this.model = await this.resources.users.get();
    this.orders = await this.resources.orders.getCurrentUserOrders();

    this.next({ name: ServiceEvents.Update });
  }

}
