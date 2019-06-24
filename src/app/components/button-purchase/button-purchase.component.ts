import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICart, RemoteCart } from '@app/services/cart';
import { ICartItem } from '@app/services/schemas';
import { fade, slideTop } from '@app/utilities/transitions';
import { filter } from 'rxjs/operators';
import { IMessages, UserMessages } from '@app/services/messages';

@Component({
  selector: 'app-button-purchase',
  templateUrl: './button-purchase.component.html',
  styleUrls: ['./button-purchase.component.scss'],
  animations: [slideTop, fade]
})
export class ButtonPurchaseComponent implements OnInit {

  @Input('price') price: number;
  @Input('discount') discount: number = 0;
  @Input('productId') productId: number;

  @ViewChild('toast_add_success', { static: true }) addSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('toast_add_error', { static: true }) addErrorToastTemplate: TemplateRef<any>;

  public cart: ICart;
  private messages: IMessages;

  constructor(cart: RemoteCart, messages: UserMessages) {
    this.cart = cart;
    this.messages = messages;
  }

  public async add() {

    let template: TemplateRef<any>;

    try {
      await this.cart.addItem(this.productId);
      template = this.addSuccessToastTemplate;
    } catch (error) {
      template = this.addErrorToastTemplate;
    }

    this.messages.openFromTemplate(template);

  }

  async ngOnInit() {
  }

}
