import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCategoriesComponent } from './department-categories.component';

describe('DepartmentCategoriesComponent', () => {
  let component: DepartmentCategoriesComponent;
  let fixture: ComponentFixture<DepartmentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
