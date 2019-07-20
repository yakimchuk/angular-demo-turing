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
  IUser, IAuthCredentials, IAccessToken, IPaymentResponse, IProductDetails, TuringProductAttribute, TuringReview
} from './schemas';
import * as ajv from 'ajv';
import { PaginationFilter } from '../components/products-navigator/products-navigator.component';
import * as _ from 'lodash';
import { toFormData } from '@app/utilities/adapters';
import { IShippingArea, IShippingVariant } from '@app/services/shipping';
import { IUserAddress, IUserModel, IUserProfile } from '@app/services/user';
import { IOrder, IOrderItem, OrderState } from '@app/services/orders';
import { IOrder as IRemoteOrder, IOrderItem as IRemoteOrderItem } from '@app/services/schemas.ts';
import { ProductAttribute } from '@app/services/products';
import { Review } from '@app/services/reviews';

const schemasConverter = new ajv();

export interface IRemoteCartData {
  getItems(cartId: string): Promise<ICartItem[]>;
  addItem(cartId: string, productId: number, attributes: string): Promise<any>;
  updateItem(cartId: string, itemId: number, quantity: number): Promise<any>;
  removeItem(cartId: string, itemId: number): Promise<any>;
  register(): Promise<any>;
}

export interface IRemoteProductsData {
  search(query:string, pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
  getProduct(productId: number): Promise<IProductDetails>;
  getProducts(pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
  getProductReviews(productId: number): Promise<Review[]>;
  createProductReview(productId: number, review: string, rating: number): Promise<any>;
  getProductsByCategory(categoryId: number, pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
  getProductsByDepartment(departmentId: number, pagination: PaginationFilter): Promise<IListResponse<IProduct>>;
  getProductAttributes(productId: number): Promise<ProductAttribute[]>;
}

export interface IRemoteDepartmentsData {
  getDepartments(): Promise<IDepartment[]>;
  getDepartment(departmentId: number): Promise<IDepartment>;
}

export interface IRemoteCategoriesData {
  getDepartmentCategories(departmentId: number): Promise<ICategory[]>;
  getCategory(categoryId: number): Promise<ICategory>;
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
  get(): Promise<IUserModel>;
  updateProfile(model: IUserProfile, password: string): Promise<any>;
  updateShipping(model: IUserAddress): Promise<any>;
}

export interface IRemoteUsersGateway {
  login(email: string, password: string): Promise<IAccessToken>;
}

export interface IRemoteOrdersData {
  getCurrentUserOrders(): Promise<IOrder[]>;
  getOrderItems(orderId: number): Promise<IOrderItem[]>;
  create(cartId: string, shippingVariantId: number, taxId: number): Promise<number>;
}

export interface IRemotePaymentData {
  charge(token: string, orderId: number, description: string, amount: number, currency: string): Promise<IPaymentResponse>;
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
  orders: IRemoteOrdersData;
  payment: IRemotePaymentData;
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

  private guard<T>(request: Observable<T>, schema: object|null): Promise<T> {
    return new Promise<T> (function (resolve, reject) {

      let validate;

      try {
        validate = schema === null ? () => true : schemasConverter.compile(schema);
      } catch (error) {
        console.error(`Response schema complation errors`, error, schemasConverter.errors);
        reject(error);
        return;
      }

      request.subscribe(
  response => {

          if (!validate(response)) {
            console.error(`Response schema validation errors`, validate.errors);
            reject(new TypeError(`Response has an invalid format, expected schema ${JSON.stringify(schema)} but got value "${JSON.stringify(response)}"`));
            return;
          }

          resolve(response);

        },
  error => reject(error)
      );

    });
  }

  payment: IRemotePaymentData = {

    charge: async (token: string, orderId: number, description: string, amount: number, currency: string) => {
      return await this.guard<IPaymentResponse>(
        this.http.post<IPaymentResponse>(this.toResourceUrl(api.endpoint, `/stripe/charge`), toFormData({
          stripeToken: token,
          order_id: orderId,
          description: description,
          amount: amount * 100,
          currency: currency
        })),
        null
      );
    },

  };

  orders: IRemoteOrdersData = {

    getOrderItems: async (orderId: number) => {

      let data = await this.guard<IRemoteOrderItem[]>(
        this.http.get<IRemoteOrderItem[]>(this.toResourceUrl(api.endpoint, `/orders/${orderId}`)),
        schemas.orders.info
      );

      return data.map<IOrderItem>((item: IRemoteOrderItem) => ({
        productId: item.product_id,
        name: item.product_name,
        cost: parseFloat(item.unit_cost),
        quantity: item.quantity,
        attributes: item.attributes,
        subtotal: parseFloat(item.subtotal)
      }));

    },

    create: async (cartId: string, shippingId: number, taxId: number) => {

      let data = await this.guard<{ orderId: number }>(
        this.http.post<{ orderId: number }>(this.toResourceUrl(api.endpoint, `/orders`), toFormData({
          cart_id: cartId,
          shipping_id: shippingId,
          tax_id: taxId
        })),
        schemas.orders.create
      );

      return data.orderId;

    },

    getCurrentUserOrders: async () => {

      let data = await this.guard<IRemoteOrder[]>(
        this.http.get<IRemoteOrder[]>(this.toResourceUrl(api.endpoint, `/orders/inCustomer`)),
        schemas.orders.byCustomer
      );

      let result: IOrder[] = data.map<IOrder>((order: IRemoteOrder) => {

        if (!(order.status in OrderState)) {
          throw new TypeError(`Order format is incompatible`);
        }

        return {
          id: order.order_id,
          name: order.name,
          created: new Date(order.created_on),
          shipped: order.shipped_on === null ? null : new Date(order.shipped_on),
          // @ts-ignore: This value is correct due to the check above
          status: order.status as OrderState,
          cost: parseFloat(order.total_amount)
        };
      });

      return result;

    },

  };

  users: IRemoteUsersData = {

    get: async () => {

      let data = await this.guard<IUser>(
        this.http.get<IUser>(this.toResourceUrl(api.endpoint, `/customer`)),
        schemas.customers.get
      );
      
      let result: IUserModel = {
        id: data.customer_id,
        name: data.name,
        email: data.email,
        address1: data.address_1,
        address2: data.address_2,
        city: data.city,
        region: data.region,
        shippingRegionId: data.shipping_region_id,
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

    updateProfile: async (model: IUserProfile, password: string) => {

      await this.guard<void>(
        this.http.put<void>(this.toResourceUrl(api.endpoint, `/customer`), toFormData({
          name: model.name,
          email: model.email,
          password: password,
          day_phone: model.phone.day,
          eve_phone: model.phone.evening,
          mob_phone: model.phone.mobile
        })),
        null
      );

    },

    updateShipping: async (model: IUserAddress) => {

      await this.guard<void>(
        this.http.put<void>(this.toResourceUrl(api.endpoint, `/customers/address`), toFormData({
          address_1: model.address1,
          address_2: model.address2,
          city: model.city,
          region: model.region,
          postal_code: model.postalCode,
          country: model.country,
          shipping_region_id: model.shippingRegionId
        })),
        null
      );

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

    createProductReview: (productId: number, review: string, rating: number) => {
      return this.guard<[]>(
        this.http.post<[]>(this.toResourceUrl(api.endpoint, `/products/${productId}/reviews`), toFormData({
          review,
          rating
        })),
        null
      );
    },

    getProductReviews: async (productId: number) => {

      let response = await this.guard<TuringReview[]>(
        this.http.get<TuringReview[]>(this.toResourceUrl(api.endpoint, `/products/${productId}/reviews`)),
        schemas.products.reviews.list
      );

      return response.map<Review>((review: TuringReview) => ({
        name: review.name,
        review: review.review,
        rating: review.rating > 5 ? 5 : review.rating,
        created: new Date(review.created_on)
      }));
    },

    getProductAttributes: async (productId: number) => {

      let result = await this.guard<TuringProductAttribute[]>(
        this.http.get<TuringProductAttribute[]>(this.toResourceUrl(api.endpoint, `/attributes/inProduct/${productId}`)),
        schemas.attributes.product
      );

      let attributes: ProductAttribute[] = [];
      let memo = {};

      result.forEach((attribute: TuringProductAttribute) => {

        if (!memo[attribute.attribute_name]) {
          memo[attribute.attribute_name] = {
            name: attribute.attribute_name,
            values: []
          }
        }

        memo[attribute.attribute_name].values.push({
          id: attribute.attribute_value_id,
          name: attribute.attribute_value
        });

      });

      for (let key in memo) {
        attributes.push(memo[key]);
      }

      return attributes;
    },
    getProduct: async (productId: number) => {

      let response = await this.guard<IProductDetails[]>(
        this.http.get<IProductDetails[]>(this.toResourceUrl(api.endpoint, `/products/${productId}/details`)),
        schemas.products.single
      );

      return response[0];
    },
    getProductsByDepartment: (departmentId: number, filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, `/products/inDepartment/${departmentId}`), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.list
      );
    },
    getProductsByCategory: (categoryId: number, filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, `/products/inCategory/${categoryId}`), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.list
      );
    },
    getProducts: (filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, '/products'), {
          params: _.mapValues(filter, (value) => value + '')
        }),
        schemas.products.list
      );
    },
    search: (query: string, filter: PaginationFilter) => {
      return this.guard<IListResponse<IProduct>>(
        this.http.get<IListResponse<IProduct>>(this.toResourceUrl(api.endpoint, '/products/search'), {
          params: _.mapValues({ query_string: query, ...filter, all_words: 'off' }, (value) => value + '')
        }),
        schemas.products.list
      );
    }
  };

  departments: IRemoteDepartmentsData = {
    getDepartment: (departmentId) => {
      return this.guard<IDepartment>(
        this.http.get<IDepartment>(this.toResourceUrl(api.endpoint, `/departments/${departmentId}`)),
        schemas.departments.get
      );
    },
    getDepartments: () => {
      return this.guard<IDepartment[]>(
        this.http.get<IDepartment[]>(this.toResourceUrl(api.endpoint, '/departments')),
        schemas.departments.all
      );
    }
  };

  categories: IRemoteCategoriesData = {
    getDepartmentCategories: (departmentId: number) => {
      return this.guard<ICategory[]>(
        this.http.get<ICategory[]>(this.toResourceUrl(api.endpoint, `/categories/inDepartment/${departmentId}`)),
        schemas.categories.byDepartment.get
      );
    },
    getCategory: (categoryId: number) => {
      return this.guard<ICategory>(
        this.http.get<ICategory>(this.toResourceUrl(api.endpoint, `/categories/${categoryId}`)),
        schemas.categories.get
      );
    },
  };

}
