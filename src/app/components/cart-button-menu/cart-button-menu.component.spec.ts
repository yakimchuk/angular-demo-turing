import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonMenuComponent } from './cart-button-menu.component';

describe('CartButtonMenuComponent', () => {
  let component: CartButtonMenuComponent;
  let fixture: ComponentFixture<CartButtonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartButtonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
