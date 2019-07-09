import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommonEditorComponent } from './profile-common-editor.component';

describe('ProfileShippingEditorComponent', () => {
  let component: ProfileCommonEditorComponent;
  let fixture: ComponentFixture<ProfileCommonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCommonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
