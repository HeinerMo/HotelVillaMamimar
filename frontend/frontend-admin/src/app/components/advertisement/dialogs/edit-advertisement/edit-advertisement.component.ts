import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { ModifySeasonComponent } from 'src/app/components/manage-seasons/dialogs/modify-season/modify-season.component';
import { IAdvertisement } from '../../advertisement.component';
import { HttpClient } from '@angular/common/http';
import { toByteArray } from 'base64-js';
import { DomSanitizer } from '@angular/platform-browser';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-edit-advertisement',
  templateUrl: './edit-advertisement.component.html',
  styleUrls: ['./edit-advertisement.component.css'],
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



export class EditAdvertisementComponent implements AfterViewInit, OnInit  {
  
  selectedFile: ImageSnippet= {} as ImageSnippet;

  formControl = new FormControl('');
  fileName= ""
  constructor(public dialogRef: MatDialogRef<ModifySeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public advertisement: IAdvertisement,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private sanitizer: DomSanitizer
  ) { }

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
  

  base64ToHex(base64String: string): string {
    // Remove data URL prefix if present
    const dataUrlPrefix = 'data:image/jpg;base64,';
    if (base64String.startsWith(dataUrlPrefix)) {
      base64String = base64String.slice(dataUrlPrefix.length);
    }
  
    // Decode Base64 to Uint8Array
    const bytes = new Uint8Array([...atob(base64String)].map((char) => char.charCodeAt(0)));
  
    // Convert Uint8Array to hex string
    const hexArray = Array.from(bytes, (byte: number) => byte.toString(16).padStart(2, '0'));
    const hexString = hexArray.join('');
  
    return hexString;
  }
  
  
    


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
    this.dialogRef.close();
  }

  isFormValid() {
    return this.formControl.valid;
  }
}
