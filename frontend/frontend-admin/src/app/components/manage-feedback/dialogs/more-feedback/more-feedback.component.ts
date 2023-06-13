import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-feedback',
  templateUrl: './more-feedback.component.html',
  styleUrls: ['./more-feedback.component.css']
})
export class MoreFeedbackComponent {
  constructor(public dialogRef: MatDialogRef<MoreFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public feedback: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}