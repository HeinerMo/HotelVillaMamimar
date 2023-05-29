import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelStatusComponent } from './hotel-status.component';

describe('HotelStatusComponent', () => {
  let component: HotelStatusComponent;
  let fixture: ComponentFixture<HotelStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
