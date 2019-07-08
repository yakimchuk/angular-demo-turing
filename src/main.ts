import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/defaults';

import { AppModule } from '@app/app';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeRu, 'ru');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
