import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderEntryComponent } from './rider-entry.component';

describe('RiderEntryComponent', () => {
  let component: RiderEntryComponent;
  let fixture: ComponentFixture<RiderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
