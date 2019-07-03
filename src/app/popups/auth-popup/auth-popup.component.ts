import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser, User } from '@app/services/user';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { IUsers, Users } from '@app/services/users';
import { IMessages, UserMessages } from '@app/services/messages';
import { Auth, IAuth } from '@app/services/auth';

interface IUserCredentials {
  email: string;
  password: string;
}

interface IUserData extends IUserCredentials {
  name: string;
}

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
  animations: [slideTop, slideRight]
})
export class AuthPopupComponent implements OnInit {

  public user: IUser;
  public progress: boolean = false;

  public models: {
    login: IUserCredentials;
    registration: IUserData;
  } = {
    login: {
      email: '',
      password: ''
    },
    registration: {
      name: '',
      email: '',
      password: ''
    }
  };

  private users: IUsers;
  private messages: IMessages;
  private auth: IAuth;

  @ViewChild('register_success', { static: true }) private registrationSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('register_unknown_error', { static: true }) private registrationUnknownErrorToastTemplate: TemplateRef<any>;
  @ViewChild('register_in_use_error', { static: true }) private registrationInUseErrorToastTemplate: TemplateRef<any>;
  @ViewChild('register_email_error', { static: true }) private registrationEmailErrorToastTemplate: TemplateRef<any>;

  @ViewChild('auth_success', { static: true }) private loginSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('auth_manual_error', { static: true }) private loginManualErrorToastTemplate: TemplateRef<any>;
  @ViewChild('auth_manual_credentials_error', { static: true }) private loginManualCredentialsErrorTemplate: TemplateRef<any>;

  constructor(user: User, users: Users, messages: UserMessages, auth: Auth) {
    this.user = user;
    this.users = users;
    this.messages = messages;
    this.auth = auth;
  }

  public async register(model: IUserData) {

    this.progress = true;

    try {

      await this.users.create(model.name, model.email, model.password);

    } catch (error) {

      this.progress = false;

      // @todo: HttpResponse .error + Turing Response .error = this ugly path :C
      if (error.error && error.error.error) {

        switch (error.error.error.code) {

          case 'USR_03':
            this.messages.openFromTemplate(this.registrationEmailErrorToastTemplate);
            return;

          case 'USR_04':
            this.messages.openFromTemplate(this.registrationInUseErrorToastTemplate);
            return;

        }
      }

      this.messages.openFromTemplate(this.registrationUnknownErrorToastTemplate);
      return;
    }

    this.messages.openFromTemplate(this.registrationSuccessToastTemplate);

    await this.login(model);

  }

  public async login(model: IUserCredentials) {

    this.progress = true;

    try {
      await this.auth.login(model.email, model.password);
    } catch (error) {

      this.progress = false;

      // @todo: HttpResponse .error + Turing Response .error = this ugly path :C
      if (error.error && error.error.error) {

        switch (error.error.error.code) {

          case 'USR_01':
            this.messages.openFromTemplate(this.loginManualCredentialsErrorTemplate);
            return;

        }
      }

      this.messages.openFromTemplate(this.loginManualErrorToastTemplate);
      return;
    }

    try {
      await this.user.reload();
    } catch {
      this.progress = false;
      this.messages.openFromTemplate(this.loginManualErrorToastTemplate);
      return;
    }

    this.progress = false;
    this.messages.openFromTemplate(this.loginSuccessToastTemplate);

  }

  ngOnInit() {

  }

}
