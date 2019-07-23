import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService, User } from '@app/services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService, UserMessages } from '@app/services/messages';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { MatDialog } from '@angular/material';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { from } from 'rxjs';

enum AccountTabNames {
  profile,
  shipping,
  orders
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [slideTop, slideRight]
})
export class AccountRouteComponent implements OnInit {

  public user: UserService;
  public error: string;

  public tabIndex: number = AccountTabNames.profile;

  private router: Router;
  private messages: MessagesService;
  private dialog: MatDialog;
  private route: ActivatedRoute;

  @ViewChild('user_logout_success', { static: true }) private userLogoutSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('user_logout_error', { static: true }) private userLogoutErrorToastTemplate: TemplateRef<any>;

  constructor(
    user: User,
    router: Router,
    messages: UserMessages,
    dialog: MatDialog,
    route: ActivatedRoute
  ) {
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

  public onTabChange(tabIndex: number) {
    this.router.navigate(['/account', AccountTabNames[tabIndex]]);
  }

  private updateTab() {

    let section = this.route.snapshot.paramMap.get('section');

    if (!section || !(section in AccountTabNames)) {
      return;
    }

    this.tabIndex = AccountTabNames[section];
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

    this.updateTab();
  }

}
