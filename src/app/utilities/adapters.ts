import { HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

export function toFormData(data: { [key:string]: any }): HttpParams {
  return new HttpParams({
    fromObject: _.mapValues(data, value => value + '')
  });
}
