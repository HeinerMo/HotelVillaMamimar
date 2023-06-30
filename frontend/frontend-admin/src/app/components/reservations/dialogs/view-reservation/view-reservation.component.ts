import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent {
  constructor(public dialogRef: MatDialogRef<ViewReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: any
    , private sanitizer: DomSanitizer,
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
