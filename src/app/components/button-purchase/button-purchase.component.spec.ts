import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPurchaseComponent } from './button-purchase.component';

describe('ButtonPurchaseComponent', () => {
  let component: ButtonPurchaseComponent;
  let fixture: ComponentFixture<ButtonPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
