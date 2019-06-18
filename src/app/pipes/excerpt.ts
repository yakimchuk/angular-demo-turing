import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'excerpt'})
export class ExcerptPipe implements PipeTransform {
  transform(value: string, length: number): string {

    if (value.length <= length) {
      return value;
    }

    let words = _.words(value, /[a-zA-Zа-яА-ЯёЁ0-9-_$€()@"'`+]+/gi);
    let excerpt = '';

    do {
      excerpt += `${words.shift()} `;
    } while (excerpt.length < length);

    return `${excerpt.trim()}..`;

  }
}
