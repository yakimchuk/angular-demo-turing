import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from '@app/services/orders';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { UserService, User } from '@app/services/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [slideTop, slideRight]
})
export class OrdersComponent implements OnInit {

  public states = OrderState;
  public user: UserService;
  public order: Order | null = null;

  constructor(user: User) {
    this.user = user;
  }

  ngOnInit() {
  }

}
