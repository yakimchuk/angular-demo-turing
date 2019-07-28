import { Injectable } from '@angular/core';
import { UserStorage } from './storage';
import { StorageService } from './storage';
import { TuringCartId } from '@app/services/schemas.turing';
import { Endpoint } from '@app/services/endpoint';
import { IEvent, ServiceState } from '@app/types/common';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { MessagesService, UserMessages } from '@app/services/messages';
import { InternalErrorComponent } from '@app/toasts/internal-error/internal-error.component';

export interface CartItem {
  itemId: number;
  name: string;
  attributes: string;
  productId: number;
  price: string;
  quantity: number;
  image: string;
  subtotal: string;
}

export interface CartService extends Subject<IEvent> {

  state: ServiceState;
  items: CartItem[];
  total: number;

  reload(): Promise<any>;

  clear(): Promise<any>;
  addItem(options: { productId: number, attributes: string }): Promise<any>;
  updateItem(item: CartItem): Promise<any>;
  removeItem(item: CartItem): Promise<any>;
  hasItem(options: { productId: number }): boolean;

}

const CART_STORAGE_PREFIX = 'cart';
const CART_IDENTIFIER_KEY_NAME = 'key';

const DEFAULT_CART_STATE: ServiceState = {
  ready: false,
  error: false
};

// Remote controlled cart
// Everything stored in this cart are duplicated on the server
// All content is remote
@Injectable()
export class Cart extends Subject<IEvent> implements CartService {

  // It can be remote or local, depends on business requirements
  private id: string;

  public state: ServiceState = DEFAULT_CART_STATE;

  // CartService contents
  public items: CartItem[] = [];

  // Total amount of the items in the cart
  public total: number;

  private resources: Endpoint;
  private messages: MessagesService;
  private storage: StorageService<string, string>;

  constructor(
    resources: Endpoint,
    storage: UserStorage,
    messages: UserMessages) {

    super();

    this.resources = resources;
    this.storage = storage;
    this.messages = messages;

    // Asynchronous process, app must can handle any state of any data
    this.reload();
  }

  public async clear() {

    // Exceptions must be caught outside
    await this.resources.cart.clear({ cartId: this.id });

    try {
      await this.reload();
    } catch {
      this.messages.openFromComponent(InternalErrorComponent);
    }
  }

  public async addItem(item: CartItem) {

    // Exceptions must be caught outside
    await this.resources.cart.addItem({ cartId: this.id, ...item });

    try {
      await this.reload();
    } catch {
      this.messages.openFromComponent(InternalErrorComponent);
    }
  }

  public async updateItem(item: CartItem) {
    // Exceptions must be caught outside
    await this.resources.cart.updateItem({ cartId: this.id, ...item });

    try {
      await this.reload();
    } catch {
      this.messages.openFromComponent(InternalErrorComponent);
    }
  }

  public async removeItem(item: CartItem) {
    // Exceptions must be caught outside
    await this.resources.cart.removeItem({ cartId: this.id, ...item });

    try {
      await this.reload();
    } catch {
      this.messages.openFromComponent(InternalErrorComponent);
    }
  }

  public hasItem(productId) {
    // Exceptions must be caught outside
    return this.items.some((item: CartItem) => item.productId === productId);
  }

  private async reloadItems() {
    // Exceptions must be caught outside
    this.items = await this.getItems();
  }

  private reloadTotal() {
    // Exceptions must be caught outside
    this.total = this.items.reduce((total: number, item: CartItem) => total + parseFloat(item.subtotal), 0);
  }

  public async getItems(): Promise<CartItem[]> {
    // Exceptions must be caught outside
    return await this.resources.cart.getItems({ cartId: this.id });
  }

  private isRegistered() {
    return _.isString(this.id);
  }

  public async reload() {

    delete this.state.error;
    delete this.state.ready;

    try {

      if (!this.isRegistered()) {
        // Exceptions cannot be handled, cart cannot work w/o registration
        await this.register();
      }

      // Exceptions cannot be handled, cart without items is not usable
      await this.reloadItems();

      // Exceptions cannot be handled, cart without total amount is not representable (wrong total price calculations and so on)
      await this.reloadTotal();

    } catch {
      // In case of error, globally show errors with the cart
      this.state.error = true;
    } finally {
      this.state.ready = true;
    }

  }

  public async register() {

    let idKey = `${CART_STORAGE_PREFIX}.${CART_IDENTIFIER_KEY_NAME}`;

    try {
      if (this.storage.has(idKey)) {
          this.id = this.storage.get(idKey);
      }
    } catch {
      // Just do nothing... If this error will prevent cart registration (we still can obtain a new ID) and user will not be having a
      // working cart, then it will be blocker issue, but with such handling it will be just a critical or major issue
    }

    if (!this.isRegistered()) {
      // Exceptions must be caught outside, there is no way to make this ID w/o a server
      this.id = await this.resources.cart.register();
    }

    if (this.isRegistered()) {
      try {
        this.storage.set(idKey, this.id);
      } catch {
        // Just do nothing... If this error will fail external more important cases, then it will be a critical issue instead of major issue
      }
    }

  }

}
