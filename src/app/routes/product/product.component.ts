import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService, UserMessages } from '@app/services/messages';
import { fade, slideRight, slideTop } from '@app/utilities/transitions';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { extractNaturalNumber } from '@app/utilities/extractor';
import { Product } from '@app/services/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [slideTop, slideRight, fade]
})
export class ProductRouteComponent implements OnInit {

  public product: Product;
  public error: boolean;

  private router: Router;
  private route: ActivatedRoute;
  private messages: MessagesService;
  private resources: EndpointGatewayService;

  constructor(
    router: Router,
    route: ActivatedRoute,
    messages: UserMessages,
    resources: Endpoint
  ) {
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
      this.product = await this.resources.products.getProduct({ productId });
    } catch {
      this.error = true;
    }

  }

  ngOnInit() {
    this.route.params.subscribe(() => this.reload());
  }

}
