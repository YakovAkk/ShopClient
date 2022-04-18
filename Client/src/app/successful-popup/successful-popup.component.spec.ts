import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPopupComponent } from './successful-popup.component';

describe('SuccessfulPopupComponent', () => {
  let component: SuccessfulPopupComponent;
  let fixture: ComponentFixture<SuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
