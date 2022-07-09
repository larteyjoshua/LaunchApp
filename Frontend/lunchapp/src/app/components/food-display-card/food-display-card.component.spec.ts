import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDisplayCardComponent } from './food-display-card.component';

describe('FoodDisplayCardComponent', () => {
  let component: FoodDisplayCardComponent;
  let fixture: ComponentFixture<FoodDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
