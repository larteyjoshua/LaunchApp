import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUserEntryComponent } from './bulk-user-entry.component';

describe('BulkUserEntryComponent', () => {
  let component: BulkUserEntryComponent;
  let fixture: ComponentFixture<BulkUserEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUserEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
