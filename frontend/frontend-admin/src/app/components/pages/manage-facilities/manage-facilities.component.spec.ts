import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFacilitiesComponent } from './manage-facilities.component';

describe('ManageFacilitiesComponent', () => {
  let component: ManageFacilitiesComponent;
  let fixture: ComponentFixture<ManageFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFacilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
