import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from '@app/routes/home/home.component';

export const routes: Routes = [
  {

    path: '',
    component: HomeComponent,

    // children: [
    //   {
    //
    //     path: '/'
    //
    //   }
    // ]

  }
];

export const options: ExtraOptions = {};
