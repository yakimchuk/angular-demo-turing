import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRouteComponent } from './product.component';

describe('AccountRouteComponent', () => {
  let component: AccountRouteComponent;
  let fixture: ComponentFixture<AccountRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
