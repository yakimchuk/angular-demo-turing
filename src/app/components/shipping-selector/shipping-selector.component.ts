import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ShippingService, ShippingArea, ShippingVariant, Shipping } from '@app/services/shipping';
import { slideTop } from '@app/utilities/transitions';
import * as _ from 'lodash';
import { UserService, User } from '@app/services/user';

export interface ShippingSelection {
  area: ShippingArea;
  variant: ShippingVariant;
}

@Component({
  selector: 'app-shipping-selector',
  templateUrl: './shipping-selector.component.html',
  styleUrls: ['./shipping-selector.component.scss'],
  animations: [slideTop]
})
export class ShippingSelectorComponent implements OnInit, OnChanges {

  public shipping: ShippingService;
  public variants: ShippingVariant[];
  public variant: ShippingVariant;
  public error: boolean;

  @Input() public area: ShippingArea;
  @Output() public areaChange = new EventEmitter<ShippingArea>();

  @Input('value') selection: ShippingSelection;
  @Output('valueChange') selectionChange = new EventEmitter<ShippingSelection>();

  private user: UserService;

  constructor(
    shipping: Shipping,
    user: User
  ) {
    this.shipping = shipping;
    this.user = user;
  }

  public async reloadVariants(options: { areaId: number }) {

    this.error = false;

    try {
      this.variants = await this.shipping.getVariantsByArea(options);
    } catch {
      this.error = true;
    }
  }

  public onVariantSelection(options: { area: ShippingArea, variant: ShippingVariant }) {
    this.selection = options;
    this.selectionChange.emit(this.selection);
  }

  public reload() {
    this.shipping.reload();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.area && this.area) {
      this.reloadVariants({ areaId: this.area.id });
    }
  }

  private reloadUserArea() {

    if (!this.user.model) {
      return;
    }

    if (!_.isNumber(this.user.model.shippingRegionId)) {
      return;
    }

    let area = this.shipping.areas.find((item: ShippingArea) => item.id === this.user.model.shippingRegionId);

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

      this.reloadVariants({ areaId: this.area.id });
    });
  }

}
