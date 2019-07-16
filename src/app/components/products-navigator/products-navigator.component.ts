import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { IListResponse, IProduct } from '@app/services/schemas';
import { MatDialog, PageEvent } from '@angular/material';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { pagination } from '@app/config';
import { from, fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { fade, slideTop } from '@app/utilities/transitions';
import { ProductPurchasePopupComponent } from '@app/popups/product-purchase/product-purchase.component';
import { IRemoteData, Resources } from '@app/services/resources';
import { IMessages, UserMessages } from '@app/services/messages';

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

  @Input('products') products: IListResponse<IProduct>;

  @Input('page') page: number = pagination.page;
  @Input('limit') limit: number = pagination.limit;

  @ViewChild('product_detail_info_load_error', { static: true }) private errorToastTemplate: TemplateRef<any>;

  @Output() onPagination: EventEmitter<PaginationFilter> = new EventEmitter();

  private router: Router;
  private resources: IRemoteData;
  private route: ActivatedRoute;
  private dialog: MatDialog;
  private messages: IMessages;

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, resources: Resources, messages: UserMessages) {
    this.router = router;
    this.route = route;
    this.dialog = dialog;
    this.resources = resources;
    this.messages = messages;
  }

  public async add(productId: number) {

    try {
      this.dialog.open(ProductPurchasePopupComponent, {
        data: {
          product: await this.resources.products.getProduct(productId)
        }
      });
    } catch {
      this.messages.openFromTemplate(this.errorToastTemplate);
    }

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
    this.onPagination.emit(this.getFilter());
  }

  private extractQuery() {

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

  }

}
