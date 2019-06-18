import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { ListResponse, Product } from '@app/networking/schemas';
import { PageEvent } from '@angular/material';
import { extractNaturalNumber } from '@app/common/extractor';
import { pagination } from '@app/config';
import { from, fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { fade, slideTop } from '@app/common/transitions';

export interface PaginationFilter {
  page: number,
  limit: number
}

@Component({
  selector: 'app-products-navigator',
  templateUrl: './products-navigator.component.html',
  styleUrls: ['./products-navigator.component.scss'],
  animations: [slideTop, fade]
})
export class ProductsNavigatorComponent implements OnInit {

  @Input('products') products: ListResponse<Product>;

  @Input('page') page: number = pagination.page;
  @Input('limit') limit: number = pagination.limit;

  @Output() onPagination: EventEmitter<PaginationFilter> = new EventEmitter();

  private router: Router;
  private route: ActivatedRoute;

  constructor(router: Router, route: ActivatedRoute) {

    this.router = router;
    this.route = route;

  }

  public onFilterChange(event: PageEvent) {

    // {previousPageIndex: 1, pageIndex: 2, pageSize: 10, length: 101}

    this.router.navigate([], {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize
      }
    });

  }

  private getFilter() {
    return {
      page: this.page,
      limit: this.limit
    }
  }

  private async reload() {
    console.log('reload in', this.getFilter());
    this.onPagination.emit(this.getFilter());
  }

  private extractQuery() {

    console.log('extract');

    this.page = extractNaturalNumber(this.route.snapshot.queryParamMap.get('page'), pagination.page);
    this.limit = extractNaturalNumber(this.route.snapshot.queryParamMap.get('limit'), pagination.limit);

  }

  ngOnInit() {

    from(this.route.queryParams).pipe(
      debounceTime(pagination.debounce)
    ).subscribe(() => {
      this.extractQuery();
      this.reload();
    });

    // setTimeout(() => {
    //
    //   this.router.navigate([], {
    //     queryParams: {
    //       page: 2122
    //     }
    //   });
    // }, 2000);

  }

}
