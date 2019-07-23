import { Component, OnInit } from '@angular/core';
import { UserService, User } from '@app/services/user';
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

  public user: UserService;

  private dialog: MatDialog;

  constructor(user: User, dialog: MatDialog) {
    this.user = user;
    this.dialog = dialog;
  }

  public auth() {
    this.dialog.open(AuthPopupComponent);
  }

  ngOnInit() {
  }

}
