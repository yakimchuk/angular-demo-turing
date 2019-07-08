import * as _ from 'lodash';
import { environment as commonEnvironment } from './defaults';

export const environment = _.extend(commonEnvironment, {
  locale: 'ru-RU',
  currency: 'USD'
});
