import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Primitive } from '@app/types/common';

export interface IStorage <T, U> {

  get(key: T): U extends Promise<infer C> ? C : U;
  set(key: T, value: U): U extends Promise<infer C> ? C : void;
  has(key: T): boolean extends Promise<infer C> ? C : boolean;
  remove(key: T): void extends Promise<infer C> ? C : void;

}

@Injectable()
export class UserStorage implements IStorage<string, Primitive> {

  get<T extends Primitive>(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key)) as T;
    } catch {
      this.remove(key);
      throw new TypeError(`Cannot retrieve value for key "${key}"`)
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  set(key: string, value: Primitive) {

    if (_.isNumber(value) && isNaN(value as number)) {
      throw new TypeError(`Value cannot be NaN`);
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  has(key: string) {
    return _.isString(localStorage.getItem(key));
  }

}
