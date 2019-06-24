import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IShipping, IShippingArea, IShippingVariant, Shipping } from '@app/services/shipping';
import { slideTop } from '@app/utilities/transitions';

export interface IShippingSelection {
  area: IShippingArea;
  variant: IShippingVariant;
}

@Component({
  selector: 'app-shipping-selector',
  templateUrl: './shipping-selector.component.html',
  styleUrls: ['./shipping-selector.component.scss'],
  animations: [slideTop]
})
export class ShippingSelectorComponent implements OnInit {

  public shipping: IShipping;
  public variants: IShippingVariant[];

  public area: IShippingArea;
  public variant: IShippingVariant;

  public error: boolean;

  @Input('value') selection: IShippingSelection;
  @Output('valueChange') selectionChange = new EventEmitter<IShippingSelection>();

  constructor(shipping: Shipping) {
    this.shipping = shipping;
  }

  public async reloadVariants(areaId: number) {

    this.error = false;

    try {
      this.variants = await this.shipping.getVariantsByArea(areaId);
    } catch {
      this.error = true;
    }

  }

  public onVariantSelection(area: IShippingArea, variant: IShippingVariant) {

    this.selection = {
      area: area,
      variant: variant
    };

    this.selectionChange.emit(this.selection);
  }

  public reload() {
    this.shipping.reload();
  }

  ngOnInit() {
  }

}
