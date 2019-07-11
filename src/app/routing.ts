import {
  ActivatedRouteSnapshot, ChildrenOutletContexts,
  DetachedRouteHandle,
  ExtraOptions, Route,
  Router,
  RouteReuseStrategy,
  Routes,
  UrlSerializer
} from '@angular/router';
import { HomeRouteComponent } from '@app/routes/home/home.component';
import { CartRouteComponent } from '@app/routes/cart/cart.component';
import { DepartmentsNavigationComponent } from '@app/components/departments-navigation/departments-navigation.component';
import { AccountRouteComponent } from '@app/routes/account/account.component';
import { AccountNavigationComponent } from '@app/components/account-navigation/account-navigation.component';
import { DepartmentRouteComponent } from '@app/routes/department/department.component';
import { Compiler, Injector, NgModuleFactoryLoader, Type } from '@angular/core';
import { Location } from '@angular/common';
import * as _ from 'lodash';

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
    path: 'departments/:departmentId',
    component: DepartmentRouteComponent,
    data: {
      id: makeRouteId('department')
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
  },
  {
    path: 'account/:section',
    component: AccountRouteComponent,
    data: {
      id: makeRouteId('account')
    }
  }

];

export const options: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
};

export function makeRouteId(routeName: string) {
  return `route.${routeName}`;
}
