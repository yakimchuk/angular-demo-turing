import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessages, UserMessages } from '@app/services/messages';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { IRemoteData, Resources } from '@app/services/resources';
import { IProduct, IProductDetails } from '@app/services/schemas';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { ProductAttribute } from '@app/services/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [slideTop, slideRight, fade]
})
export class ProductRouteComponent implements OnInit {

  public product: IProductDetails;
  public error: boolean;

  private router: Router;
  private route: ActivatedRoute;
  private messages: IMessages;
  private resources: IRemoteData;

  constructor(router: Router, route: ActivatedRoute, messages: UserMessages, resources: Resources) {
    this.router = router;
    this.route = route;
    this.messages = messages;
    this.resources = resources;
  }

  public async reload() {

    delete this.error;

    let productId = extractNaturalNumber(this.route.snapshot.paramMap.get('productId'), null);

    if (!productId) {
      this.error = true;
      return;
    }

    try {
      this.product = await this.resources.products.getProduct(productId);
    } catch {
      this.error = true;
    }

  }

  ngOnInit() {

    this.reload();

  }

}
