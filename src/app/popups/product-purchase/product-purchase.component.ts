import { Component, Inject, OnInit } from '@angular/core';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from '@app/services/products';

class DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss'],
  animations: [slideTop, slideRight]
})
export class ProductPurchasePopupComponent implements OnInit {

  public product: Product;
  private dialog: MatDialogRef<ProductPurchasePopupComponent>;

  constructor(dialog: MatDialogRef<ProductPurchasePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dialog = dialog;

    if (!data || !data.product) {
      return;
    }

    this.product = data.product;
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit() {

  }

}
