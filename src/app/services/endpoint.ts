// @todo: Replace with resource library if it will be available on NPM

import { Injectable } from '@angular/core';
import {
  AuthenticationToken,
} from './schemas.turing';
import { PaginationFilter } from '../components/products-navigator/products-navigator.component';
import { ShippingArea, ShippingVariant } from '@app/services/shipping';
import { UserAddress, UserModel, UserPersonalData } from '@app/services/user';
import { Order, OrderItem } from '@app/services/orders';
import { Product, ProductAttribute } from '@app/services/products';
import { Review } from '@app/services/reviews';
import { CartItem } from '@app/services/cart';
import { List } from '@app/types/common';
import { Department } from '@app/services/departments';
import { Category } from '@app/services/categories';
import { Tax } from '@app/services/taxes';
import { PaymentResult } from '@app/services/payment';
import { TuringEndpoint } from '@app/services/endpoint.turing';

// Methods to manipulate cart on the server
export interface CartEndpointGateway {

  // Retrieve all items in a cart
  getItems(options: { cartId: string }): Promise<CartItem[]>;

  // Add item in a cart
  addItem(options: { cartId: string, productId: number, attributes: string }): Promise<any>;

  // Update item in a cart
  updateItem(options: { cartId: string, itemId: number, quantity: number }): Promise<any>;

  // Delete item from a cart
  removeItem(options: { cartId: string, itemId: number }): Promise<any>;

  // Make new cart on the server
  register(): Promise<string>;
}

// Methods to manipulate products on the server
export interface ProductsEndpointGateway {

  // Retrieve product model
  getProduct(options: { productId: number }): Promise<Product>;

  // Retrieve product reviews
  getProductReviews(options: { productId: number }): Promise<List<Review>>;

  // Retrieve product attributes
  getProductAttributes(options: { productId: number }): Promise<ProductAttribute[]>;

  // Post review about the product
  createProductReview(options: { productId: number, review: string, rating: number }): Promise<any>;

  // Search for products
  search(options: { query: string } & PaginationFilter): Promise<List<Product>>;

  // Retrieve products (not like search, but paginate over the global products list w/o category and any other filter)
  getProducts(options: PaginationFilter): Promise<List<Product>>;

  // Retrieve products in the specified category
  getProductsByCategory(options: { categoryId: number } & PaginationFilter): Promise<List<Product>>;

  // Retrieve products in the specified department
  // @todo: Remote this method, department is a wrong schema, it must be just a category
  getProductsByDepartment(options: { departmentId: number } & PaginationFilter): Promise<List<Product>>;
}

export interface DepartmentsEndpointGateway {

  // Retrieve departments list
  getDepartments(): Promise<List<Department>>;

  // Retrieve department model
  getDepartment(options: { departmentId: number }): Promise<Department>;
}

export interface CategoriesEndpointGateway {

  // Retrieve department categories list
  getDepartmentCategories(options: { departmentId: number }): Promise<List<Category>>;

  // Retrieve department category
  getCategory(options: { categoryId: number }): Promise<Category>;
}

export interface TaxesEndpointGateway {

  // Retrieve available taxation variants
  getTaxes(): Promise<List<Tax>>;
}

// Methods to retrieve information about the shipping variants (areas, methods, prices)
export interface ShippingEndpointGateway {

  // Get shipping areas where bought items can be shipped
  getAreas(): Promise<List<ShippingArea>>;
  getVariantsByArea(options: { areaId: number }): Promise<List<ShippingVariant>>;
}

export interface UsersEndpointGateway {

  // UserService registration
  // This method will not authenticate and authorize user automatically
  create(options: { name: string, email: string, password: string }): Promise<any>;

  // Retrieve current user model
  // Private (requires user token in the header)
  get(): Promise<UserModel>;

  // Update user personal data
  // Private (requires user token in the header)
  updatePersonalData(options: UserPersonalData & { password: string }): Promise<any>;

  // Update user shipping data
  // Private (requires user token in the header)
  updateShipping(model: UserAddress): Promise<any>;
}

export interface AuthenticationEndpointGateway {
  login(options: { email: string, password: string }): Promise<AuthenticationToken>;
}

export interface OrdersEndpointsGateway {

  // Get user orders
  // Private (requires user token in the header)
  getCurrentUserOrders(): Promise<List<Order>>;

  // Get items of the order
  getOrderItems(options: { orderId: number }): Promise<List<OrderItem>>;

  // Create order
  // You must fill up the cart before
  create(options: { cartId: string, shippingVariantId: number, taxId: number }): Promise<number>;
}

export interface PaymentEndpointGateway {
  // Confirm payment on the server
  charge(options: { token: string, orderId: number, description: string, amount: number, currency: string }): Promise<PaymentResult>;
}

export interface EndpointGatewayService {
  cart: CartEndpointGateway;
  products: ProductsEndpointGateway;
  departments: DepartmentsEndpointGateway;
  categories: CategoriesEndpointGateway;
  taxes: TaxesEndpointGateway;
  shipping: ShippingEndpointGateway;
  users: UsersEndpointGateway;
  auth: AuthenticationEndpointGateway;
  orders: OrdersEndpointsGateway;
  payment: PaymentEndpointGateway;
}

// Additional dependency in order to avoid straight app dependency from a concrete endpoint
// Replace of the endpoint will result in extension from another class, all other system parts will be untouched and working properly
@Injectable()
export class Endpoint extends TuringEndpoint implements EndpointGatewayService { }
