import { Injectable, OnInit } from '@angular/core';
import { UserStorage } from './storage';
import { IStorage } from './storage';
import { ICartId, ICartItem } from '@app/services/schemas';
import { Resources } from '@app/services/resources';
import { IEvent, IServiceState } from '@app/types/common';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

export interface ICart extends Subject<IEvent> {

  state: IServiceState;
  reload(): Promise<any>;

  items: ICartItem[];
  total: number;

  addItem(productId: number, attributes?: string): Promise<any>;
  updateItem(item: ICartItem): Promise<any>;
  removeItem(item: ICartItem): Promise<any>;
  hasItem(productId: number): boolean;

}

const cartStorageKey = 'cart';
const cartIdPostfix = 'key';

const defaultState = {
  ready: false,
  error: false
};

@Injectable()
export class RemoteCart extends Subject<IEvent> implements ICart {

  private id: string;

  public state: IServiceState = defaultState;

  public items: ICartItem[] = [];
  public total: number;

  private resources: Resources;
  private storage: IStorage<string, string>;

  constructor(resources: Resources, storage: UserStorage) {

    super();

    this.resources = resources;
    this.storage = storage;

    this.reload();
  }

  public async addItem(productId: number, attributes: string = '') {
    await this.resources.cart.addItem(this.id, productId, attributes);
    await this.reload();
  }

  public async updateItem(item: ICartItem) {
    await this.resources.cart.updateItem(this.id, item.item_id, item.quantity);
    await this.reload();
  }

  public async removeItem(item: ICartItem) {
    await this.resources.cart.removeItem(this.id, item.item_id);
    await this.reload();
  }

  public hasItem(productId) {
    return this.items.some((item: ICartItem) => item.product_id == productId);
  }

  private async reloadItems() {
    this.items = await this.getItems();
  }

  private reloadTotal() {
    this.total = this.items.reduce((total: number, item: ICartItem) => total + parseFloat(item.subtotal), 0);
  }

  public async getItems(): Promise<ICartItem[]> {
    return await this.resources.cart.getItems(this.id);
  }

  private isRegistered() {
    return _.isString(this.id);
  }

  public async reload() {

    this.state = defaultState;

    try {

      if (!this.isRegistered()) {
        await this.register();
      }

      await this.reloadItems();
      await this.reloadTotal();

    } catch {
      this.state.error = true;
    } finally {
      this.state.ready = true;
    }

  }

  public async register() {

    // if (Math.random() > 0.2) {
    //   throw new Error();
    // }

    let idKey = `${cartStorageKey}.${cartIdPostfix}`;

    if (this.storage.has(idKey)) {
      try {
        this.id = this.storage.get(idKey);
      } catch { }
    }

    if (!this.isRegistered()) {
      this.id = (await this.resources.cart.register() as ICartId).cart_id;
      this.storage.set(idKey, this.id);
    }

  }

}
