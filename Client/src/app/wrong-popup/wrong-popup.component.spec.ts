import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPopupComponent } from './wrong-popup.component';

describe('WrongPopupComponent', () => {
  let component: WrongPopupComponent;
  let fixture: ComponentFixture<WrongPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
