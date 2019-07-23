import { MatPaginatorIntl } from '@angular/material';
import { Subject } from 'rxjs';

class PaginatorI18n implements MatPaginatorIntl {

  constructor() {}

  changes: Subject<void> = new Subject();

  firstPageLabel: string = '';
  itemsPerPageLabel: string = '';
  lastPageLabel: string = '';
  nextPageLabel: string = '';
  previousPageLabel: string = '';

  // Got from https://stackoverflow.com/questions/47593692/how-to-translate-mat-paginator-in-angular-4
  public getRangeLabel(page: number, pageSize: number, length: number): string {

    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}

export function getPaginationIntl() {
  return new PaginatorI18n();
}
