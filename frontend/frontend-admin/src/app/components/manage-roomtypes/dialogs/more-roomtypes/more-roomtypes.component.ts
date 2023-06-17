import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';

@Component({
  selector: 'app-more-roomtypes',
  templateUrl: './more-roomtypes.component.html',
  styleUrls: ['./more-roomtypes.component.css']
})
export class MoreRoomtypesComponent {
  constructor(public dialogRef: MatDialogRef<MoreRoomtypesComponent>,
    @Inject(MAT_DIALOG_DATA) public roomType: any
    , private sanitizer: DomSanitizer,
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImageFromBytes(roomTypesImages: any[]) {
    if (roomTypesImages.length > 0) {
      let imageEncoded = roomTypesImages[0].image.imageData;

      let decodedBytes: Uint8Array;
      const byteArray = new Uint8Array([]);

      decodedBytes = toByteArray(imageEncoded);
      const blob = new Blob([decodedBytes], { type: 'image/png' });
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

      return url;
    }

    return "";
  }
}