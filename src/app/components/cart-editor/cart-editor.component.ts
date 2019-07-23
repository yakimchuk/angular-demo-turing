import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TuringCartItem, TuringTax } from '@app/services/schemas.turing';
import { CartService, CartItem, Cart } from '@app/services/cart';
import { MessagesService, UserMessages } from '@app/services/messages';

@Component({
  selector: 'app-cart-editor',
  templateUrl: './cart-editor.component.html',
  styleUrls: ['./cart-editor.component.scss']
})
export class CartEditorComponent implements OnInit {

  public cart: CartService;

  // Message in case of item update success
  @ViewChild('toast_item_quantity_update_success', { static: true }) itemQuantityUpdateSuccessTemplate: TemplateRef<any>;

  // Message in case of item update error
  @ViewChild('toast_item_quantity_update_error', { static: true }) itemQuantityUpdateErrorTemplate: TemplateRef<any>;

  // Message in case of item removal success
  @ViewChild('toast_item_removal_success', { static: true }) itemRemovalSuccessTemplate: TemplateRef<any>;

  // Message in case of item removal error
  @ViewChild('toast_item_removal_error', { static: true }) itemRemovalErrorTemplate: TemplateRef<any>;

  private element: HTMLElement;
  private messages: MessagesService;

  constructor(
    element: ElementRef,
    messages: UserMessages,
    cart: Cart
  ) {
    this.element = element.nativeElement;
    this.messages = messages;
    this.cart = cart;
  }

  // @todo: Find a way to extend Angular Component. For now there are magical things happen
  private getFieldSets() {
    return [].slice.call(this.element.querySelectorAll('fieldset'));
  }

  private toggleFormLockState(isLocked: boolean) {
    this.getFieldSets().forEach((fieldset: HTMLFieldSetElement) => fieldset.disabled = isLocked);
  }

  public async updateItemQuantity(item: CartItem, quantity: string) {

    try {
      this.toggleFormLockState(true);
    } catch {
      // Even if form cannot be locked, it cannot be a reason for blocking whole updating process, otherwise it will be critical issue
      // In this case just do nothing, better if quantity will be updated without locked form, than will not updated at all
    }

    try {

      await this.cart.updateItem({
        ...item,
        quantity: parseInt(quantity)
      });

    } catch {

      // Fail of this method will not affect anything, exception handling is not required
      this.messages.openFromTemplate(this.itemQuantityUpdateErrorTemplate);
      return;

    } finally {

      try {
        this.toggleFormLockState(false);
      } catch {
        // See explanation above...
      }

    }

    // Fail of this method will not affect anything, exception handling is not required
    this.messages.openFromTemplate(this.itemQuantityUpdateSuccessTemplate);
  }

  public async removeItem(item: CartItem) {

    try {
      this.toggleFormLockState(true);
    } catch {
      // Even if form cannot be locked, it cannot be a reason for blocking whole removal process, otherwise it will be critical issue
      // In this case just do nothing, better if quantity will be updated without locked form, than will not updated at all
    }

    try {
      await this.cart.removeItem(item);
    } catch {

      // Fail of this method will not affect anything, exception handling is not required
      this.messages.openFromTemplate(this.itemRemovalSuccessTemplate);
      return;

    } finally {

      try {
        this.toggleFormLockState(false);
      } catch {
        // See explanation above...
      }

    }

    this.messages.openFromTemplate(this.itemRemovalSuccessTemplate);
  }

  ngOnInit() {
  }

}
