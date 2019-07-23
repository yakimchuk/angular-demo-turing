import { Injectable } from '@angular/core';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';

export interface UsersService {

  // Register user
  // Authentication is required after registration
  create(options: { name: string, email: string, password: string }): Promise<any>;
}

@Injectable()
export class Users implements UsersService {

  private resources: EndpointGatewayService;

  constructor(resources: Endpoint) {
    this.resources = resources;
  }

  async create(options: { name: string, email: string, password: string }) {
    await this.resources.users.create(options);
  }

}
