import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFacilityComponent } from './modify-facility.component';

describe('ModifyFacilityComponent', () => {
  let component: ModifyFacilityComponent;
  let fixture: ComponentFixture<ModifyFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFacilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
