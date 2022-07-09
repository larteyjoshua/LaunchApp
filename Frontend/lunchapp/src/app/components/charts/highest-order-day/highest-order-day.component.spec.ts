import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestOrderDayComponent } from './highest-order-day.component';

describe('HighestOrderDayComponent', () => {
  let component: HighestOrderDayComponent;
  let fixture: ComponentFixture<HighestOrderDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestOrderDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestOrderDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
