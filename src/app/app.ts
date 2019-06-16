import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '@app/routes/home/home.component';

import { options, routes } from '@app/routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatDividerModule,
  MatExpansionModule,
  MatIconModule, MatListModule,
  MatProgressSpinnerModule, MatRippleModule,
  MatSidenavModule,
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
    DeviceDetectorModule.forRoot()
  ]
};

const components = {
  routes: [
    ContainerComponent,
    HomeComponent
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
    ProductsNavigatorComponent
  ]
};

const directives = [
];

@NgModule({
  declarations: [
    ...components.routes,
    ...components.ui,
    ...directives
  ],
  imports: [
    ...vendor.framework,
    ...vendor.external
  ],
  bootstrap: [ContainerComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
