// @todo: Replace with resource library if it will be available on NPM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../config';
import { Observable } from 'rxjs';
import {
  TuringCartId,
  TuringCartItem,
  TuringCategory,
  TuringDepartment,
  TuringListResponse,
  TuringProduct,
  TuringTax,
  TuringShippingVariant,
  TuringShippingRegion,
  TuringUser,
  TuringAuthenticationCredentials,
  TuringPaymentResponse,
  TuringProductDetails,
  TuringProductAttribute,
  TuringReview,
  schemas
} from './schemas.turing';
import * as ajv from 'ajv';
import { PaginationFilter } from '../components/products-navigator/products-navigator.component';
import * as _ from 'lodash';
import { toFormData } from '@app/utilities/adapters';
import { ShippingArea, ShippingVariant } from '@app/services/shipping';
import { UserAddress, UserModel, UserPersonalData } from '@app/services/user';
import { Order, OrderItem, OrderState } from '@app/services/orders';
import { TuringOrder, TuringOrderItem } from '@app/services/schemas.turing.ts';
import { Product, ProductAttribute } from '@app/services/products';
import { Review } from '@app/services/reviews';
import { CartItem } from '@app/services/cart';
import { Department } from '@app/services/departments';
import { Category } from '@app/services/categories';
import { Tax } from '@app/services/taxes';
import { ValidateFunction } from 'ajv';
import { PaymentResult } from '@app/services/payment';
import {
  AuthenticationEndpointGateway, CartEndpointGateway, CategoriesEndpointGateway, DepartmentsEndpointGateway,
  EndpointGatewayService,
  OrdersEndpointsGateway,
  PaymentEndpointGateway, ProductsEndpointGateway, ShippingEndpointGateway, TaxesEndpointGateway,
  UsersEndpointGateway
} from '@app/services/endpoint';

const schemasConverter = new ajv();

@Injectable()
export class TuringEndpoint implements EndpointGatewayService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public payment: PaymentEndpointGateway = {

