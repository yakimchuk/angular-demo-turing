import { Component, Input, OnInit } from '@angular/core';
import { IOrder, OrderState } from '@app/services/orders';
import { slideRight, slideTop } from '@app/utilities/transitions';
import { IUser, User } from '@app/services/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [slideTop, slideRight]
})
export class OrdersComponent implements OnInit {

  public states = OrderState;
  public user: IUser;
  public order: IOrder | null = null;

  constructor(user: User) {
    this.user = user;
  }

  ngOnInit() {
  }

}
