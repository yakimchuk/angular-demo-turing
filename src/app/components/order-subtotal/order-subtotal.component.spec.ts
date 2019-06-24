import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubtotalComponent } from './order-subtotal.component';

describe('OrderSubtotalComponent', () => {
  let component: OrderSubtotalComponent;
  let fixture: ComponentFixture<OrderSubtotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSubtotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubtotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
