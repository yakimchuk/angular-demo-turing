import * as _ from 'lodash';
import { environment as commonEnvironment } from './environment.ru';

export const environment = _.extend(commonEnvironment, {
  production: true
});
