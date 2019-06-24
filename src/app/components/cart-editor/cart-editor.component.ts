import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICartItem, ITax } from '@app/services/schemas';
import { ICart, RemoteCart } from '@app/services/cart';
import { IMessages, UserMessages } from '@app/services/messages';

@Component({
  selector: 'app-cart-editor',
  templateUrl: './cart-editor.component.html',
  styleUrls: ['./cart-editor.component.scss']
})
export class CartEditorComponent implements OnInit {

  public cart: ICart;

  @ViewChild('toast_item_quantity_update_success', { static: true }) itemQuantityUpdateSuccessTemplate: TemplateRef<any>;
  @ViewChild('toast_item_quantity_update_error', { static: true }) itemQuantityUpdateErrorTemplate: TemplateRef<any>;

  @ViewChild('toast_item_removal_success', { static: true }) itemRemovalSuccessTemplate: TemplateRef<any>;
  @ViewChild('toast_item_removal_error', { static: true }) itemRemovalErrorTemplate: TemplateRef<any>;

  private element: HTMLElement;
  private messages: IMessages;

  constructor(element: ElementRef, messages: UserMessages, cart: RemoteCart) {
    this.element = element.nativeElement;
    this.messages = messages;
    this.cart = cart;
  }

  // @todo: Find a way to extend Angular Component. For now there are magical things happens
  private getFieldSets() {
    return [].slice.call(this.element.querySelectorAll('fieldset'));
  }

  private toggleFormLockState(isLocked: boolean) {
    this.getFieldSets().forEach((fieldset: HTMLFieldSetElement) => fieldset.disabled = isLocked);
  }

  public async updateItemQuantity(item: ICartItem, quantity: string) {

    this.toggleFormLockState(true);

    try {

      await this.cart.updateItem({
        ...item,
        quantity: parseInt(quantity)
      });

      this.messages.openFromTemplate(this.itemQuantityUpdateSuccessTemplate);

    } catch {
      this.messages.openFromTemplate(this.itemQuantityUpdateErrorTemplate);
    }

    this.toggleFormLockState(false);
  }

  public async removeItem(item: ICartItem) {

    this.toggleFormLockState(true);

    try {

      await this.cart.removeItem(item);
      this.messages.openFromTemplate(this.itemRemovalSuccessTemplate);

    } catch {
      this.messages.openFromTemplate(this.itemRemovalSuccessTemplate);
    } finally {
      this.toggleFormLockState(false);
    }
  }

  ngOnInit() {
  }

}
