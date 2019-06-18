import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({name: 'money'})
export class MoneyPipe implements PipeTransform {

  currency: CurrencyPipe;

  constructor(currency: CurrencyPipe) {
    this.currency = currency;
  }

  transform(value: number): string {
    return this.currency.transform(value, 'EUR', 'symbol');
  }
}
