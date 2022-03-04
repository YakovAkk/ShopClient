import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegoByCategoryComponent } from './lego-by-category.component';

describe('LegoByCategoryComponent', () => {
  let component: LegoByCategoryComponent;
  let fixture: ComponentFixture<LegoByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegoByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegoByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
