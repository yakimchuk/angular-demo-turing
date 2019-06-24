import { Component, OnInit } from '@angular/core';
import { ICart, RemoteCart } from '@app/services/cart';
import { slideRight } from '@app/utilities/transitions';

@Component({
  selector: 'app-cart-button-menu',
  templateUrl: './cart-button-menu.component.html',
  styleUrls: ['./cart-button-menu.component.scss'],
  animations: [slideRight]
})
export class CartButtonMenuComponent implements OnInit {

  public cart: ICart;

  constructor(cart: RemoteCart) {
    this.cart = cart;
  }

  public async reload() {
    await this.cart.reload();
  }

  async ngOnInit() { }

}
