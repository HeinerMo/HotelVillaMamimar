import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISeason } from '../../manage-seasons.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.component.html',
  styleUrls: ['./create-season.component.css'],
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
export class CreateSeasonComponent implements AfterViewInit, OnInit {
  formControl = new FormControl('');

  // Min dates
  minDateForBegining = new Date();
  minDateForEnding = this.minDateForBegining;

  //Dates Forms Control
  beginingDateControl: FormControl = new FormControl();
  endingDateControl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<CreateSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public season: ISeason,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit(): void {
    this.beginingDateControl.setValidators([Validators.required]);
    this.endingDateControl.setValidators([Validators.required]);
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
      this.season.startingDate = startingDate;
      this.season.endingDate = endingDate;
      this.dialogRef.close({ id: 1, season: this.season });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ id: 0});
  }

  isFormValid() {
    return this.formControl.valid && this.beginingDateControl.valid && this.endingDateControl.valid;
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
  
    this.season.porcentage = Number(inputElement.value);
  }
}
