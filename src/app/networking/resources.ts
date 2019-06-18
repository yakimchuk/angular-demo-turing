// @todo: Replace with resource library if it will be available on NPM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '@app/config';
import { Observable } from 'rxjs';
import { Category, Department, ListResponse, Product, schemas } from '@app/networking/schemas';
import * as ajv from 'ajv';
import { PaginationFilter } from '@app/components/products-navigator/products-navigator.component';
import * as _ from 'lodash';

const schemasConverter = new ajv();

@Injectable({
  providedIn: 'root'
})
export class Resources {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private toResourceUrl(endpoint: string, resource: string) {

    let url = new URL(endpoint);
    url.pathname = resource;

    return url.toString();
  }

  private guard<T>(request: Observable<T>, schema: object): Promise<T> {
    return new Promise<T> (function (resolve) {

      let validate = schemasConverter.compile(schema);

      request.subscribe(response => {

        if (!validate(response)) {
          throw new TypeError(`Response has an invalid format, expected schema ${JSON.stringify(schema)} but got value "${JSON.stringify(response)}"`)
        }

        resolve(response);

      })
    });
  }

  products = {
    get: (filter: PaginationFilter) => {

      return this.guard<ListResponse<Product>>(
        this.http.get<ListResponse<Product>>(this.toResourceUrl(api.endpoint, '/products'), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.get
      );

    }
  };

  departments = {
    get: () => {
      return this.guard<Department[]>(
        this.http.get<Department[]>(this.toResourceUrl(api.endpoint, '/departments')),
        schemas.departments.get
      );
    }
  };

  categories = {
    byDepartment: {
      get: (departmentId) => {
        return this.guard<Category[]>(
          this.http.get<Category[]>(this.toResourceUrl(api.endpoint, `/categories/inDepartment/${departmentId}`)),
          schemas.categories.byDepartment.get
        );
      }
    }
  };

}
