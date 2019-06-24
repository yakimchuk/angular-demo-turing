import { Component, Input, OnInit } from '@angular/core';
import { ICart, RemoteCart } from '@app/services/cart';
import { ITaxes, Taxes } from '@app/services/taxes';
import { fade, slideTop } from '@app/utilities/transitions';
import { IShippingVariant } from '@app/services/shipping';
import { ITax } from '@app/services/schemas';
import { IShippingSelection } from '@app/components/shipping-selector/shipping-selector.component';

@Component({
  selector: 'app-order-subtotal',
  templateUrl: './order-subtotal.component.html',
  styleUrls: ['./order-subtotal.component.scss'],
  animations: [fade, slideTop]
})
export class OrderSubtotalComponent implements OnInit {

  public cart: ICart;
  public taxes: ITaxes;

  @Input('shipping') shipping: IShippingSelection;
  @Input('tax') tax: ITax;

  constructor(cart: RemoteCart, taxes: Taxes) {
    this.cart = cart;
    this.taxes = taxes;
  }

  public getSubtotal() {

    let price = 0;

    price += this.cart.total;

    if (this.tax) {
      price += price * parseFloat(this.tax.tax_percentage) / 100;
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
