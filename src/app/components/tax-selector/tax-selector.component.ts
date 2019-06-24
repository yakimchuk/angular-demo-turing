import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewRef } from '@angular/core';
import { ITax } from '@app/services/schemas';
import { ITaxes, Taxes } from '@app/services/taxes';
import { slideTop } from '@app/utilities/transitions';
import { IStorage, UserStorage } from '@app/services/storage';
import * as _ from 'lodash';
import { ServiceEvents } from '@app/types/common';

@Component({
  selector: 'app-tax-selector',
  templateUrl: './tax-selector.component.html',
  styleUrls: ['./tax-selector.component.scss'],
  animations: [slideTop]
})
export class TaxSelectorComponent implements OnInit {

  public taxes: ITaxes;

  private store: IStorage<string,number>;

  @Input('value') tax: ITax;
  @Output('valueChange') taxChange = new EventEmitter<ITax>();

  constructor(taxes: Taxes, store: UserStorage) {
    this.taxes = taxes;
    this.store = store;
  }

  public onTaxSelection(tax: ITax) {
    this.tax = tax;
    this.taxChange.emit(tax);
    this.store.set(`${this.constructor.name}.tax.id`, this.tax.tax_id);
  }

  public async reload() {
    await this.taxes.reload();
  }

  private loadLocalValue() {

    let taxId: number;

    try {
      taxId = this.store.get(`${this.constructor.name}.tax.id`);
    } catch {}

    if (!_.isNumber(taxId)) {
      return;
    }

    let tax: ITax = this.taxes.list.find((tax: ITax) => tax.tax_id == taxId);

    if (!tax) {
      return;
    }

    this.onTaxSelection(tax);
  }

  ngOnInit() {

    this.taxes.subscribe(event => {

      if (event.name !== ServiceEvents.Update) {
        return;
      }

      if (this.tax) {
        return;
      }

      this.loadLocalValue();

    });

  }

}
