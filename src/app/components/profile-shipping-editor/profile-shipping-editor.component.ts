import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService, UserModel, User } from '@app/services/user';
import { IEvent, ServiceEvents } from '@app/types/common';
import { slideTop } from '@app/utilities/transitions';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { MessagesService, UserMessages } from '@app/services/messages';
import { ShippingService, ShippingArea, ShippingVariant, Shipping } from '@app/services/shipping';

interface UserStub {
  [key: string]: any;
  fake: boolean;
}

@Component({
  selector: 'app-profile-shipping-editor',
  templateUrl: './profile-shipping-editor.component.html',
  styleUrls: ['./profile-shipping-editor.component.scss'],
  animations: [slideTop]
})
export class ProfileShippingEditorComponent implements OnInit {

  // @todo: Rethink this usage of stub, I think it has problems and there must be more elegant solution
  public model: UserModel | UserStub = { fake: true };
  public progress: boolean = false;
  public shipping: ShippingService;

  @ViewChild('update_error', { static: false }) private updateErrorToastTemplate: TemplateRef<any>;
  @ViewChild('update_success', { static: false }) private updateSuccessToastTemplate: TemplateRef<any>;

  private user: UserService;
  private resources: EndpointGatewayService;
  private messages: MessagesService;

  constructor(
    user: User,
    resources: Endpoint,
    messages: UserMessages,
    shipping: Shipping
  ) {
    this.user = user;
    this.resources = resources;
    this.messages = messages;
    this.shipping = shipping;
  }

  public async update() {

    this.progress = true;

    try {
      await this.resources.users.updateShipping(this.model as UserModel);
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
