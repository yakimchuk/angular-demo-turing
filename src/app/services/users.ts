import { Injectable } from '@angular/core';
import { IRemoteData, Resources } from '@app/services/resources';

export interface IUsers {

  create(name: string, email: string, password: string): Promise<any>;

}

@Injectable()
export class Users implements IUsers {

  private resources: IRemoteData;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  async create(name: string, email: string, password: string) {
    await this.resources.users.create(name, email, password);
  }


}
