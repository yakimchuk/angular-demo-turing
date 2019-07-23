import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Review } from '@app/services/reviews';
import { fade, slideTop } from '@app/utilities/transitions';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { MatDialog, PageEvent } from '@angular/material';
import { Auth, AuthenticationService } from '@app/services/auth';
import { MessagesService, UserMessages } from '@app/services/messages';
import { pagination } from '@app/config';
import { Product } from '@app/services/products';

const DEFAULT_FORM_MODEL = {
  text: '',
  rating: 5
};

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  animations: [slideTop, fade]
})
export class ProductReviewsComponent implements OnInit, OnChanges {

  @Input() public product: Product;

  public error: boolean;
  public progress: boolean;

  public page: number = pagination.page;
  public limit: number = pagination.limit;

  public filter: PageEvent;

  public reviews: Review[];
  public model: { text: string; rating: number } = DEFAULT_FORM_MODEL;

  @ViewChild('review_create_error', { static: true }) public reviewCreationErrorToastTemplate: TemplateRef<any>;
  @ViewChild('review_create_cancel', { static: true }) public reviewCreationCancelToastTemplate: TemplateRef<any>;
  @ViewChild('review_create_success', { static: true }) public reviewCreationSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('review_auth_message', { static: true }) public reviewAuthMessageTemplate: TemplateRef<any>;

  private resources: EndpointGatewayService;
  private dialog: MatDialog;
  private auth: AuthenticationService;
  private messages: MessagesService;

  constructor(
    resources: Endpoint,
    dialog: MatDialog,
    auth: Auth,
    messages: UserMessages
  ) {
    this.resources = resources;
    this.dialog = dialog;
    this.auth = auth;
    this.messages = messages;
  }

  public async createReview(model) {

    try {

      if (!this.auth.isAuthenticated()) {

        this.dialog.open(AuthPopupComponent, {
          data: {
            caption: this.reviewAuthMessageTemplate
          }
        }).afterClosed().subscribe(async () => {

          try {
            if (!this.auth.isAuthenticated()) {
              this.messages.openFromTemplate(this.reviewCreationCancelToastTemplate);
              return;
            }
          } catch {

            // If there is an error with authentication module, better to notify user than do nothing
            this.messages.openFromTemplate(this.reviewCreationErrorToastTemplate);
            return;
          }

          // Recursive call
          // At this time the condition above will not be satisfied
          this.createReview(model);
        });

        return;
      }

    } catch {

      // If there is an error with authentication module, better to notify user than do nothing
      this.messages.openFromTemplate(this.reviewCreationErrorToastTemplate);
      return;
    }

    this.progress = true;

    try {
      await this.resources.products.createProductReview({ productId: this.product.id, review: model.text, rating: model.rating });
    } catch {
      this.error = true;
    } finally {
      this.progress = false;
    }

    try {
      this.messages.openFromTemplate(this.error ? this.reviewCreationErrorToastTemplate : this.reviewCreationSuccessToastTemplate);
    } catch {
      // In case of error in the messages module, we must reload reviews
      // Otherwise it will be critical issue
      // Just do nothing...
    }

    if (this.error) {
      return;
    }

    this.reload();
  }

  public async reload() {

    delete this.reviews;
    delete this.error;

    try {
      this.reviews = (await this.resources.products.getProductReviews({ productId: this.product.id })).items;
    } catch (e) {
      this.error = true;
    }
  }

  // Hack in order to use number-limited ngFor w/o real array
  public ratingToArray(rating) {
    return Array(rating).fill(null);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!this.product || !changes.product) {
      return;
    }

    this.reload();
  }

  ngOnInit() {
  }

}
