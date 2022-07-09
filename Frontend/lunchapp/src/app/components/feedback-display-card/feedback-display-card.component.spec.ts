import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDisplayCardComponent } from './feedback-display-card.component';

describe('FeedbackDisplayCardComponent', () => {
  let component: FeedbackDisplayCardComponent;
  let fixture: ComponentFixture<FeedbackDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
