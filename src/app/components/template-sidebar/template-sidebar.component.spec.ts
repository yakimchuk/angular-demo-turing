import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSidebarComponent } from './template-sidebar.component';

describe('TemplateSidebarComponent', () => {
  let component: TemplateSidebarComponent;
  let fixture: ComponentFixture<TemplateSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
