import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser, IUserModel, IUserProfile, User } from '@app/services/user';
import { IEvent, ServiceEvents } from '@app/types/common';
import { slideTop } from '@app/utilities/transitions';
import { IRemoteData, Resources } from '@app/services/resources';
import { IMessages, UserMessages } from '@app/services/messages';

interface UserStub {
  [key:string]: any,
  fake: boolean
}

@Component({
  selector: 'app-profile-common-editor',
  templateUrl: './profile-common-editor.component.html',
  styleUrls: ['./profile-common-editor.component.scss'],
  animations: [slideTop]
})
export class ProfileCommonEditorComponent implements OnInit {

  public model: IUserModel | UserStub = { phone: {}, fake: true };
  public credentials: { password: string } = { password: '' };

  public progress: boolean = false;

  @ViewChild('update_error', { static: false }) private updateErrorToastTemplate: TemplateRef<any>;
  @ViewChild('update_success', { static: false }) private updateSuccessToastTemplate: TemplateRef<any>;

  private user: IUser;
  private resources: IRemoteData;
  private messages: IMessages;

  constructor(user: User, resources: Resources, messages: UserMessages) {
    this.user = user;
    this.resources = resources;
    this.messages = messages;
  }

  public async update() {

    this.progress = true;

    try {
      await this.resources.users.updateProfile(this.model as IUserModel, this.credentials.password);
    } catch {
      this.messages.openFromTemplate(this.updateErrorToastTemplate);
      return;
    } finally {
      this.progress = false;
    }

    this.messages.openFromTemplate(this.updateSuccessToastTemplate);
  }

  private async reload() {

    if (!this.user.model) {
      return;
    }

    this.model = Object.assign({}, this.user.model);
  }

  ngOnInit() {

    this.user.subscribe((event: IEvent) => {

      if (event.name !== ServiceEvents.Update || !(this.model as UserStub).fake) {
        return;
      }

      this.reload();
    });

    this.reload();
  }

}
