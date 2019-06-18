import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from '@app/routes/home/home.component';

export interface RouteData {
  title: string
}

export const routes: Routes = [
  {

    path: '',
    component: HomeComponent,

    data: {
      id: makeRouteId('home')
    }

  }
];

export const options: ExtraOptions = {};

export function makeRouteId(routeName: string) {
  return `route.${routeName}`;
}
