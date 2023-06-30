import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';
import { HotelService } from 'src/app/services/hotel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface IHotelInformation {
  id?: number;
  welcomeMessage: string
}

interface IHotelWelcomeImage {
  id?: number,
  imageId: number,
  image: any
}

@Component({
  selector: 'app-manage-homepage',
  templateUrl: './manage-homepage.component.html',
  styleUrls: ['./manage-homepage.component.css'],
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
export class ManageHomePageComponent implements AfterViewInit, OnInit {
  formGroup: FormGroup = new FormGroup({});

  hotelInformation: IHotelInformation = {
    welcomeMessage: ''
  };

  hotelImage: IHotelWelcomeImage = {
    imageId: 0,
    image: undefined
  }

  imageURL: SafeUrl = '';
  imageSelected = false;

  constructor(
    private sanitizer: DomSanitizer,
    private hotelService: HotelService,
    private _snackBar: MatSnackBar,
    private router: Router
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
        this.hotelInformation.welcomeMessage = data.item.welcomeMessage;
        
        this.formGroup.get('message')?.setValue(this.hotelInformation.welcomeMessage);
      }

    });

    this.hotelService.getWelcomeImage().subscribe((data: any) => {
      if (data.id == 1) {
        this.hotelImage.imageId = data.item.imageId
        this.hotelImage.image = data.item.image
        let imageEncoded = this.hotelImage.image.imageData!;

        let decodedBytes: Uint8Array;
    
        decodedBytes = toByteArray(imageEncoded);
        const blob = new Blob([decodedBytes], { type: 'image/png' });
        let safeURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        this.imageURL = safeURL;
        this.imageSelected = true;
    
        this.hotelImage.image.imageData = this.arrayBufferToHex(decodedBytes);
      }
    });   
  }

  readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
    const view = new Uint8Array(arrayBuffer);
    let hex = '';
    for (let i = 0; i < view.length; i++) {
      const byte = view[i].toString(16).padStart(2, '0');
      hex += byte.toUpperCase();
    }
    return hex;
  }

  convertImageToByteArray(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const byteArray = new Uint8Array(arrayBuffer);
          resolve(byteArray);
        } else {
          reject(new Error('Failed to read the image file.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read the image file.'));
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async handleFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files![0];

    if (file) {
      try {
        const arrayBuffer = await this.convertImageToByteArray(file);
        const hexString = this.arrayBufferToHex(arrayBuffer);
        this.hotelImage.image.imageData = hexString;
        this.imageSelected = true;
        const blobURL = URL.createObjectURL(file);
        const safeURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(blobURL);
        this.imageURL = safeURL;
      } catch (error) {
        console.error('Error reading file:', error);
        this.imageSelected = false;
      }
    }
  }

  ngAfterViewInit(): void {
    this.formGroup.get('name')?.setValidators([Validators.required]);
    this.formGroup.get('description')?.setValidators([Validators.required]);
    this.formGroup.get('price')?.setValidators([Validators.required]);
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
      this.hotelInformation.welcomeMessage = this.formGroup.get('message')!.value;

      this.hotelService.updateWelcomeInformation(this.hotelInformation.welcomeMessage, this.hotelImage.image.imageData).subscribe((data:any) => {
        if (data.id == 1) {
          this.loadData();
          this._snackBar.open('Información modificada', 'Cerrar', {
            duration: 3000
          });
        }
      })
    }
  }

  onNoClick(): void {
    this.router.navigate(["/pages"]);
  }

  isFormValid() {
    return this.formGroup.valid && this.imageSelected;
  }
}
