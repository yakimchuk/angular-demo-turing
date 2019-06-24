import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSelectorComponent } from './tax-selector.component';

describe('TaxSelectorComponent', () => {
  let component: TaxSelectorComponent;
  let fixture: ComponentFixture<TaxSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
