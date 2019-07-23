import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '@app/services/cart';
import { slideRight } from '@app/utilities/transitions';

@Component({
  selector: 'app-cart-button-menu',
  templateUrl: './cart-button-menu.component.html',
  styleUrls: ['./cart-button-menu.component.scss'],
  animations: [slideRight]
})
export class CartButtonMenuComponent implements OnInit {

  public cart: CartService;

  constructor(cart: Cart) {
    this.cart = cart;
  }

  public async reload() {
    try {
      await this.cart.reload();
    } catch {
      // In this case better to show a message to user, but it is already visible, so we may do nothing (such exceptions are already
      // handled in the component interface)
    }
  }

  async ngOnInit() { }

}
