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

interface IHotelInformation {
  id?: number;
  aboutMessage: string
}

@Component({
  selector: 'app-manage-about',
  templateUrl: './manage-about.component.html',
  styleUrls: ['./manage-about.component.css'],
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
export class ManageAboutComponent {

  formGroup: FormGroup = new FormGroup({});

  hotelInformation: IHotelInformation = {
    aboutMessage: ''
  };
  constructor(
    private sanitizer: DomSanitizer,
    private hotelService: HotelService
    ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      message: new FormControl("", Validators.required)
    });

     this.loadData()
  }

  loadData() {
    this.hotelService.getHotel(1).subscribe((data:any) => {
      if (data.id == 1) {

        this.hotelInformation.id = data.item.id;
        this.hotelInformation.aboutMessage = data.item.aboutMessage;
        
        this.formGroup.get('message')?.setValue(this.hotelInformation.aboutMessage);
      }

    });
  }

  ngAfterViewInit(): void {
    this.formGroup.get('message')?.setValidators([Validators.required]);
  }

  getErrorMessage(formControlName: string) {
    const formControl = this.formGroup.get(formControlName);
    if (formControl && formControl.hasError('required')) {
      return 'Required field';
    }
    return '';
  }
  submit() {
    if (this.isFormValid()) {
      this.hotelInformation.aboutMessage = this.formGroup.get('message')!.value;

      this.hotelService.updateAboutInformation(this.hotelInformation.aboutMessage).subscribe((data:any) => {
        if (data.id == 1) {
          this.loadData();
        }
      })
      
      
      console.log(this.hotelInformation.aboutMessage)
    }
  }

  isFormValid() {
    return this.formGroup.valid;
  }
}
