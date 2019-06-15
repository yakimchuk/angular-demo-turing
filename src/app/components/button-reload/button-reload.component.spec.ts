import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReloadComponent } from './button-reload.component';

describe('ButtonReloadComponent', () => {
  let component: ButtonReloadComponent;
  let fixture: ComponentFixture<ButtonReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonReloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
