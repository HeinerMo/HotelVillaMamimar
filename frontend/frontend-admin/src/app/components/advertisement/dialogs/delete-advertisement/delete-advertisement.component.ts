import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-advertisement',
  templateUrl: './delete-advertisement.component.html',
  styleUrls: ['./delete-advertisement.component.css']
})
export class DeleteAdvertisementComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAdvertisementComponent>,
    @Inject(MAT_DIALOG_DATA) public advertisement: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, advertisement: this.advertisement})
  }

}
