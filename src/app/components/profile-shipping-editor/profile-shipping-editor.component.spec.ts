import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShippingEditorComponent } from './profile-shipping-editor.component';

describe('ProfileShippingEditorComponent', () => {
  let component: ProfileShippingEditorComponent;
  let fixture: ComponentFixture<ProfileShippingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileShippingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShippingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
