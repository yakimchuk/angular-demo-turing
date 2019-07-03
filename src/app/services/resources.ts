// @todo: Replace with resource library if it will be available on NPM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../config';
import { Observable } from 'rxjs';
import {
  ICartId,
  ICartItem,
  ICategory,
  IDepartment,
  IListResponse,
  IProduct,
  ITax,
  IShippingVariant as IShippingRemoteVariant,
  IShippingRegion,
  schemas,
  IUser, IAuthCredentials, IAccessToken
} from './schemas';
import * as ajv from 'ajv';
import { PaginationFilter } from '../components/products-navigator/products-navigator.component';
import * as _ from 'lodash';
import { toFormData } from '@app/utilities/adapters';
import { IShippingArea, IShippingVariant } from '@app/services/shipping';
import { IUserModel } from '@app/services/user';

const schemasConverter = new ajv();

export interface IRemoteCartData {
  getItems(cartId: string): Promise<ICartItem[]>;
  addItem(cartId: string, productId: number, attributes: string): Promise<any>;
  updateItem(cartId: string, itemId: number, quantity: number): Promise<any>;
  removeItem(cartId: string, itemId: number): Promise<any>;
  register(): Promise<any>;
}

export interface IRemoteProductsData {
  search(pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
  getProducts(pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
}

export interface IRemoteDepartmentsData {
  getDepartments(): Promise<IDepartment[]>;
}

export interface IRemoteCategoriesData {
  getDepartmentCategories(departmentId: number): Promise<ICategory[]>;
}

export interface IRemoteTaxesData {
  getTaxes(): Promise<ITax[]>;
}

export interface IRemoteShippingData {
  getAreas(): Promise<IShippingArea[]>;
  getVariantsByArea(areaId: number): Promise<IShippingVariant[]>;
}

export interface IRemoteUsersData {
  create(name: string, email: string, password: string): Promise<any>;
  get(): Promise<IUserModel>
}

export interface IRemoteUsersGateway {
  login(email: string, password: string): Promise<IAccessToken>;
}

export interface IRemoteData {
  cart: IRemoteCartData;
  products: IRemoteProductsData;
  departments: IRemoteDepartmentsData;
  categories: IRemoteCategoriesData;
  taxes: IRemoteTaxesData;
  shipping: IRemoteShippingData;
  users: IRemoteUsersData;
  auth: IRemoteUsersGateway;
}

@Injectable()
export class Resources implements IRemoteData {

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
    return new Promise<T> (function (resolve, reject) {

      let validate;

      try {
        validate = schemasConverter.compile(schema);
      } catch (error) {
        reject(error);
        return;
      }

      request.subscribe(
  response => {

          if (!validate(response)) {
            reject(new TypeError(`Response has an invalid format, expected schema ${JSON.stringify(schema)} but got value "${JSON.stringify(response)}"`));
            return;
          }

          resolve(response);

        },
  error => reject(error)
      );

    });
  }

  users: IRemoteUsersData = {

    get: async () => {

      let data = await this.guard<IUser>(
        this.http.get<IUser>(this.toResourceUrl(api.endpoint, `/customer`)),
        schemas.customers.get
      );
      
      let result: IUserModel = {
        id: data.customer_id,
        name: data.name,
        address1: data.address_1,
        address2: data.address_2,
        city: data.city,
        region: data.region,
        regionId: data.shipping_region_id,
        postalCode: data.postal_code,
        country: data.country,
        phone: {
          day: data.day_phone,
          evening: data.eve_phone,
          mobile: data.mob_phone,
        },
        creditCard: data.credit_card
      };

      return result;

    },

    create: async (name: string, email: string, password: string) => {

      await this.guard<void>(
        this.http.post<void>(this.toResourceUrl(api.endpoint, `/customers`), toFormData({
          name,
          email,
          password
        })),
        schemas.customers.create
      );

    }
  };

  auth: IRemoteUsersGateway = {

    login: async (email: string, password: string) => {

      let data = await this.guard<IAuthCredentials>(
          this.http.post<IAuthCredentials>(this.toResourceUrl(api.endpoint, `/customers/login`), toFormData({
            email, password
          })),
          schemas.customers.login
        );

      console.log('login response', data);

      return data.accessToken;

    },

  };

  shipping: IRemoteShippingData = {

    getAreas: async () => {

      let data: IShippingRegion[] = await this.guard<IShippingRegion[]>(
        this.http.get<IShippingRegion[]>(this.toResourceUrl(api.endpoint, `/shipping/regions`)),
        schemas.shipping.regions.all
      );

      return data.map<IShippingArea>((value: IShippingRegion) => {
        return {
          id: value.shipping_region_id,
          name: value.shipping_region
        }
      });

    },

    getVariantsByArea: async (areaId: number) => {

      let data: IShippingRemoteVariant[] = await this.guard<IShippingRemoteVariant[]>(
        this.http.get<IShippingRemoteVariant[]>(this.toResourceUrl(api.endpoint, `/shipping/regions/${areaId}`)),
        schemas.shipping.regions.concrete
      );

      return data.map<IShippingVariant>((value: IShippingRemoteVariant) => {
        return {
          id: value.shipping_id,
          name: value.shipping_type,
          cost: parseFloat(value.shipping_cost)
        }
      });

    }

  };

  taxes: IRemoteTaxesData = {
    getTaxes: () => {
      return this.guard<ITax[]>(
        this.http.get<ITax[]>(this.toResourceUrl(api.endpoint, `/tax`)),
        schemas.tax.get
      );
    }
  };

  cart: IRemoteCartData = {
    addItem: (cartId: string, productId: number, attributes: string = '') => {
      return this.guard<[]>(
        this.http.post<[]>(this.toResourceUrl(api.endpoint, '/shoppingcart/add'), toFormData({
          cart_id: cartId,
          product_id: productId,
          attributes: attributes
        })),
        schemas.shoppingcart.add.post
      );
    },
    updateItem: (cartId: string, itemId: number, quantity: number) => {
      return this.guard<[]>(
        this.http.put<[]>(this.toResourceUrl(api.endpoint, `/shoppingcart/update/${itemId}`), toFormData({
          quantity: quantity
        })),
        schemas.shoppingcart.update.put
      );
    },
    removeItem: (cartId: string, itemId: number) => {
      return this.guard<void>(
        this.http.delete<void>(this.toResourceUrl(api.endpoint, `/shoppingcart/removeProduct/${itemId}`)),
        schemas.shoppingcart.removeProduct.delete
      );
    },
    register: () => {
      return this.guard<ICartId>(
        this.http.get<ICartId>(this.toResourceUrl(api.endpoint, '/shoppingcart/generateUniqueId')),
        schemas.shoppingcart.generateUniqueId.get
      );
    },
    getItems: (cartId: string) => {
      return this.guard<ICartItem[]>(
        this.http.get<ICartItem[]>(this.toResourceUrl(api.endpoint, `/shoppingcart/${cartId}`)),
        schemas.shoppingcart.items.get
      );
    }
  };

  products: IRemoteProductsData = {
    getProducts: (filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, '/products'), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.get
      );
    },
    search: (filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, '/products/search'), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.get
      );
    }
  };

  departments: IRemoteDepartmentsData = {
    getDepartments: () => {
      return this.guard<IDepartment[]>(
        this.http.get<IDepartment[]>(this.toResourceUrl(api.endpoint, '/departments')),
        schemas.departments.get
      );
    }
  };

  categories: IRemoteCategoriesData = {
    getDepartmentCategories: (departmentId: number) => {
      return this.guard<ICategory[]>(
        this.http.get<ICategory[]>(this.toResourceUrl(api.endpoint, `/categories/inDepartment/${departmentId}`)),
        schemas.categories.byDepartment.get
      );
    }
  };

}
