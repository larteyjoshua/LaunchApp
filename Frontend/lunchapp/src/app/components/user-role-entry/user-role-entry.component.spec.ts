import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleEntryComponent } from './user-role-entry.component';

describe('UserRoleEntryComponent', () => {
  let component: UserRoleEntryComponent;
  let fixture: ComponentFixture<UserRoleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
