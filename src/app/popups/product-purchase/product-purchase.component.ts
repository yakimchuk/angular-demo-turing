import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser, User } from '@app/services/user';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { IUsers, Users } from '@app/services/users';
import { IMessages, UserMessages } from '@app/services/messages';
import { Auth, IAuth } from '@app/services/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IProduct } from '@app/services/schemas';

class DialogData {
  product: IProduct
}

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss'],
  animations: [slideTop, slideRight]
})
export class ProductPurchasePopupComponent implements OnInit {

  public product: IProduct;
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
