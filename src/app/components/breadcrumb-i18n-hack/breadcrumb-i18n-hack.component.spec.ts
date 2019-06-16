import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbI18nHackComponent } from './breadcrumb-i18n-hack.component';

describe('BreadcrumbI18nHackComponent', () => {
  let component: BreadcrumbI18nHackComponent;
  let fixture: ComponentFixture<BreadcrumbI18nHackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbI18nHackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbI18nHackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
