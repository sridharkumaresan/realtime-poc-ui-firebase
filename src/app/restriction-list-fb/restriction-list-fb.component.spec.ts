import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionListFbComponent } from './restriction-list-fb.component';

describe('RestrictionListFbComponent', () => {
  let component: RestrictionListFbComponent;
  let fixture: ComponentFixture<RestrictionListFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictionListFbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionListFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
