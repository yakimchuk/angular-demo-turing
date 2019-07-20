import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { IListResponse, IProduct } from '@app/services/schemas';
import { debounceTime, map, mergeMap, startWith } from 'rxjs/operators';
import { ui } from '@app/config';
import { IRemoteData, Resources } from '@app/services/resources';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public controller = new FormControl();
  public products: Observable<IProduct[]>;

  private resources: IRemoteData;

  constructor(resources: Resources) {

    this.resources = resources;

    this.products = this.controller.valueChanges
      .pipe(
        startWith([]),
        debounceTime(ui.autocomplete.debounce),
        mergeMap(query => {
          try {
            return from(this.resources.products.search(query, {
              page: 1,
              limit: ui.autocomplete.limit
            })).pipe(
              map((response: IListResponse<IProduct>) => response.rows)
            );
          } catch {
            return [];
          }
        })
      );

  }

  public open() {
    console.log(arguments);
  }

  ngOnInit() {

  }

}
