import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-season',
  templateUrl: './delete-season.component.html',
  styleUrls: ['./delete-season.component.css']
})
export class DeleteSeasonComponent {
  constructor(public dialogRef: MatDialogRef<DeleteSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public season: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, season: this.season})
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