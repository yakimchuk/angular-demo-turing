import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fade, slideTop } from '@app/utilities/transitions';
import { ICart, RemoteCart } from '@app/services/cart';
import { ICartItem, ITax } from '@app/services/schemas';
import { IMessages, UserMessages } from '@app/services/messages';
import { ITaxes, Taxes } from '@app/services/taxes';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { pagination } from '@app/config';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { IShippingSelection } from '@app/components/shipping-selector/shipping-selector.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [slideTop, fade]
})
export class CartComponent implements OnInit {

  public cart: ICart;
  public tax: ITax;
  public shipping: IShippingSelection;

  public step: string;
  public stepIndex: number = 0;

  private steps: string[] = ['cart', 'checkout', 'payment', 'done'];
  private router: Router;
  private route: ActivatedRoute;

  constructor(cart: RemoteCart, router: Router, route: ActivatedRoute) {
    this.cart = cart;
    this.router = router;
    this.route = route;
  }

  public async createOrder(cartId: number, tax: ITax, shipping: IShippingSelection) {

    console.log('create order', arguments);

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
    from(this.route.queryParams).subscribe((query: any) => this.onQueryUpdate(query));
  }

}
