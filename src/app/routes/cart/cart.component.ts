import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { CartService, Cart } from '@app/services/cart';
import { TuringTax } from '@app/services/schemas.turing';
import { MessagesService, UserMessages } from '@app/services/messages';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { ShippingSelection } from '@app/components/shipping-selector/shipping-selector.component';
import { UserService, User } from '@app/services/user';
import { Order, Orders, OrdersService, OrderState } from '@app/services/orders';
import { MatDialog, MatStep, MatStepper } from '@angular/material';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { Auth, AuthenticationService } from '@app/services/auth';
import { Tax } from '@app/services/taxes';
import { ui } from '@app/config';

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

  public cart: CartService;
  public user: UserService;
  public tax: Tax;
  public shipping: ShippingSelection;
  public order: Order;
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
  private orders: OrdersService;
  private messages: MessagesService;
  private dialog: MatDialog;
  private auth: AuthenticationService;

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
    cart: Cart,
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

  public isMobileDevice() {
    return window.innerWidth <= ui.mobile.maxWidth;
  }

  public async createOrder(options: { cartId: string, tax: Tax, shipping: ShippingSelection }) {

    try {
      if (!this.auth.isAuthenticated()) {

        this.dialog.open(AuthPopupComponent, {
          data: {
            caption: this.authMessageToastTemplate
          }
        }).afterClosed().subscribe(() => {

          try {

            if (!this.auth.isAuthenticated()) {
              this.messages.openFromTemplate(this.authRequiredToastTemplate);
              return;
            }

          } catch {
            // In case of problems with authentication, user must know what is going on, instead of waiting for nothing
            this.messages.openFromTemplate(this.orderCreateErrorToastTemplate);
            return;
          }

          this.createOrder.call(this, options);
        });

        return;
      }
    } catch {
      // In case of problems with authentication, user must know what is going on, instead of waiting for nothing
      this.messages.openFromTemplate(this.orderCreateErrorToastTemplate);
      return;
    }

    this.progress = true;

    let orderId;

    try {
      orderId = await this.orders.create({
        cartId: options.cartId,
        taxId: options.tax.id,
        shippingVariantId: options.shipping.variant.id
      });
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

    let order = this.user.orders.find((item: Order) => item.id === orderId);

    if (!order) {
      this.messages.openFromTemplate(this.orderFindErrorToastTemplate);
      this.progress = false;
      return;
    }

    this.order = order;
    this.progress = false;

    this.nextStep();
    this.cart.reload();
  }

  private nextStep() {
    setTimeout(() => {
      this.stepper.next();
    });
  }

  public getUnpaidOrders() {
    return this.user.orders.filter((order: Order) => order.status === OrderState.Unpaid);
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
