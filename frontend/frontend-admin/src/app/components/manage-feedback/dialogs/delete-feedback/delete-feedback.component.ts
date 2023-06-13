import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-feedback',
  templateUrl: './delete-feedback.component.html',
  styleUrls: ['./delete-feedback.component.css']
})
export class DeleteFeedbackComponent {
  constructor(public dialogRef: MatDialogRef<DeleteFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public feedback: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, feedback: this.feedback})
  }
}