    charge: async (options: { token: string, orderId: number, description: string, amount: number, currency: string }) => {
      return await this.guard<TuringPaymentResponse>({
        request: this.http.post<PaymentResult>(
          this.toResourceUrl({ resource: '/stripe/charge' }),
          toFormData({
            stripeToken: options.token,
            order_id: options.orderId,
            description: options.description,
            amount: Math.round(options.amount * 100), // Stripe receives amount in cents
            currency: options.currency
          })
        )
      });
    },

  };

  orders: OrdersEndpointsGateway = {

    getOrderItems: async ({ orderId }: { orderId: number }) => {

      let items = await this.guard<TuringOrderItem[]>({
        request: this.http.get<TuringOrderItem[]>(this.toResourceUrl({ resource: `/orders/${orderId}` })),
        schema: schemas.orders.info
      });

      return {
        count: items.length,
        items: items.map<OrderItem>((item: TuringOrderItem) => ({
          productId: item.product_id,
          name: item.product_name,
          cost: parseFloat(item.unit_cost),
          quantity: item.quantity,
          attributes: item.attributes,
          subtotal: parseFloat(item.subtotal)
        }))
      };
    },

    create: async ({ cartId, shippingVariantId, taxId }: { cartId: string, shippingVariantId: number, taxId: number }) => {

      let data = await this.guard<{ orderId: number }>({
        request: this.http.post<{ orderId: number }>(
          this.toResourceUrl({ resource: '/orders' }),
          toFormData({
            cart_id: cartId,
            shipping_id: shippingVariantId,
            tax_id: taxId
          })
        ),
        schema: schemas.orders.create
      });

      return data.orderId;
    },

    getCurrentUserOrders: async () => {

      let data = await this.guard<TuringOrder[]>({
        request: this.http.get<TuringOrder[]>(this.toResourceUrl({ resource: '/orders/inCustomer' })),
        schema: schemas.orders.byCustomer
      });

      let orders: Order[] = data.map<Order>((order: TuringOrder) => {

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

      return {
        count: orders.length,
        items: orders
      };
    },

  };

  users: UsersEndpointGateway = {

    get: async () => {

      let data = await this.guard<TuringUser>({
        request: this.http.get<TuringUser>(this.toResourceUrl({ resource: `/customer` })),
        schema: schemas.customers.get
      });

      let result: UserModel = {
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

    updatePersonalData: async (options: UserPersonalData & { password: string }) => {

      await this.guard<void>({
        request: this.http.put<void>(
          this.toResourceUrl({ resource: `/customer` }),
          toFormData({
            name: options.name,
            email: options.email,
            password: options,
            day_phone: options.phone.day,
            eve_phone: options.phone.evening,
            mob_phone: options.phone.mobile
          })
        )
      });
    },

    updateShipping: async (options: UserAddress) => {

      await this.guard<void>({
        request:  this.http.put<void>(
          this.toResourceUrl({ resource: `/customers/address` }),
          toFormData({
            address_1: options.address1,
            address_2: options.address2,
            city: options.city,
            region: options.region,
            postal_code: options.postalCode,
            country: options.country,
            shipping_region_id: options.shippingRegionId
          })
        )
      });
    },

    create: async (options: { name: string, email: string, password: string }) => {

      await this.guard<void>({
        request:  this.http.post<void>(
          this.toResourceUrl({ resource: `/customers` }),
          toFormData(options)
        ),
        schema: schemas.customers.create
      });
    }
  };

  auth: AuthenticationEndpointGateway = {

    login: async ({ email, password }: { email: string, password: string }) => {

      let data = await this.guard<TuringAuthenticationCredentials>({
          request:  this.http.post<TuringAuthenticationCredentials>(
            this.toResourceUrl({ resource: `/customers/login` }),
            toFormData({
              email, password
            })
          ),
          schema: schemas.customers.login
        });

      return data.accessToken;
    },

  };

  shipping: ShippingEndpointGateway = {

    getAreas: async () => {

      let data: TuringShippingRegion[] = await this.guard<TuringShippingRegion[]>({
        request: this.http.get<TuringShippingRegion[]>(this.toResourceUrl({ resource: `/shipping/regions` })),
        schema: schemas.shipping.regions.all
      });

      let areas = data.map<ShippingArea>((value: TuringShippingRegion) => {
        return {
          id: value.shipping_region_id,
          name: value.shipping_region
        };
      });

      return {
        count: areas.length,
        items: areas
      };
    },

    getVariantsByArea: async ({ areaId }: { areaId: number }) => {

      let data: TuringShippingVariant[] = await this.guard<TuringShippingVariant[]>({
        request:  this.http.get<TuringShippingVariant[]>(this.toResourceUrl({ resource: `/shipping/regions/${areaId}` })),
        schema: schemas.shipping.regions.concrete
      });

      let variants = data.map<ShippingVariant>((value: TuringShippingVariant) => {
        return {
          id: value.shipping_id,
          name: value.shipping_type,
          cost: parseFloat(value.shipping_cost)
        };
      });

      return {
        count: variants.length,
        items: variants
      };
    }

  };

  taxes: TaxesEndpointGateway = {
    getTaxes: async () => {

      let data = await this.guard<TuringTax[]>({
        request: this.http.get<TuringTax[]>(this.toResourceUrl({ resource: `/tax` })),
        schema: schemas.tax.get
      });

      let taxes = data.map<Tax>((tax: TuringTax) => ({
        id: tax.tax_id,
        name: tax.tax_type,
        percent: parseFloat(tax.tax_percentage)
      }));

      return {
        count: taxes.length,
        items: taxes
      };
    }

  };

  cart: CartEndpointGateway = {
    addItem: ({ cartId, productId, attributes }: { cartId: string, productId: number, attributes: string }) => {
      return this.guard<void>({
        request: this.http.post<void>(
          this.toResourceUrl({ resource: '/shoppingcart/add' }),
          toFormData({
            cart_id: cartId,
            product_id: productId,
            attributes: attributes
          })
        )
      });
    },
    updateItem: ({ itemId, quantity }: { cartId: string, itemId: number, quantity: number }) => {
      return this.guard<void>({
        request: this.http.put<void>(
          this.toResourceUrl({ resource: `/shoppingcart/update/${itemId}` }),
          toFormData({
            quantity: quantity
          })
        )
      });
    },
    removeItem: ({ itemId }: { cartId: string, itemId: number }) => {
      return this.guard<void>({
        request: this.http.delete<void>(this.toResourceUrl({ resource: `/shoppingcart/removeProduct/${itemId}` }))
      });
    },
    register: async () => {
      return (await this.guard<TuringCartId>({
        request: this.http.get<TuringCartId>(this.toResourceUrl({ resource: '/shoppingcart/generateUniqueId' })),
        schema: schemas.shoppingcart.generateUniqueId.get
      })).cart_id;
    },
    getItems: async (options: { cartId: string }) => {

      let items = await this.guard<TuringCartItem[]>({
        request:  this.http.get<TuringCartItem[]>(this.toResourceUrl({ resource: `/shoppingcart/${options.cartId}` })),
        schema: schemas.shoppingcart.items.get
      });

      return items.map<CartItem>((item: TuringCartItem) => ({
        itemId: item.item_id,
        name: item.name,
        attributes: item.attributes,
        productId: item.product_id,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        subtotal: item.subtotal
      }));

    }
  };

  products: ProductsEndpointGateway = {

    createProductReview: (options: { productId: number, review: string, rating: number }) => {
      return this.guard<void>({
        request:  this.http.post<void>(
          this.toResourceUrl({ resource: `/products/${options.productId}/reviews` }),
          toFormData({
            review: options.review,
            rating: options.rating
          })
        )
      });
    },

    getProductReviews: async ({ productId }: { productId: number }) => {

      let response = await this.guard<TuringReview[]>({
        request:  this.http.get<TuringReview[]>(this.toResourceUrl({ resource: `/products/${productId}/reviews` })),
        schema: schemas.products.reviews.list
      });

      let reviews = response.map<Review>((review: TuringReview) => ({
        name: review.name,
        review: review.review,
        rating: review.rating > 5 ? 5 : review.rating,
        created: new Date(review.created_on)
      }));

      return {
        count: reviews.length,
        items: reviews
      };
    },

    getProductAttributes: async ({ productId }: { productId: number }) => {

      let result = await this.guard<TuringProductAttribute[]>({
        request:  this.http.get<TuringProductAttribute[]>(this.toResourceUrl({ resource: `/attributes/inProduct/${productId}` })),
        schema: schemas.attributes.product
      });

      let attributes: ProductAttribute[] = [];
      let memo = {};

      result.forEach((attribute: TuringProductAttribute) => {

        if (!memo[attribute.attribute_name]) {
          memo[attribute.attribute_name] = {
            name: attribute.attribute_name,
            values: []
          };
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

    getProduct: async ({ productId }: { productId: number }) => {

      let response = await this.guard<TuringProductDetails[]>({
        request:  this.http.get<TuringProductDetails[]>(this.toResourceUrl({ resource: `/products/${productId}/details` })),
        schema: schemas.products.single
      });

      // @todo: Fix this, now Turing unexpectedly returns array with the only element
      let product: TuringProductDetails = response[0];

      return {
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discounted_price || 0,
        images: [
          product.image,
          product.image_2
        ]
      };
    },

    getProductsByDepartment: async (options: { departmentId: number } & PaginationFilter) => {

      let data = await this.guard<TuringListResponse<TuringProduct>>({
        request: this.http.get<TuringListResponse<TuringProduct>>(
          this.toResourceUrl({ resource: `/products/inDepartment/${options.departmentId}` }), {
          params: _.mapValues({
            page: options.page,
            limit: options.limit
          }, (value) => value + '')
        }),
        schema: schemas.products.list
      });

      let products = data.rows.map<Product>((product: TuringProduct) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discounted_price || 0,
        images: [
          product.thumbnail
        ]
      }));

      return {
        count: data.count,
        items: products
      };
    },
    getProductsByCategory: async (options: { categoryId: number } & PaginationFilter) => {

      let data = await this.guard<TuringListResponse<TuringProduct>>({
        request: this.http.get<TuringListResponse<TuringProduct>>(
          this.toResourceUrl({ resource: `/products/inCategory/${options.categoryId}` }), {
          params: _.mapValues({
            page: options.page,
            limit: options.limit
          }, (value) => value + '')
        }),
        schema: schemas.products.list
      });

      let products = data.rows.map<Product>((product: TuringProduct) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discounted_price || 0,
        images: [
          product.thumbnail
        ]
      }));

      return {
        count: data.count,
        items: products
      };
    },
    getProducts: async (options: PaginationFilter) => {

      let data = await this.guard<TuringListResponse<TuringProduct>>({
        request: this.http.get<TuringListResponse<TuringProduct>>(
          this.toResourceUrl({ resource: '/products' }), {
          params: _.mapValues(options, (value) => value + '')
        }),
        schema: schemas.products.list
      });

      let products = data.rows.map<Product>((product: TuringProduct) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discounted_price || 0,
        images: [
          product.thumbnail
        ]
      }));

      return {
        count: data.count,
        items: products
      };
    },
    search: async (options: { query: string } & PaginationFilter) => {

      let data = await this.guard<TuringListResponse<TuringProduct>>({
        request: this.http.get<TuringListResponse<TuringProduct>>(
          this.toResourceUrl({ resource: '/products/search' }), {
          params: _.mapValues({
            query_string: options.query,
            page: options.page,
            limit: options.limit,
            all_words: 'off'
          }, (value) => value + '')
        }),
        schema: schemas.products.list
      });

      let products = data.rows.map<Product>((product: TuringProduct) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discounted_price || 0,
        images: [
          product.thumbnail
        ]
      }));

      return {
        count: data.count,
        items: products
      };
    }
  };

  departments: DepartmentsEndpointGateway = {
    getDepartment: async ({ departmentId }: { departmentId: number }) => {

      let data = await this.guard<TuringDepartment>({
        request: this.http.get<TuringDepartment>(this.toResourceUrl({ resource: `/departments/${departmentId}` })),
        schema: schemas.departments.get
      });

      return {
        id: data.department_id,
        name: data.name,
        description: data.description
      };
    },
    getDepartments: async () => {

      let data = await this.guard<TuringDepartment[]>({
        request: this.http.get<TuringDepartment[]>(this.toResourceUrl({ resource: '/departments' })),
        schema: schemas.departments.all
      });

      let departments: Department[] = data.map<Department>((department: TuringDepartment) => ({
        id: department.department_id,
        name: department.name,
        description: department.description
      }));

      return {
        count: departments.length,
        items: departments
      };
    }
  };

  categories: CategoriesEndpointGateway = {

    getDepartmentCategories: async ({ departmentId }: { departmentId: number }) => {

      let data = await this.guard<TuringCategory[]>({
        request: this.http.get<TuringCategory[]>(this.toResourceUrl({ resource: `/categories/inDepartment/${departmentId}` })),
        schema: schemas.categories.byDepartment.get
      });

      let categories = data.map<Category>((category: TuringCategory) => ({
        id: category.category_id,
        name: category.name,
        description: category.description,
        departmentId: category.department_id
      }));

      return {
        count: categories.length,
        items: categories
      };
    },

    getCategory: async ({ categoryId }: { categoryId: number }) => {

      let data = await this.guard<TuringCategory>({
        request: this.http.get<TuringCategory>(this.toResourceUrl({ resource: `/categories/${categoryId}` })),
        schema: schemas.categories.get
      });

      return {
        id: data.category_id,
        name: data.name,
        description: data.description,
        departmentId: data.department_id
      };
    },
  };

  private toResourceUrl({ endpoint = api.endpoint, resource }: { endpoint?: string, resource: string }) {

    let url: URL;

    try {
      url = new URL(endpoint);
    } catch {
      throw new TypeError(`Method received incorrect endpoint url "${endpoint}"`);
    }

    url.pathname = resource;

    return url.toString();
  }

  // Validation of the remote call responses based on provided JSON schema
  private async guard<T>({ request, schema = null }: { request: Observable<T>, schema?: object }): Promise<T> {
    return await new Promise<T> ((resolve, reject) => {

      let validate: ValidateFunction = () => true;

      if (schema !== null) {
        try {
          validate = schemasConverter.compile(schema);
        } catch (error) {
          reject(new TypeError(`Schema validation errors: ${JSON.stringify(schemasConverter.errors)} and error is "${error.message}"`));
          return;
        }
      }

      request.subscribe(
        response => {

          let message =
            `Response has an invalid format,
              expected schema ${JSON.stringify(schema)},
              but got value "${JSON.stringify(response)}"`;

          if (!validate(response)) {
            reject(new TypeError(message));
            return;
          }

          resolve(response);

        },
        error => reject(error)
      );

    });
  }

}
