import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Product, ProductAttribute } from '@app/services/products';
import { slideTop } from '@app/utilities/transitions';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { MessagesService, UserMessages } from '@app/services/messages';
import { CartService, Cart } from '@app/services/cart';

interface AttributesModel {
  [key: string]: string;
}

@Component({
  selector: 'app-product-purchase-form',
  templateUrl: './product-purchase-form.component.html',
  styleUrls: ['./product-purchase-form.component.scss'],
  animations: [slideTop]
})
export class ProductPurchaseFormComponent implements OnInit, OnChanges {

  @Input() public product: Product;

  public attributes: ProductAttribute[];
  public error: boolean;
  public progress: boolean;
  public model: AttributesModel = {};

  @Output() public onPurchase: EventEmitter<void> = new EventEmitter();

  @ViewChild('toast_add_success', { static: true }) addSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('toast_add_error', { static: true }) addErrorToastTemplate: TemplateRef<any>;

  private resources: EndpointGatewayService;
  private messages: MessagesService;
  private cart: CartService;

  constructor(
    resources: Endpoint,
    messages: UserMessages,
    cart: Cart
  ) {
    this.resources = resources;
    this.messages = messages;
    this.cart = cart;
  }

  private async reload() {

    delete this.error;

    try {
      this.attributes = await this.resources.products.getProductAttributes({ productId: this.product.id });
    } catch {
      this.error = true;
    }

  }

  public isValidForm() {
    return this.attributes && Object.keys(this.model).length === this.attributes.length;
  }

  public async add(model: AttributesModel) {

    this.progress = true;

    let attributes = Object.keys(model).map(attributeName => `${attributeName}: ${model[attributeName]}`);

    try {
      await this.cart.addItem({ productId: this.product.id, attributes: attributes.join(', ') });
    } catch (error) {

      this.messages.openFromTemplate(this.addErrorToastTemplate);
      return;

    } finally {
      this.progress = false;
    }

    this.onPurchase.emit();
    this.messages.openFromTemplate(this.addSuccessToastTemplate);

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
