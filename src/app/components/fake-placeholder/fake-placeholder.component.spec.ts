import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakePlaceholderComponent } from './fake-placeholder.component';

describe('FakePlaceholderComponent', () => {
  let component: FakePlaceholderComponent;
  let fixture: ComponentFixture<FakePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
