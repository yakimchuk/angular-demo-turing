import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountButtonMenuComponent } from './account-button-menu.component';

describe('AccountButtonMenuComponent', () => {
  let component: AccountButtonMenuComponent;
  let fixture: ComponentFixture<AccountButtonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountButtonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
