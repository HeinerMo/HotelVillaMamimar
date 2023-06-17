import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { IRoomType } from '../../manage-roomtypes.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-roomtype.component.html',
  styleUrls: ['./create-roomtype.component.css'],
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
export class CreateRoomtypeComponent implements AfterViewInit, OnInit {
  formGroup!: FormGroup;

  roomTypes: IRoomType[] = [];

  imageURL: string = '';
  imageSelected = false;

  constructor(public dialogRef: MatDialogRef<CreateRoomtypeComponent>,
    @Inject(MAT_DIALOG_DATA) public roomType: IRoomType,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
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

 hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  async handleFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files![0];

    if (file) {
      try {
        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        const hexString = this.arrayBufferToHex(arrayBuffer);
        const bytes = this.hexToBytes(hexString);
        this.roomType.hexImage = hexString;
        this.imageSelected = true;
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
      this.roomType.name = this.formGroup.get('name')!.value;
      this.roomType.description = this.formGroup.get('description')!.value;
      this.roomType.price = this.formGroup.get('price')!.value;
      this.dialogRef.close({ id: 1, roomType: this.roomType });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ id: 0 });
  }

  isFormValid() {
    return this.formGroup.valid;
  }
}
