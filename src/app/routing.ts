import { ExtraOptions, Routes } from '@angular/router';
import { HomeRouteComponent } from '@app/routes/home/home.component';
import { CartRouteComponent } from '@app/routes/cart/cart.component';
import { DepartmentsNavigationComponent } from '@app/components/departments-navigation/departments-navigation.component';
import { AccountRouteComponent } from '@app/routes/account/account.component';
import { AccountNavigationComponent } from '@app/components/account-navigation/account-navigation.component';

export interface RouteData {
  title: string
}

export const routes: Routes = [

  // Routes
  {
    path: '',
    component: HomeRouteComponent,
    data: {
      id: makeRouteId('home')
    }
  },
  {
    path: 'cart',
    component: CartRouteComponent,
    data: {
      id: makeRouteId('cart')
    }
  },
  {
    path: 'account',
    component: AccountRouteComponent,
    data: {
      id: makeRouteId('account')
    }
  }

];

export const options: ExtraOptions = {};

export function makeRouteId(routeName: string) {
  return `route.${routeName}`;
}
