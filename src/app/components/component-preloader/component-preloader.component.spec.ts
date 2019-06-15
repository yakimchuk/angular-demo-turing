import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPreloaderComponent } from './component-preloader.component';

describe('ComponentPreloaderComponent', () => {
  let component: ComponentPreloaderComponent;
  let fixture: ComponentFixture<ComponentPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
