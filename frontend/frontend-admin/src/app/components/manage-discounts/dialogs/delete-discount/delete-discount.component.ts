import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-discount',
  templateUrl: './delete-discount.component.html',
  styleUrls: ['./delete-discount.component.css']
})
export class DeleteDiscountComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public discount: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, discount: this.discount})
  }

  getFormattedDate(date: Date): string {
    date = new Date(date)
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}