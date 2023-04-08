import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingSectionComponent } from './advertising-section.component';

describe('AdvertisingSectionComponent', () => {
  let component: AdvertisingSectionComponent;
  let fixture: ComponentFixture<AdvertisingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
