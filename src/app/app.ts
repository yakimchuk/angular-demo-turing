import {
  LOCALE_ID,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule} from '@angular/router';
import { HomeRouteComponent } from '@app/routes/home/home.component';

import { options, routes } from '@app/routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatPaginatorIntl, MatPaginatorModule,
  MatProgressSpinnerModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import { ContainerComponent } from '@app/container/container.component';
import { TemplateHeaderComponent } from '@app/components/template-header/template-header.component';
import { TemplateSidebarComponent } from '@app/components/template-sidebar/template-sidebar.component';
import { TemplateContentComponent } from '@app/components/template-content/template-content.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DepartmentsNavigationComponent } from '@app/components/departments-navigation/departments-navigation.component';
import { ComponentPreloaderComponent } from '@app/components/component-preloader/component-preloader.component';
import { FakePlaceholderComponent } from '@app/components/fake-placeholder/fake-placeholder.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import 'ajv';
import { DepartmentCategoriesComponent } from '@app/components/department-categories/department-categories.component';
import { ComponentErrorComponent } from '@app/components/component-error/component-error.component';
import { ButtonReloadComponent } from '@app/components/button-reload/button-reload.component';
import { ButtonCloseWebsiteComponent } from '@app/components/button-close-website/button-close-website.component';
import { SearchComponent } from '@app/components/search/search.component';
import { CartButtonMenuComponent } from '@app/components/cart-button-menu/cart-button-menu.component';
import { RouteNavigationComponent } from '@app/components/route-navigation/route-navigation.component';
import { BreadcrumbI18nHackComponent } from '@app/components/breadcrumb-i18n-hack/breadcrumb-i18n-hack.component';
import { ProductsNavigatorComponent } from '@app/components/products-navigator/products-navigator.component';
import { LargeImageComponent, ThumbnailImageComponent } from '@app/components/image/image.component';
import { getPaginationIntl } from '@app/utilities/paginator.i18n';
import { ExcerptPipe } from '@app/pipes/excerpt';
import { MoneyPipe } from '@app/pipes/currency';
import { Resources } from '@app/services/resources';
import { UserStorage } from '@app/services/storage';
import { RemoteCart } from '@app/services/cart';
import { UserMessages } from '@app/services/messages';
import { CartRouteComponent } from '@app/routes/cart/cart.component';
import { OrderSubtotalComponent } from '@app/components/order-subtotal/order-subtotal.component';
import { Taxes } from '@app/services/taxes';
import { TaxSelectorComponent } from '@app/components/tax-selector/tax-selector.component';
import { CartEditorComponent } from '@app/components/cart-editor/cart-editor.component';
import { ShippingSelectorComponent } from '@app/components/shipping-selector/shipping-selector.component';
import { Shipping } from '@app/services/shipping';
import { User } from '@app/services/user';
import { Users } from '@app/services/users';
import { AccountButtonMenuComponent } from '@app/components/account-button-menu/account-button-menu.component';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { FormsModule } from '@angular/forms';
import { Auth, IAuth } from '@app/services/auth';
import { Orders } from '@app/services/orders';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { OrderComponent } from '@app/components/order/order.component';
import { AccountRouteComponent } from '@app/routes/account/account.component';
import { AccountNavigationComponent } from '@app/components/account-navigation/account-navigation.component';
import { OrdersComponent } from '@app/components/orders/orders.component';
import { environment } from '@app/config';
import { ProfileCommonEditorComponent } from '@app/components/profile-common-editor/profile-common-editor.component';
import { ProfileShippingEditorComponent } from '@app/components/profile-shipping-editor/profile-shipping-editor.component';
import { DepartmentRouteComponent } from '@app/routes/department/department.component';
import { CategoryRouteComponent } from '@app/routes/category/category.component';
import { ProductRouteComponent } from '@app/routes/product/product.component';
import { ProductPurchaseFormComponent } from '@app/components/product-purchase-form/product-purchase-form.component';
import { ButtonHomeComponent } from '@app/components/button-home/button-home.component';
import { OutletComponent } from '@app/components/outlet/outlet.component';
import { ProductPurchasePopupComponent } from '@app/popups/product-purchase/product-purchase.component';

const vendor = {
  framework: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, options)
  ],
  external: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    DeviceDetectorModule.forRoot()
  ]
};

const components = {
  routes: [
    ContainerComponent,
    HomeRouteComponent,
    CartRouteComponent,
    AccountRouteComponent,
    DepartmentRouteComponent,
    CategoryRouteComponent,
    ProductRouteComponent
  ],
  ui: [
    TemplateHeaderComponent,
    TemplateSidebarComponent,
    TemplateContentComponent,
    DepartmentsNavigationComponent,
    ComponentPreloaderComponent,
    FakePlaceholderComponent,
    DepartmentCategoriesComponent,
    ComponentErrorComponent,
    ButtonReloadComponent,
    ButtonCloseWebsiteComponent,
    SearchComponent,
    CartButtonMenuComponent,
    RouteNavigationComponent,
    BreadcrumbI18nHackComponent,
    ProductsNavigatorComponent,
    LargeImageComponent,
    ThumbnailImageComponent,
    OrderSubtotalComponent,
    TaxSelectorComponent,
    CartEditorComponent,
    ShippingSelectorComponent,
    AccountButtonMenuComponent,
    OrderComponent,
    AccountNavigationComponent,
    OrdersComponent,
    ProfileCommonEditorComponent,
    ProfileShippingEditorComponent,
    ProductPurchaseFormComponent,
    ButtonHomeComponent,
    OutletComponent
  ]
};

const popups = [
  AuthPopupComponent,
  ProductPurchasePopupComponent
];

const pipes = [
  ExcerptPipe,
  MoneyPipe
];

const directives = [
];

const providers = [
  CurrencyPipe,
  Resources,
  RemoteCart,
  UserStorage,
  UserMessages,
  Taxes,
  Shipping,
  User,
  Users,
  Auth,
  Orders,
  {
    provide: MatPaginatorIntl,
    useValue: getPaginationIntl()
  },
  {
    provide: HTTP_INTERCEPTORS,
    useFactory: (auth: IAuth): IAuth => {
      return auth;
    },
    deps: [Auth],
    multi: true
  },
  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  },
  {
    provide: LOCALE_ID,
    useValue: environment.locale
  }
];

@NgModule({
  declarations: [
    ...components.routes,
    ...components.ui,
    ...popups,
    ...directives,
    ...pipes
  ],
  imports: [
    ...vendor.framework,
    ...vendor.external
  ],
  providers: [
    ...providers
  ],
  entryComponents: [
    ...popups
  ],
  bootstrap: [ContainerComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
