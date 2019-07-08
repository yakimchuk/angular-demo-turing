import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { IOrder, IOrderItem, OrderState } from '@app/services/orders';
import Stripe = stripe.Stripe;
import Element = stripe.elements.Element;
import TokenResponse = stripe.TokenResponse;
import Token = stripe.Token;
import { slideTop } from '@app/utilities/transitions';
import { api, environment } from '@app/config';
import { IRemoteData, Resources } from '@app/services/resources';
import { IMessages, UserMessages } from '@app/services/messages';
import { IUser, User } from '@app/services/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [slideTop]
})
export class OrderComponent implements OnInit, OnChanges {

  @ViewChild('container', { static: false }) private container: ElementRef<any>;
  @ViewChild('payment_success', { static: true }) private paymentSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('payment_error', { static: true }) private paymentErrorToastTemplate: TemplateRef<any>;
  @ViewChild('user_error', { static: true }) private userReloadErrorToastTemplate: TemplateRef<any>;

  @Input('order') public order: IOrder;

  @Output('onPaymentSuccess') public onPaymentSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output('onPaymentError') public onPaymentError: EventEmitter<void> = new EventEmitter<void>();

  public error: boolean = false;
  public states = OrderState;
  public items: IOrderItem[];
  public progress = false;

  private stripe: Stripe;
  private card: Element;
  private resources: IRemoteData;
  private messages: IMessages;
  private user: IUser;

  constructor(resources: Resources, messages: UserMessages, user: User) {
    this.resources = resources;
    this.messages = messages;
    this.user = user;
  }

  public async pay() {

    this.progress = true;

    try {

      let result: TokenResponse = await this.stripe.createToken(this.card);

      if (!result.error) {
        await this.send(result.token);
      }

    } catch {

      this.error = true;
      this.onPaymentError.emit();

    } finally {
      this.progress = false;
    }

  }

  private async send(token: Token) {

    try {

      let result = await this.resources.payment.charge(token.id, this.order.id, 'test', this.order.cost, environment.currency);

      if (!result.paid) {
        throw new Error(`Faced some issues at the charge: ${JSON.stringify(result)}`);
      }

      this.onPaymentSuccess.emit();
      this.messages.openFromTemplate(this.paymentSuccessToastTemplate);

      try {
        await this.user.reload();
      } catch {
        this.messages.openFromTemplate(this.userReloadErrorToastTemplate);
      }

    } catch (error) {
      this.onPaymentError.emit();
      this.messages.openFromTemplate(this.paymentErrorToastTemplate);
    }

  }

  private async reload() {
    try {
      this.items = await this.resources.orders.getOrderItems(this.order.id);
    } catch { }
  }

  async ngOnChanges(changes: SimpleChanges) {

    if (!this.order) {
      return;
    }

    await this.reload();

  }

  async ngOnInit() {
  }

  ngAfterViewInit() {

    if (!this.container) {
      return;
    }

    this.appendPaymentForm();
  }

  public ceil = Math.ceil;

  private appendPaymentForm() {

    try {

      this.stripe = Stripe('pk_test_NcwpaplBCuTL6I0THD44heRe');

      let elements = this.stripe.elements();

      let style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      this.card = elements.create('card', { style });

      this.card.mount(this.container.nativeElement);

    } catch (error) {
      console.log(error);
      this.error = true;
    }

  }

}
