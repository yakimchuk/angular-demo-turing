import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseFormComponent } from './product-purchase-form.component';

describe('ProductPurchaseFormComponent', () => {
  let component: ProductPurchaseFormComponent;
  let fixture: ComponentFixture<ProductPurchaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPurchaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
