import * as _ from 'lodash';
import { environment as commonEnvironment } from './environment.en';

export const environment = _.extend(commonEnvironment, {
  production: true
});
