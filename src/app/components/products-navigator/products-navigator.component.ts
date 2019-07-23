import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuringListResponse, TuringProduct } from '@app/services/schemas.turing';
import { MatDialog, PageEvent } from '@angular/material';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { pagination } from '@app/config';
import { from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { fade, slideTop } from '@app/utilities/transitions';
import { ProductPurchasePopupComponent } from '@app/popups/product-purchase/product-purchase.component';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { MessagesService, UserMessages } from '@app/services/messages';
import { List } from '@app/types/common';
import { Product } from '@app/services/products';

export interface PaginationFilter {
  page: number;
  limit: number;
}

@Component({
  selector: 'app-products-navigator',
  templateUrl: './products-navigator.component.html',
  styleUrls: ['./products-navigator.component.scss'],
  animations: [slideTop, fade]
})
export class ProductsNavigatorComponent implements OnInit {

  @Input() products: List<Product>;

  @Input() page: number = pagination.page;
  @Input() limit: number = pagination.limit;

  @ViewChild('product_detail_info_load_error', { static: true }) private errorToastTemplate: TemplateRef<any>;

  @Output() onPagination: EventEmitter<PaginationFilter> = new EventEmitter();

  private messages: MessagesService;
  private resources: EndpointGatewayService;
  private router: Router;
  private route: ActivatedRoute;
  private dialog: MatDialog;

  constructor(
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog,
    resources: Endpoint,
    messages: UserMessages
  ) {
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
          product: await this.resources.products.getProduct({ productId })
        }
      });
    } catch {
      this.messages.openFromTemplate(this.errorToastTemplate);
    }

  }

  public onFilterChange(event: PageEvent) {

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
    };
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
