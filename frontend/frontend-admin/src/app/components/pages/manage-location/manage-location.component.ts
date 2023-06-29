import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HotelService } from 'src/app/services/hotel.service';

interface IHotelLocation {
  extraDetails: string
}

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ManageLocationComponent {

  formGroup: FormGroup = new FormGroup({});

  hotelLocation: IHotelLocation = {
    extraDetails: ''
  };
  constructor(
    private sanitizer: DomSanitizer,
    private hotelService: HotelService
    ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      extraDetails: new FormControl("", Validators.required)
    });

     this.loadData()
  }

  loadData() {
    this.hotelService.getLocation().subscribe((data:any) => {
      if (data.id == 1) {

        this.hotelLocation.extraDetails = data.item.extraDetails;
        
        this.formGroup.get('extraDetails')?.setValue(this.hotelLocation.extraDetails);
      }

    });
  }

  ngAfterViewInit(): void {
    this.formGroup.get('extraDetails')?.setValidators([Validators.required]);
  }

  getErrorMessage(formControlName: string) {
    const formControl = this.formGroup.get(formControlName);
    if (formControl && formControl.hasError('required')) {
      return 'Required field';
    }
    return '';
  }
/*
  submit() {
    if (this.isFormValid()) {
      this.hotelInformation.welcomeMessage = this.formGroup.get('message')!.value;

      this.hotelService.updateWelcomeInformation(this.hotelInformation.welcomeMessage, this.hotelImage.image.imageData).subscribe((data:any) => {
        if (data.id == 1) {
          this.loadData();
        }
      })
    }
  }
*/

  isFormValid() {
    return this.formGroup.valid;
  }
}
