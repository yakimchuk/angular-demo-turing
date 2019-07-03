import { Component, OnInit } from '@angular/core';
import { IUser, User } from '@app/services/user';
import { slideRight } from '@app/utilities/transitions';
import { MatDialog } from '@angular/material';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';

@Component({
  selector: 'app-account-button-menu',
  templateUrl: './account-button-menu.component.html',
  styleUrls: ['./account-button-menu.component.scss'],
  animations: [slideRight]
})
export class AccountButtonMenuComponent implements OnInit {

  public user: IUser;
  private dialog: MatDialog;

  constructor(user: User, dialog: MatDialog) {
    this.user = user;
    this.dialog = dialog;
    console.log(this);
  }

  public auth() {
    console.log(this);
    this.dialog.open(AuthPopupComponent);
  }

  ngOnInit() {
  }

}
