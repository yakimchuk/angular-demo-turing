import { Component, Input, OnInit } from '@angular/core';
import { CartService, Cart } from '@app/services/cart';
import { TaxesService, Taxes, Tax } from '@app/services/taxes';
import { fade, slideTop } from '@app/utilities/transitions';
import { TuringTax } from '@app/services/schemas.turing';
import { ShippingSelection } from '@app/components/shipping-selector/shipping-selector.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-subtotal',
  templateUrl: './order-subtotal.component.html',
  styleUrls: ['./order-subtotal.component.scss'],
  animations: [fade, slideTop]
})
export class OrderSubtotalComponent implements OnInit {

  public cart: CartService;
  public taxes: TaxesService;

  @Input() shipping: ShippingSelection;
  @Input() tax: Tax;

  constructor(cart: Cart, taxes: Taxes) {
    this.cart = cart;
    this.taxes = taxes;
  }

  public getSubtotal() {

    if (!_.isNumber(this.cart.total)) {
      return;
    }

    let price = 0;

    price += this.cart.total;

    if (this.tax) {
      price += price * this.tax.percent / 100;
    }

    if (this.shipping) {
      price += this.shipping.variant.cost;
    }

    return price;
  }

  public async reload() {
    await this.taxes.reload();
  }

  ngOnInit() { }

}
