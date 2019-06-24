import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '@app/routes/home/home.component';

import { options, routes } from '@app/routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatDividerModule,
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
import { HttpClientModule } from '@angular/common/http';

import 'ajv';
import { DepartmentCategoriesComponent } from '@app/components/department-categories/department-categories.component';
import { ComponentErrorComponent } from '@app/components/component-error/component-error.component';
import { ButtonReloadComponent } from '@app/components/button-reload/button-reload.component';
import { ButtonCloseWebsiteComponent } from '@app/components/button-close-website/button-close-website.component';
import { SearchComponent } from '@app/components/search/search.component';
import { CartButtonMenuComponent } from '@app/components/cart-button-menu/cart-button-menu.component';
import { ProfileButtonMenuComponent } from '@app/components/profile-button-menu/profile-button-menu.component';
import { RouteNavigationComponent } from '@app/components/route-navigation/route-navigation.component';
import { BreadcrumbI18nHackComponent } from '@app/components/breadcrumb-i18n-hack/breadcrumb-i18n-hack.component';
import { ProductsNavigatorComponent } from '@app/components/products-navigator/products-navigator.component';
import { LargeImageComponent, ThumbnailImageComponent } from '@app/components/image/image.component';
import { getPaginationIntl } from '@app/utilities/paginator.i18n';
import { ExcerptPipe } from '@app/pipes/excerpt';
import { pipe } from 'rxjs';
import { MoneyPipe } from '@app/pipes/currency';
import { Resources } from '@app/services/resources';
import { IStorage, UserStorage } from '@app/services/storage';
import { ButtonPurchaseComponent } from '@app/components/button-purchase/button-purchase.component';
import { RemoteCart } from '@app/services/cart';
import { UserMessages } from '@app/services/messages';
import { CartComponent } from '@app/routes/cart/cart.component';
import { OrderSubtotalComponent } from '@app/components/order-subtotal/order-subtotal.component';
import { Taxes } from '@app/services/taxes';
import { TaxSelectorComponent } from '@app/components/tax-selector/tax-selector.component';
import { CartEditorComponent } from '@app/components/cart-editor/cart-editor.component';
import { ShippingSelectorComponent } from '@app/components/shipping-selector/shipping-selector.component';
import { Shipping } from '@app/services/shipping';

const vendor = {
  framework: [
    CommonModule,
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
    DeviceDetectorModule.forRoot()
  ]
};

const components = {
  routes: [
    ContainerComponent,
    HomeComponent,
    CartComponent
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
    ProfileButtonMenuComponent,
    RouteNavigationComponent,
    BreadcrumbI18nHackComponent,
    ProductsNavigatorComponent,
    LargeImageComponent,
    ThumbnailImageComponent,
    ButtonPurchaseComponent,
    OrderSubtotalComponent,
    TaxSelectorComponent,
    CartEditorComponent,
    ShippingSelectorComponent
  ]
};

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
  {
    provide: MatPaginatorIntl, useValue: getPaginationIntl()
  }
];

@NgModule({
  declarations: [
    ...components.routes,
    ...components.ui,
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
  bootstrap: [ContainerComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
