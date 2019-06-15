import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCloseWebsiteComponent } from './button-close-website.component';

describe('ButtonCloseWebsiteComponent', () => {
  let component: ButtonCloseWebsiteComponent;
  let fixture: ComponentFixture<ButtonCloseWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCloseWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCloseWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
