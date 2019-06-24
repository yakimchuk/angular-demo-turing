// @todo: Replace with resource library if it will be available on NPM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../config';
import { Observable } from 'rxjs';
import { ICartId, ICartItem, ICategory, IDepartment, IListResponse, IProduct, ITax, IShippingVariant as IShippingRemoteVariant, IShippingRegion, schemas } from './schemas';
import * as ajv from 'ajv';
import { PaginationFilter } from '../components/products-navigator/products-navigator.component';
import * as _ from 'lodash';
import { toFormData } from '@app/utilities/adapters';
import { IShippingArea, IShippingVariant } from '@app/services/shipping';

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

export interface IRemoteData {
  cart: IRemoteCartData;
  products: IRemoteProductsData;
  departments: IRemoteDepartmentsData;
  categories: IRemoteCategoriesData;
  taxes: IRemoteTaxesData;
  shipping: IRemoteShippingData;
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
