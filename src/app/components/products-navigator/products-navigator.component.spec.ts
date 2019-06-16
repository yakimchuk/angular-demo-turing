import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsNavigatorComponent } from './products-navigator.component';

describe('ProductsNavigatorComponent', () => {
  let component: ProductsNavigatorComponent;
  let fixture: ComponentFixture<ProductsNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
