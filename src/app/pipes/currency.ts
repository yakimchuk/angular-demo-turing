import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { environment } from '@app/config';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  private formatter:
    Intl.NumberFormat = new Intl.NumberFormat(environment.locale, {
      style: 'currency', currency: environment.currency
    });

  constructor() {}

  transform(value: number): string {
    return this.formatter.format(value);
  }
}
