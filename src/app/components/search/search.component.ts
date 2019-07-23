import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { TuringListResponse, TuringProduct } from '@app/services/schemas.turing';
import { debounceTime, map, mergeMap, startWith } from 'rxjs/operators';
import { ui } from '@app/config';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { Product } from '@app/services/products';
import { List } from '@app/types/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public controller = new FormControl();
  public products: Observable<Product[]>;

  private resources: EndpointGatewayService;

  constructor(resources: Endpoint) {

    this.resources = resources;

    this.products = this.controller.valueChanges
      .pipe(
        startWith([]),
        debounceTime(ui.autocomplete.debounce),
        mergeMap(query => {
          try {
            return from(this.resources.products.search({
              query: query,
              page: 1,
              limit: ui.autocomplete.limit
            })).pipe(
              map((response: List<Product>) => response.items)
            );
          } catch {
            return [];
          }
        })
      );

  }

  ngOnInit() {

  }

}
