import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { IProductDetails } from '@app/services/schemas';
import { ProductAttribute } from '@app/services/products';
import { slideTop } from '@app/utilities/transitions';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { IRemoteData, Resources } from '@app/services/resources';
import { Form } from '@angular/forms';
import { IMessages, UserMessages } from '@app/services/messages';
import { ICart, RemoteCart } from '@app/services/cart';

interface AttributesModel {
  [key:string]: string
};

@Component({
  selector: 'app-product-purchase-form',
  templateUrl: './product-purchase-form.component.html',
  styleUrls: ['./product-purchase-form.component.scss'],
  animations: [slideTop]
})
export class ProductPurchaseFormComponent implements OnInit, OnChanges {

  @Input('product') public product: IProductDetails;

  public attributes: ProductAttribute[];
  public error: boolean;
  public progress: boolean;

  public model: AttributesModel = {};

  @Output('onPurchase') public onPurchase: EventEmitter<void> = new EventEmitter();

  @ViewChild('toast_add_success', { static: true }) addSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('toast_add_error', { static: true }) addErrorToastTemplate: TemplateRef<any>;

  private resources: IRemoteData;
  private messages: IMessages;
  private cart: ICart;

  constructor(resources: Resources, messages: UserMessages, cart: RemoteCart) {
    this.resources = resources;
    this.messages = messages;
    this.cart = cart;
  }

  private async reload() {

    delete this.error;

    try {
      this.attributes = await this.resources.products.getProductAttributes(this.product.product_id);
    } catch {
      this.error = true;
    }

  }

  public isValidForm() {
    return this.attributes && Object.keys(this.model).length === this.attributes.length;
  }

  public async add(model: AttributesModel) {

    this.progress = true;

    let result;

    let attributes = Object.keys(model).map(attributeName => `${attributeName}: ${model[attributeName]}`);

    try {
      await this.cart.addItem(this.product.product_id, attributes.join(', '));
      result = true;
    } catch (error) {
      result = false;
    } finally {
      this.progress = false;
    }

    if (result) {
      this.onPurchase.emit();
    }

    this.messages.openFromTemplate(result ? this.addSuccessToastTemplate : this.addErrorToastTemplate);

  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.product || !changes.product.currentValue) {
      return;
    }

    this.reload();
  }

  ngOnInit() {
  }

}
