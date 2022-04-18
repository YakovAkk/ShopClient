import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendlegoComponent } from './trendlego.component';

describe('TrendlegoComponent', () => {
  let component: TrendlegoComponent;
  let fixture: ComponentFixture<TrendlegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendlegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendlegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
