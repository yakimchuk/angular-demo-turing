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
import { CategoryRouteComponent } from '@app/routes/category/category.component';
import { ProductRouteComponent } from '@app/routes/product/product.component';
import { OutletComponent } from '@app/components/outlet/outlet.component';

export interface RouteData {
  title: string
}

// @todo: Remove freezing, but for now it is the only way to make succeed compilation, see https://github.com/angular/angular/issues/18662
export const paths = Object.freeze({
  root: {
    id: 'home',
    url: ''
  },
  product: {
    resolver: 'product',
    url: 'product/:productId'
  },
  department: {
    resolver: 'department',
    url: 'departments/:departmentId'
  },
  category: {
    resolver: 'category',
    url: 'categories/:categoryId'
  },
  cart: {
    id: 'cart',
    url: 'cart'
  },
  account: {
    id: 'account',
    url: 'account'
  }
});

// @todo: Make normal variable routes, but for now it is impossible, see https://github.com/angular/angular/issues/18662
export const routes: Routes = [

  // Routes
  {
    path: '',
    component: HomeRouteComponent,
    data: {
      breadcrumbs: [
        paths.root
      ]
    }
  },
  {
    path: 'products/:productId',
    component: ProductRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.product
      ]
    }
  },
  {
    path: 'departments/:departmentId',
    component: DepartmentRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.department
      ]
    },
  },
  {
    path: 'departments/:departmentId/products/:productId',
    component: ProductRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.department,
        paths.product
      ]
    }
  },
  {
    path: 'departments/:departmentId/categories/:categoryId',
    component: CategoryRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.department,
        paths.category
      ]
    },
  },
  {
    path: 'departments/:departmentId/categories/:categoryId/products/:productId',
    component: ProductRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.department,
        paths.category,
        paths.product
      ]
    }
  },
  {
    path: 'cart',
    component: CartRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.cart
      ]
    }
  },
  {
    path: 'account',
    component: AccountRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.account
      ]
    }
  },
  {
    path: 'account/:section',
    component: AccountRouteComponent,
    data: {
      breadcrumbs: [
        paths.root,
        paths.account
      ]
    }
  }
];

export const options: ExtraOptions = {
  onSameUrlNavigation: 'ignore',
  scrollPositionRestoration: 'top',
  paramsInheritanceStrategy: 'always'
};
