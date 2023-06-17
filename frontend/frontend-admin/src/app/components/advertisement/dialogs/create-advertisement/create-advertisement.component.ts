import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IAdvertisement } from '../../advertisement.component';
import { toByteArray } from 'base64-js';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { FormControl, Validators } from '@angular/forms';
import { CreateSeasonComponent } from 'src/app/components/manage-seasons/dialogs/create-season/create-season.component';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.css'],
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
export class CreateAdvertisementComponent implements AfterViewInit, OnInit {
  formControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<CreateSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public advertisement: IAdvertisement,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.formControl.setValidators([Validators.required]);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    if (this.isFormValid()) {
      this.dialogRef.close({ id: 1, season: this.advertisement });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ id: 0});
  }

  isFormValid() {
    return this.formControl.valid;
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', (event: any) => {
      // Access the Base64-encoded image string
      let base64String: string = event.target.result;
  
      // const hexString: string = this.base64ToHex(base64String);
      const dataUrlPrefixjpeg = 'data:image/jpeg;base64,';
      const dataUrlPrefixjpg = 'data:image/jpg;base64,';
      const dataUrlPrefixpng = 'data:image/png;base64,';
      if (base64String.startsWith(dataUrlPrefixjpeg)) {
        base64String = base64String.slice(dataUrlPrefixjpeg.length);
      }
      if (base64String.startsWith(dataUrlPrefixjpg)) {
        base64String = base64String.slice(dataUrlPrefixjpg.length);
      }
      if (base64String.startsWith(dataUrlPrefixpng)) {
        base64String = base64String.slice(dataUrlPrefixpng.length);
      }
      
      // Use the Base64 string as needed
      // console.log('Base64 string:', base64String);

      let decodedBytes: Uint8Array;
      decodedBytes = toByteArray(base64String);
      const blob = new Blob([decodedBytes], { type: 'image/jpg' });
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.advertisement.image = url

    });
  
    // Read the file as Data URL (Base64)
    reader.readAsDataURL(file);

    
  }

}
