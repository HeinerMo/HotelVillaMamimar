import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { IDiscount, IRoomType } from '../../manage-discounts.component';
import { RoomTypeService } from 'src/app/services/roomType.service';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css'],
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
export class CreateDiscountComponent implements AfterViewInit, OnInit {
  formControl = new FormControl('');

  // Min dates
  minDateForBegining = new Date();
  minDateForEnding = this.minDateForBegining;

  //Dates Forms Control
  beginingDateControl: FormControl = new FormControl();
  endingDateControl: FormControl = new FormControl();

  roomTypeControl: FormControl = new FormControl();


  roomTypes: IRoomType[] = []

  constructor(public dialogRef: MatDialogRef<CreateDiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public discount: IDiscount,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    public roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {
    this.beginingDateControl.setValidators([Validators.required]);
    this.endingDateControl.setValidators([Validators.required]);
    this.roomTypeControl.setValidators([Validators.required]);

    this.roomTypeService.getRoomTypes().subscribe(data => {
      if (data.id == 1) {
        Object.assign(this.roomTypes, data.item);
      }
    })
  }

  ngAfterViewInit(): void {
    this.formControl.setValidators([Validators.required]);
  }

  setBeginingDateValue(date: any) {
    this.minDateForEnding = new Date(date);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    if (this.isFormValid()) {
      let startingDate = this.beginingDateControl.value;
      let endingDate = this.endingDateControl.value;
      this.discount.startingDate = startingDate;
      this.discount.endingDate = endingDate;
      this.discount.roomTypeId = this.roomTypeControl.value;
      this.dialogRef.close({ id: 1, discount: this.discount });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ id: 0});
  }

  isFormValid() {
    return this.formControl.valid && this.beginingDateControl.valid && this.endingDateControl.valid && this.roomTypeControl.valid;
  }

  checkPercentage(inputElement: HTMLInputElement) {
    const maxDigits = 3;
    const value = Number(inputElement.value);

   if (inputElement.value.length > maxDigits - 1) {
      if (value < -100 || value == -100 ) {
        inputElement.value = '-100';
      } else if (value > 100) {
        inputElement.value = '100';
      } else {
        inputElement.value = inputElement.value.slice(0, maxDigits);
      }
    }
  
    this.discount.porcentage = Number(inputElement.value);
  }
}
