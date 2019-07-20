import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { IProduct } from '@app/services/schemas';
import { Review } from '@app/services/reviews';
import { fade, slideTop } from '@app/utilities/transitions';
import { IRemoteData, Resources } from '@app/services/resources';
import { AuthPopupComponent } from '@app/popups/auth-popup/auth-popup.component';
import { MatDialog } from '@angular/material';
import { Auth, IAuth } from '@app/services/auth';
import { IMessages, UserMessages } from '@app/services/messages';

const defaultModel = {
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

  @Input('product') public product: IProduct;

  public error: boolean;
  public progress: boolean;

  public reviews: Review[];
  public model: { text: string; rating: number } = defaultModel;

  @ViewChild('review_create_error', { static: true }) public reviewCreationErrorToastTemplate: TemplateRef<any>;
  @ViewChild('review_create_cancel', { static: true }) public reviewCreationCancelToastTemplate: TemplateRef<any>;
  @ViewChild('review_create_success', { static: true }) public reviewCreationSuccessToastTemplate: TemplateRef<any>;
  @ViewChild('review_auth_message', { static: true }) public reviewAuthMessageTemplate: TemplateRef<any>;

  private resources: IRemoteData;
  private dialog: MatDialog;
  private auth: IAuth;
  private messages: IMessages;

  constructor(resources: Resources, dialog: MatDialog, auth: Auth, messages: UserMessages) {
    this.resources = resources;
    this.dialog = dialog;
    this.auth = auth;
    this.messages = messages;
  }

  public async createReview(model) {

    if (!this.auth.isAuthorized()) {

      this.dialog.open(AuthPopupComponent, {
        data: {
          caption: this.reviewAuthMessageTemplate
        }
      }).afterClosed().subscribe(async () => {

        if (!this.auth.isAuthorized()) {
          this.messages.openFromTemplate(this.reviewCreationCancelToastTemplate);
          return;
        }

        this.createReview(model);
      });

      return;
    }

    this.progress = true;

    try {
      await this.resources.products.createProductReview(this.product.product_id, model.text, model.rating);
    } catch {
      this.error = true;
    } finally {
      this.progress = false;
    }

    this.messages.openFromTemplate(this.error ? this.reviewCreationErrorToastTemplate : this.reviewCreationSuccessToastTemplate);

    if (this.error) {
      return;
    }

    this.reload();
  }

  public async reload() {

    delete this.reviews;
    delete this.error;

    try {
      this.reviews = await this.resources.products.getProductReviews(this.product.product_id);
    } catch (e) {
      this.error = true;
    }
  }

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
