import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { ICart, RemoteCart } from '@app/services/cart';
import { ITax } from '@app/services/schemas';
import { IMessages, UserMessages } from '@app/services/messages';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { IShippingSelection } from '@app/components/shipping-selector/shipping-selector.component';
import { IUser, User } from '@app/services/user';
import { IOrder, IOrders, Orders, OrderState } from '@app/services/orders';
import { MatDialog, MatStep, MatStepper } from '@angular/material';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { Auth, IAuth } from '@app/services/auth';

enum CartSteps {
  Cart = 'cart',
  Checkout = 'checkout',
  Payment = 'payment',
  Done = 'done'
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [slideTop, fade, slideRight]
})
export class CartRouteComponent implements OnInit {

  public cart: ICart;
  public user: IUser;
  public tax: ITax;
  public shipping: IShippingSelection;
  public order: IOrder;
  public progress: boolean = false;

  public step: string;
  public stepIndex: number = 0;
  public stepNames = CartSteps;

  private steps: string[] = [
    CartSteps.Cart,
    CartSteps.Checkout,
    CartSteps.Payment,
    CartSteps.Done
  ];

  private router: Router;
  private route: ActivatedRoute;
  private orders: IOrders;
  private messages: IMessages;
  private dialog: MatDialog;
  private auth: IAuth;

  @ViewChild('stepper', { static: false }) private stepper: MatStepper;
  @ViewChild('stepPayment', { static: false }) private paymentStep: MatStep;

  @ViewChild('order_create_error', { static: false }) private orderCreateErrorToastTemplate: TemplateRef<any>;
  @ViewChild('order_reload_error', { static: false }) private orderReloadErrorToastTemplate: TemplateRef<any>;
  @ViewChild('order_find_error', { static: false }) private orderFindErrorToastTemplate: TemplateRef<any>;
  @ViewChild('order_pay_success', { static: false }) private orderPaySuccessToastTemplate: TemplateRef<any>;
  @ViewChild('order_pay_error', { static: false }) private orderPayErrorToastTemplate: TemplateRef<any>;

  @ViewChild('auth_message', { static: false }) private authMessageToastTemplate: TemplateRef<any>;
  @ViewChild('auth_required', { static: false }) private authRequiredToastTemplate: TemplateRef<any>;

  constructor(
    cart: RemoteCart,
    router: Router,
    route: ActivatedRoute,
    user: User,
    orders: Orders,
    messages: UserMessages,
    dialog: MatDialog,
    auth: Auth
  ) {
    this.cart = cart;
    this.router = router;
    this.route = route;
    this.user = user;
    this.orders = orders;
    this.messages = messages;
    this.dialog = dialog;
    this.auth = auth;
  }

  public async createOrder(cartId: string, tax: ITax, shipping: IShippingSelection) {

    let options = arguments;

    if (!this.auth.isAuthorized()) {
      // @todo: Auth + createOrder call

      this.dialog.open(AuthPopupComponent, {
        data: {
          caption: this.authMessageToastTemplate
        }
      }).afterClosed().subscribe(() => {

        if (!this.auth.isAuthorized()) {
          this.messages.openFromTemplate(this.authRequiredToastTemplate);
          return;
        }

        this.createOrder.apply(this, options);
      });

      return;
    }

    this.progress = true;

    let orderId;

    try {
      orderId = await this.orders.create(cartId, tax.tax_id, shipping.variant.id);
    } catch (error) {
      this.messages.openFromTemplate(this.orderCreateErrorToastTemplate);
      this.progress = false;
      return;
    }

    try {
      await this.user.reload();
    } catch {
      this.messages.openFromTemplate(this.orderReloadErrorToastTemplate);
      this.progress = false;
      return;
    }

    let order = this.user.orders.find((order: IOrder) => order.id === orderId);

    if (!order) {
      this.messages.openFromTemplate(this.orderFindErrorToastTemplate);
      this.progress = false;
      return;
    }

    this.order = order;
    this.progress = false;
    this.cart.reload();

    this.nextStep();

  }

  private nextStep() {
    setTimeout(() => {
      this.stepper.next();
    });
  }

  public getUnpaidOrders() {
    return this.user.orders.filter((order: IOrder) => order.status === OrderState.Unpaid);
  }

  public onPaymentSuccess() {

    this.messages.openFromTemplate(this.orderPaySuccessToastTemplate);

    this.paymentStep.completed = true;
    this.nextStep();
  }

  public onPaymentError() {
    this.messages.openFromTemplate(this.orderPayErrorToastTemplate);
  }

  public onStepChange(event: StepperSelectionEvent) {

    this.router.navigate([], {
      queryParams: {
        step: this.steps[event.selectedIndex]
      }
    });

  }

  private onQueryUpdate(query: any) {

    if (query.step && this.steps.includes(query.step)) {
      this.step = query.step;
    } else {
      this.step = this.steps[0];
    }

    this.stepIndex = this.steps.indexOf(this.step);
  }

  ngOnInit() {
    from(this.route.queryParams)
      .subscribe((query: any) => this.onQueryUpdate(query));
  }

}
