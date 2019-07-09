import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IShipping, IShippingArea, IShippingVariant, Shipping } from '@app/services/shipping';
import { slideTop } from '@app/utilities/transitions';
import * as _ from 'lodash';
import { IUser, User } from '@app/services/user';

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
export class ShippingSelectorComponent implements OnInit, OnChanges {

  public shipping: IShipping;
  public variants: IShippingVariant[];
  public variant: IShippingVariant;
  public error: boolean;

  @Input('area') public area: IShippingArea;
  @Output('areaChange') public areaChange = new EventEmitter<IShippingArea>();

  @Input('value') selection: IShippingSelection;
  @Output('valueChange') selectionChange = new EventEmitter<IShippingSelection>();

  private user: IUser;

  constructor(shipping: Shipping, user: User) {
    this.shipping = shipping;
    this.user = user;
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

  ngOnChanges(changes: SimpleChanges) {

    if (changes.area && this.area) {
      this.reloadVariants(this.area.id);
    }

  }

  private reloadUserArea() {

    if (!this.user.model) {
      return;
    }

    if (!_.isNumber(this.user.model.shippingRegionId)) {
      return;
    }

    let area = this.shipping.areas.find((area: IShippingArea) => area.id === this.user.model.shippingRegionId);

    if (!area) {
      return;
    }

    this.area = area;
  }

  ngOnInit() {

    this.user.subscribe(() => {

      if (this.area) {
        return;
      }

      this.reloadUserArea();

      if (!this.area) {
        return;
      }

      this.reloadVariants(this.area.id);
    });
  }

}
