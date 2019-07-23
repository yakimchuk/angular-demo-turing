import {
  AfterViewInit,
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
import { Order, OrderItem, OrderState } from '@app/services/orders';
import Stripe = stripe.Stripe;
import Element = stripe.elements.Element;
import TokenResponse = stripe.TokenResponse;
import Token = stripe.Token;
import { slideTop } from '@app/utilities/transitions';
import { api, environment } from '@app/config';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { MessagesService, UserMessages } from '@app/services/messages';
import { UserService, User } from '@app/services/user';

const STRIPE_KEY = 'pk_test_NcwpaplBCuTL6I0THD44heRe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [slideTop]
})
export class OrderComponent implements OnInit, OnChanges, AfterViewInit {

  // Stripe payment form container
  @ViewChild('container', { static: false }) private container: ElementRef<any>;

  @ViewChild('payment_success', { static: true }) private paymentSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('payment_error', { static: true }) private paymentErrorToastTemplate: TemplateRef<any>;
  @ViewChild('user_error', { static: true }) private userReloadErrorToastTemplate: TemplateRef<any>;

  @Input() public order: Order;

  @Output() public onPaymentSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onPaymentError: EventEmitter<void> = new EventEmitter<void>();

  public error: boolean = false;
  public states = OrderState;
  public items: OrderItem[];
  public progress = false;

  private stripe: Stripe;
  private card: Element;
  private resources: EndpointGatewayService;
  private messages: MessagesService;
  private user: UserService;

  constructor(
    resources: Endpoint,
    messages: UserMessages,
    user: User
  ) {
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

      let result = await this.resources.payment.charge({
        token: token.id,
        orderId: this.order.id,
        description: '',
        amount: this.order.cost,
        currency: environment.currency
      });

      if (!result.paid) {
        throw new Error(`Faced some issues at the charge: ${JSON.stringify(result)}`);
      }

    } catch (error) {

      this.onPaymentError.emit();
      this.messages.openFromTemplate(this.paymentErrorToastTemplate);

      return;
    }

    try {
      await this.user.reload();
    } catch {
      this.messages.openFromTemplate(this.userReloadErrorToastTemplate);
    }

    this.messages.openFromTemplate(this.paymentSuccessToastTemplate);
    this.onPaymentSuccess.emit();
  }

  private async reload() {
    try {
      this.items = (await this.resources.orders.getOrderItems({ orderId: this.order.id })).items;
    } catch {

      // If we cannot reload items, then if did not load them yet, we must set empty items list
      // Otherwise (error) can block whole component and user will be unable to pay it or see its state, it will be a blocker issue

      if (!this.items) {
        this.items = [];
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges) {

    if (!this.order) {
      return;
    }

    await this.reload();
  }

  async ngOnInit() {
  }

  // Append Stripe form when view is ready for it
  ngAfterViewInit() {

    if (!this.container) {
      return;
    }

    this.appendPaymentForm();
  }

  private appendPaymentForm() {

    try {

      this.stripe = Stripe(STRIPE_KEY);

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
      this.error = true;
    }

  }

}
