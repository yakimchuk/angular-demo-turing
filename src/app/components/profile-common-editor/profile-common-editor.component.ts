import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService, UserModel, User } from '@app/services/user';
import { IEvent, ServiceEvents } from '@app/types/common';
import { slideTop } from '@app/utilities/transitions';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { MessagesService, UserMessages } from '@app/services/messages';

interface UserStub {
  [key: string]: any;
  fake: boolean;
}

@Component({
  selector: 'app-profile-common-editor',
  templateUrl: './profile-common-editor.component.html',
  styleUrls: ['./profile-common-editor.component.scss'],
  animations: [slideTop]
})
export class ProfileCommonEditorComponent implements OnInit {

  // @todo: Rethink this usage of stub, I think it has problems and there must be more elegant solution
  public model: UserModel | UserStub = { phone: {}, fake: true };
  public credentials: { password: string } = { password: '' };

  public progress: boolean = false;

  @ViewChild('update_error', { static: false }) private updateErrorToastTemplate: TemplateRef<any>;
  @ViewChild('update_success', { static: false }) private updateSuccessToastTemplate: TemplateRef<any>;

  private user: UserService;
  private resources: EndpointGatewayService;
  private messages: MessagesService;

  constructor(
    user: User,
    resources: Endpoint,
    messages: UserMessages
  ) {
    this.user = user;
    this.resources = resources;
    this.messages = messages;
  }

  public async update() {

    this.progress = true;

    try {
      await this.resources.users.updatePersonalData({ ...(this.model as UserModel), ...this.credentials });
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

    try {
      this.user.subscribe((event: IEvent) => {

        if (event.name !== ServiceEvents.Update || !(this.model as UserStub).fake) {
          return;
        }

        this.reload();
      });
    } catch {
      // In case of error in the user service, we must reload model, otherwise it will be a blocking issue
      // Just do nothing...
    }

    this.reload();
  }

}
