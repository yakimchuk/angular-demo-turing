import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser, IUserModel, IUserProfile, User } from '@app/services/user';
import { IEvent, ServiceEvents } from '@app/types/common';
import { slideTop } from '@app/utilities/transitions';
import { IRemoteData, Resources } from '@app/services/resources';
import { IMessages, UserMessages } from '@app/services/messages';
import { IShipping, IShippingArea, IShippingVariant, Shipping } from '@app/services/shipping';

interface UserStub {
  [key:string]: any,
  fake: boolean
}

@Component({
  selector: 'app-profile-shipping-editor',
  templateUrl: './profile-shipping-editor.component.html',
  styleUrls: ['./profile-shipping-editor.component.scss'],
  animations: [slideTop]
})
export class ProfileShippingEditorComponent implements OnInit {

  public model: IUserModel | UserStub = { fake: true };
  public progress: boolean = false;
  public shipping: IShipping;

  @ViewChild('update_error', { static: false }) private updateErrorToastTemplate: TemplateRef<any>;
  @ViewChild('update_success', { static: false }) private updateSuccessToastTemplate: TemplateRef<any>;

  private user: IUser;
  private resources: IRemoteData;
  private messages: IMessages;

  constructor(user: User, resources: Resources, messages: UserMessages, shipping: Shipping) {
    this.user = user;
    this.resources = resources;
    this.messages = messages;
    this.shipping = shipping;
  }

  public async update() {

    this.progress = true;

    try {
      await this.resources.users.updateShipping(this.model as IUserModel);
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
