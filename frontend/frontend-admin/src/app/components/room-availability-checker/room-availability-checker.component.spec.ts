import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabilityCheckerComponent } from './room-availability-checker.component';

describe('RoomAvailabilityCheckerComponent', () => {
  let component: RoomAvailabilityCheckerComponent;
  let fixture: ComponentFixture<RoomAvailabilityCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAvailabilityCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAvailabilityCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
