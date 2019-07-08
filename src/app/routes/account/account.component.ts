import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser, User } from '@app/services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessages, UserMessages } from '@app/services/messages';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { MatDialog } from '@angular/material';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { IOrder } from '@app/services/orders';
import { from } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [slideTop, slideRight]
})
export class AccountRouteComponent implements OnInit {

  public user: IUser;
  public error: string;

  private router: Router;
  private messages: IMessages;
  private dialog: MatDialog;
  private route: ActivatedRoute;

  @ViewChild('user_logout_success', { static: true }) private userLogoutSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('user_logout_error', { static: true }) private userLogoutErrorToastTemplate: TemplateRef<any>;

  constructor(user: User, router: Router, messages: UserMessages, dialog: MatDialog, route: ActivatedRoute) {
    this.user = user;
    this.router = router;
    this.messages = messages;
    this.dialog = dialog;
    this.route = route;
  }

  public async logout() {

    try {
      await this.user.logout();
    } catch {
      this.messages.openFromTemplate(this.userLogoutErrorToastTemplate);
      return;
    }

    this.messages.openFromTemplate(this.userLogoutSuccessToastTemplate);
    this.router.navigate(['/']);
  }

  public auth() {
    this.dialog.open(AuthPopupComponent);
  }

  ngOnInit() {

    from(this.route.queryParams).subscribe((query: any) => {

      if (!query.error) {
        return;
      }

      this.error = query.error;

      if (this.error === 'session') {
        this.user.logout();
      }

    });

  }

}
