import { Injectable } from '@angular/core';
import { IRemoteData, Resources } from '@app/services/resources';
import { Auth, IAuth } from '@app/services/auth';

export interface IUserModel {

  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  regionId: number;
  postalCode: string;
  country: string;
  phone: {
    day: string;
    evening: string;
    mobile: string;
  };
  creditCard: string;

}

export interface IUser {

  model?: IUserModel;

  logout(): Promise<any>;
  reload(): Promise<any>;

}

@Injectable()
export class User implements IUser {

  private resources: IRemoteData;
  private auth: IAuth;

  constructor(resources: Resources, auth: Auth) {

    this.resources = resources;
    this.auth = auth;

    if (this.auth.isAuthorized()) {
      this.reload();
    }

  }

  model: IUserModel;

  logout(): Promise<any> {
    return undefined;
  }

  async reload() {
    this.model = await this.resources.users.get();
  }

  // @todo: Implement this service

}
